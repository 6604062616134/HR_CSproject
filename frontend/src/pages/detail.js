import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

function Detail({ type }) {
    const { id } = useParams();
    const [personDetail, setPersonDetail] = useState(null);
    const [assignations, setAssignations] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = useState("eventDateStart"); 

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const endpoint = type === 'teacher'
                    ? `http://localhost:8000/teacher/${id}`
                    : `http://localhost:8000/staff/${id}`;
                const response = await axios.get(endpoint);
                setPersonDetail(response.data);
            } catch (error) {
                console.error('Error fetching person detail:', error);
            }
        };

        fetchDetail();
    }, [id, type]);

    useEffect(() => {
        const fetchAssignations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/assignation/${id}`, {
                    params: { type },
                });
                setAssignations(response.data);
            } catch (error) {
                console.error('Error fetching assignations:', error);
            }
        };

        fetchAssignations();
    }, [id, type]);

    if (!personDetail) {
        return <div>Loading...</div>;
    }

    const filteredAssignations = assignations.filter((assignation) => {
        const eventStart = new Date(assignation.eventDateStart);
        const eventEnd = new Date(assignation.eventDateEnd);
        const filterStart = filterStartDate ? new Date(filterStartDate) : null;
        const filterEnd = filterEndDate ? new Date(filterEndDate) : null;

        if (!filterStart && !filterEnd) return true;

        if (filterStart && filterEnd) {
            return eventStart >= filterStart && eventEnd <= filterEnd;
        }

        if (filterStart) {
            return eventStart >= filterStart;
        }

        if (filterEnd) {
            return eventEnd <= filterEnd;
        }

        return true;
    });

    const toggleSortOrder = (field) => {
        setSortField(field); // ตั้งค่าฟิลด์ที่ต้องการเรียงลำดับ
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc")); // สลับลำดับการเรียง
    };

    return (
        <div>
            <Navbar className="print:hidden" />
            <div className="container mx-auto mt-10 p-4 sm:p-6 lg:p-10">
                {type === 'teacher' ? (
                    <p className="text-lg font-semibold">
                        {personDetail.t_AcademicRanks} {personDetail.t_name} <strong>{personDetail.t_code}</strong>
                    </p>
                ) : (
                    <p className="text-lg font-semibold">{personDetail.s_name}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 print:hidden">วันที่เริ่มต้น</label>
                        <input
                            type="date"
                            className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 print:hidden"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 print:hidden">วันที่สิ้นสุด</label>
                        <input
                            type="date"
                            className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 print:hidden"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button
                        className="px-4 py-2 mt-6 bg-[#000066] text-white rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none print:hidden"
                        onClick={() => {
                            if (!startDate) {
                                alert("กรุณาเลือกวันที่เริ่มต้นก่อนค้นหา");
                                return;
                            }

                            if (endDate && new Date(endDate) < new Date(startDate)) {
                                alert("วันที่สิ้นสุดต้องอยู่ถัดจากวันที่เริ่มต้น");
                                return;
                            }

                            const today = new Date().toISOString().split("T")[0];
                            setFilterStartDate(startDate);
                            setFilterEndDate(endDate || today);
                        }}
                    >
                        ค้นหา
                    </button>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-4">ข้อมูลกิจกรรม</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 w-12 text-xs">ลำดับ</th>
                                <th className="border border-gray-300 px-4 py-2 w-12 text-xs">เลขคำสั่ง</th>
                                <th className="border border-gray-300 px-4 py-2 w-12 text-xs">ชื่อเอกสาร</th>
                                <th className="border border-gray-300 px-4 py-2 w-1/3 text-xs">ชื่อกิจกรรม</th>
                                <th className="border border-gray-300 px-4 py-2 w-24 text-xs">รายละเอียด</th>
                                <th
                                    className="border border-gray-300 px-4 py-2 w-12 text-xs cursor-pointer hover:bg-gray-200"
                                    onClick={toggleSortOrder}
                                >
                                    วันที่เริ่มต้น {sortOrder === "asc" ? <span className="print:hidden">▲</span> : <span className="print:hidden">▼</span>}
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-xs w-12">วันที่สิ้นสุด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssignations.length > 0 ? (
                                [...filteredAssignations]
                                    .sort((a, b) => {
                                        const dateA = new Date(a.eventDateStart);
                                        const dateB = new Date(b.eventDateStart);
                                        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
                                    })
                                    .map((assignation, index) => {
                                        const formatDate = (date) => {
                                            return new Intl.DateTimeFormat('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }).format(new Date(date));
                                        };

                                        return (
                                            <tr key={`${assignation.a_number}-${index}`} className="text-center">
                                                <td className="border border-gray-300 px-4 py-2 text-xs">{index + 1}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-xs">{assignation.a_number}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-xs">{assignation.docName}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-xs">{assignation.eventName}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-xs">{assignation.detail}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-xs">{formatDate(assignation.eventDateStart)}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-xs">{formatDate(assignation.eventDateEnd)}</td>
                                            </tr>
                                        );
                                    })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                                        ไม่มีข้อมูล
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default Detail;