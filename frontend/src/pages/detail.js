import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

function Detail({ type }) {
    const { id } = useParams(); // ดึง id จาก URL
    const [personDetail, setPersonDetail] = useState(null);
    const [assignations, setAssignations] = useState([]);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const endpoint = type === 'teacher'
                    ? `http://localhost:8000/teacher/${id}` // API สำหรับอาจารย์
                    : `http://localhost:8000/staff/${id}`; // API สำหรับเจ้าหน้าที่
                const response = await axios.get(endpoint);
                console.log('API Response:', response.data); // ตรวจสอบข้อมูลที่ได้รับ
                setPersonDetail(response.data); // เก็บข้อมูลใน state
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
                    params: { type }, // ส่ง type (teacher หรือ staff) เป็น query parameter
                });
                console.log('Assignations Response:', response.data);
                setAssignations(response.data); // เก็บข้อมูล assignations ใน state
            } catch (error) {
                console.error('Error fetching assignations:', error);
            }
        };

        fetchAssignations();
    }, [id, type]);

    if (!personDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10 p-10">
                {type === 'teacher' ? (
                    // แสดงข้อมูลสำหรับอาจารย์
                    <>
                        <p>{personDetail.t_AcademicRanks} {personDetail.t_name} <strong>{personDetail.t_code}</strong></p>
                    </>
                ) : (
                    // แสดงข้อมูลสำหรับสตาฟ
                    <>
                        <p>{personDetail.s_name}</p>
                    </>
                )}
                <div className="flex items-center w-1/2 mt-4 gap-2">
                    {/* ปุ่มเลือกวันที่เริ่มต้น */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">วันที่เริ่มต้น</label>
                        <input
                            type="date"
                            className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => console.log('วันที่เริ่มต้นที่เลือก:', e.target.value)}
                        />
                    </div>

                    {/* ปุ่มเลือกวันที่สิ้นสุด */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">วันที่สิ้นสุด</label>
                        <input
                            type="date"
                            className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => console.log('วันที่สิ้นสุดที่เลือก:', e.target.value)}
                        />
                    </div>
                </div>
                {/* ตารางแสดงข้อมูลกิจกรรมในช่วงเวลาที่เลือก */}
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-4">ข้อมูลกิจกรรม</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">ลำดับ</th>
                                <th className="border border-gray-300 px-4 py-2">เลขคำสั่ง</th>
                                <th className="border border-gray-300 px-4 py-2">ชื่อกิจกรรม</th>
                                <th className="border border-gray-300 px-4 py-2">ชื่อเอกสาร</th>
                                <th className="border border-gray-300 px-4 py-2">วันที่เริ่มต้น</th>
                                <th className="border border-gray-300 px-4 py-2">วันที่สิ้นสุด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignations.length > 0 ? (
                                assignations.map((assignation, index) => (
                                    <tr key={assignation.id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{assignation.a_number}</td>
                                        <td className="border border-gray-300 px-4 py-2">{assignation.eventName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{assignation.docName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{assignation.eventDateStart}</td>
                                        <td className="border border-gray-300 px-4 py-2">{assignation.eventDateEnd}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                                        ไม่มีข้อมูลกิจกรรม
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