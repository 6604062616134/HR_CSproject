import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import NavbarStaffProject from "../components/navbar-Staffproject";
import axios from 'axios';

function StaffProject() {
    const [data, setData] = useState([]); // เก็บข้อมูลจาก API

    useEffect(() => {
        const fetchData = async () => {
            try {
                // เปลี่ยน Endpoint API ที่นี่
                const response = await axios.get('http://localhost:8000/student'); // หรือ 'http://localhost:8000/assignation'
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <NavbarStaffProject />
            <h1 className="text-2xl font-bold mb-4">Staff Project</h1>
            <p className="mb-6">Welcome to the Staff Project page!</p>

            {/* ตารางแสดงข้อมูล */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">ชื่อโปรเจค</th>
                            <th className="border border-gray-300 px-4 py-2">ชื่อนศ</th>
                            <th className="border border-gray-300 px-4 py-2">รหัสนศ</th>
                            <th className="border border-gray-300 px-4 py-2">ชื่อสตาฟ</th>
                            <th className="border border-gray-300 px-4 py-2">ปีการศึกษา</th>
                            <th className="border border-gray-300 px-4 py-2">อาจารย์</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{item.projectName || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.studentName || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.studentCode || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.staffName || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.academicYear || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.mentorName || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StaffProject;