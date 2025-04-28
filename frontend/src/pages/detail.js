import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import { re } from "mathjs";

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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAssignation, setCurrentAssignation] = useState(null);
    const [useTodayAsEndDate, setUseTodayAsEndDate] = useState(false);
    const [editData, setEditData] = useState({
        a_number: '',
        docName: '',
        eventName: '',
        detail: '',
        eventDateStart: '',
        eventDateEnd: '',
    });

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
        const filterStart = filterStartDate ? new Date(filterStartDate + 'T00:00:00') : null;
        // กรณีเลือกเฉพาะวันที่เริ่มต้น
        if (filterStart && !filterEnd) {
            return eventStart >= filterStart;
        }
        const filterEnd = filterEndDate ? new Date(filterEndDate + 'T23:59:59') : null;
        const eventEnd = new Date(assignation.eventDateEnd);


        if (!filterStart && !filterEnd) return true;


        // กรณีเลือกทั้งเริ่มต้นและสิ้นสุด
        if (filterStart && filterEnd) {
            return eventStart >= filterStart && eventStart <= filterEnd;
        }

        // กรณีเลือกเฉพาะวันที่สิ้นสุด
        if (!filterStart && filterEnd) {
            return eventStart <= filterEnd;
        }

        return true;
    });

    const toggleSortOrder = (field) => {
        setSortField(field); // ตั้งค่าฟิลด์ที่ต้องการเรียงลำดับ
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc")); // สลับลำดับการเรียง
    };

    const handleEdit = (assignation) => {
        setCurrentAssignation(assignation);
        setEditData({
            a_number: assignation.a_number || '',
            docName: assignation.docName || '',
            eventName: assignation.eventName || '',
            detail: assignation.detail || '',
            eventDateStart: assignation.eventDateStart || '',
            eventDateEnd: assignation.eventDateEnd || '',
            linkFile: assignation.linkFile || '',
        });
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setCurrentAssignation(null);
    };

    const handleDelete = async (a_number) => {
        if (window.confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
            try {
                await axios.delete(`http://localhost:8000/assignation/delete/${a_number}`);
                alert("ลบข้อมูลสำเร็จ!");
                setAssignations((prev) => prev.filter((assignation) => assignation.a_number !== a_number));
                setIsEditModalOpen(false); // ปิด Modal หลังจากลบข้อมูลสำเร็จ
            } catch (error) {
                console.error("Error deleting assignation:", error);
                alert("เกิดข้อผิดพลาดในการลบข้อมูล");
            }
        }
    };

    const handleSave = async () => {
        if (!currentAssignation?.a_ID) {
            alert('ไม่พบข้อมูลที่ต้องการแก้ไข');
            return;
        }

        try {
            await axios.put(`http://localhost:8000/assignation/update/${currentAssignation.a_ID}`, {
                a_number: editData.a_number,
                docName: editData.docName,
                eventName: editData.eventName,
                detail: editData.detail,
                eventDateStart: editData.eventDateStart,
                eventDateEnd: editData.eventDateEnd,
                linkFile: editData.linkFile,
            });
            alert('บันทึกข้อมูลสำเร็จ!');
            setIsEditModalOpen(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ

            // อัปเดตข้อมูลในตาราง
            setAssignations((prev) =>
                prev.map((assignation) =>
                    assignation.a_ID === currentAssignation.a_ID
                        ? { ...assignation, ...editData }
                        : assignation
                )
            );
        } catch (error) {
            console.error('Error updating assignation:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div>
            <Navbar className="print:hidden" />
            <div className="container mt-10 px-12 py-12">
                <div className="flex flex-row gap-4">
                    {type === 'teacher' ? (
                        <p className="text-lg font-semibold mt-6 text-left">
                            {personDetail.t_AcademicRanks} {personDetail.t_name} <strong>{personDetail.t_code}</strong>
                        </p>
                    ) : (
                        <p className="text-lg font-semibold text-left">{personDetail.s_name}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 print:hidden text-left">วันที่เริ่มต้น</label>
                            <input
                                type="date"
                                className="w-40 px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 print:hidden"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 print:hidden text-left">วันที่สิ้นสุด</label>
                            <input
                                type="date"
                                className="w-40 px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 print:hidden"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-6 print:hidden">
                            <input
                                type="checkbox"
                                checked={useTodayAsEndDate}
                                onChange={() => setUseTodayAsEndDate(!useTodayAsEndDate)}
                                className="print:hidden"
                            />
                            <label className="text-sm text-gray-700 text-left">ถึงวันปัจจุบัน</label>
                        </div>
                        <button
                            className="px-4 py-2 bg-[#000066] text-white rounded-3xl shadow-lg hover:bg-gray-600 mt-4 transition-all duration-300 ease-in-out focus:outline-none print:hidden"
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
                                setFilterEndDate(endDate || (useTodayAsEndDate ? today : ""));
                            }}
                        >
                            ค้นหา
                        </button>
                    </div>
                </div>
            </div>
            <div className="activityTable overflow-x-auto">
                <div className="w-full max-w-full mx-auto pr-12 pl-12">
                    <h2 className="text-lg font-bold mb-4">ข้อมูลกิจกรรม</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300 activityTableBorder">
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
                                <th className="border border-gray-300 px-4 py-2 text-xs w-12 print:hidden">ลิงค์ไฟล์</th>
                                <th className="border border-gray-300 px-4 py-2 w-8 text-xs print:hidden">แก้ไข</th>
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
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                                calendar: 'buddhist', // ใช้ปฏิทินพุทธศักราช
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
                                                <td className="border border-gray-300 px-4 py-2 text-xs print:hidden">
                                                    <a href={assignation.linkFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">
                                                        ไฟล์ที่แนบ
                                                    </a>
                                                </td>
                                                <td className="border border-gray-300 px-2 py-1 text-xs print:hidden">
                                                    <button
                                                        className="px-2 py-1 bg-[#000066] text-white rounded-3xl hover:scale-105 hover:bg-white hover:text-black shadow-lg transition-transform duration-300 text-xs"
                                                        onClick={() => handleEdit(assignation)}
                                                    >
                                                        แก้ไข
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="border border-gray-300 px-4 py-2 text-center">
                                        ไม่มีข้อมูล
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                            <div className="flex justify-between items-center gap-4 mb-2">
                                <h2 className="block text-lg font-semibold text-gray-700">แก้ไขข้อมูล</h2>
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded-3xl shadow-lg hover:bg-red-600 text-xs"
                                    onClick={() => handleDelete(currentAssignation.a_number)}
                                >
                                    ลบข้อมูล
                                </button>
                            </div>
                            <div className="mb-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">เลขคำสั่ง</label>
                                    <input
                                        type="text"
                                        value={editData.a_number}
                                        onChange={(e) => setEditData({ ...editData, a_number: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ชื่อเอกสาร</label>
                                    <input
                                        type="text"
                                        value={editData.docName}
                                        onChange={(e) => setEditData({ ...editData, docName: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ชื่อกิจกรรม</label>
                                    <input
                                        type="text"
                                        value={editData.eventName}
                                        onChange={(e) => setEditData({ ...editData, eventName: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">รายละเอียด</label>
                                    <textarea
                                        value={editData.detail}
                                        onChange={(e) => setEditData({ ...editData, detail: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">วันที่เริ่มต้น</label>
                                        <input
                                            type="date"
                                            value={editData.eventDateStart}
                                            onChange={(e) => setEditData({ ...editData, eventDateStart: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">วันที่สิ้นสุด</label>
                                        <input
                                            type="date"
                                            value={editData.eventDateEnd}
                                            onChange={(e) => setEditData({ ...editData, eventDateEnd: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ลิงก์ไฟล์</label>
                                    <input
                                        type="text"
                                        value={editData.linkFile}
                                        onChange={(e) => setEditData({ ...editData, linkFile: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ลิงก์ไฟล์"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    className="px-4 py-2 bg-[#000066] text-white rounded-3xl shadow-lg hover:bg-green-600"
                                    onClick={handleSave}
                                >
                                    บันทึก
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded-3xl -3xl shadow-lg hover:bg-gray-400"
                                    onClick={handleCloseModal}
                                >
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >

    );
}

export default Detail;