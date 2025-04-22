import { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarProject from '../components/navbar-project';

function Project() {
    const [students, setStudents] = useState([]); // สร้าง State สำหรับเก็บข้อมูลนักศึกษา

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/student/all');
                setStudents(response.data); // เก็บข้อมูลใน State
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <NavbarProject />
            <div className="flex flex-col p-4 mt-16">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">รายชื่อนักศึกษาที่เข้าสอบโปรเจค</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2 border text-sm">ลำดับ</th>
                                <th className="px-4 py-2 border text-sm">วันที่</th>
                                <th className="px-4 py-2 border text-sm">ปริญญานิพนธ์เรื่อง(ไทย)</th>
                                <th className="px-4 py-2 border text-sm">ปริญญานิพนธ์เรื่อง(อังกฤษ)</th>
                                <th className="px-4 py-2 border text-sm">ชื่อ-นามสกุล</th>
                                <th className="px-4 py-2 border text-sm">ประธานกรรมการ</th>
                                <th className="px-4 py-2 border text-sm">กรรมการ</th>
                                <th className="px-4 py-2 border text-sm">อาจารย์ที่ปรึกษาหลัก</th>
                                <th className="px-4 py-2 border text-sm">อาจารย์ที่ปรึกษาร่วม</th>
                                <th className="px-4 py-2 border text-sm">ปีการศึกษา</th>
                                <th className="px-4 py-2 border text-sm">ห้องสอบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id} className="text-gray-700 hover:bg-gray-100">
                                    <td className="px-4 py-2 border text-sm text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border text-sm">
                                        {new Date(student.datetime).toLocaleDateString('th-TH', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.thesisnameTH}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.thesisnameEN}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.FLname}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.chairman}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.director}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.ManinMentor}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.CoMentor}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.year}</td>
                                    <td className="px-4 py-2 border text-sm break-words whitespace-normal">{student.room}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Project;