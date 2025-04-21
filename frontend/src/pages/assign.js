import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/navbar';

function Assign() {
    const [eventName, setEventName] = useState('');
    const [eventDateStart, setEventDateStart] = useState('');
    const [eventDateEnd, setEventDateEnd] = useState('');
    const [number, setNumber] = useState(''); //เลขคำสั่ง(เป็นnullได้)
    const [docName, setDocName] = useState(''); //ชื่อเอกสาร
    const [teachers, setTeachers] = useState([]); // รายชื่ออาจารย์
    const [selectedTeachers, setSelectedTeachers] = useState([]); // เก็บอาจารย์ที่ถูกเลือก
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/teacher/'); // URL ของ API
                setTeachers(response.data); // อัปเดต state ด้วยข้อมูลอาจารย์
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            eventName,
            eventDateStart,
            eventDateEnd,
            number,
            docName,
        });
        alert('ข้อมูลถูกส่งเรียบร้อยแล้ว!');
    };

    const handleCheckboxChange = (e, teacher) => {
        if (e.target.checked) {
            // เพิ่มอาจารย์ที่ถูกเลือกเข้าไปใน selectedTeachers
            setSelectedTeachers((prev) => [...prev, teacher]);
        } else {
            // ลบอาจารย์ที่ถูกยกเลิกการเลือกออกจาก selectedTeachers
            setSelectedTeachers((prev) =>
                prev.filter((t) => t.t_ID !== teacher.t_ID)
            );
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-20">
                <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">แบบฟอร์มกำหนดกิจกรรม</h2>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">ชื่อกิจกรรม</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="ชื่อกิจกรรม"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 text-sm text-gray-600">วันที่เริ่มต้น</label>
                            <input
                                type="date"
                                value={eventDateStart}
                                onChange={(e) => setEventDateStart(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 text-sm text-gray-600">วันที่สิ้นสุด</label>
                            <input
                                type="date"
                                value={eventDateEnd}
                                onChange={(e) => setEventDateEnd(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-600">เลขคำสั่ง</label>
                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="เลขคำสั่ง"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-600">ชื่อเอกสาร</label>
                        <input
                            type="text"
                            value={docName}
                            onChange={(e) => setDocName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="ชื่อเอกสาร"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block mb-1 text-sm text-gray-600">เลือกอาจารย์</label>
                        <div
                            className="px-4 py-2 border rounded-lg bg-white cursor-pointer focus:outline-none"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {selectedTeachers.length > 0
                                ? selectedTeachers.map((teacher) => teacher.t_name).join(', ')
                                : 'เลือกอาจารย์'}
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow">
                                {teachers.map((teacher) => (
                                    <div key={teacher.t_ID} className="flex items-center px-4 py-2 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            id={`teacher-${teacher.t_ID}`}
                                            checked={selectedTeachers.some((t) => t.t_ID === teacher.t_ID)}
                                            onChange={(e) => handleCheckboxChange(e, teacher)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`teacher-${teacher.t_ID}`} className="text-sm text-gray-700">
                                            {teacher.t_name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedTeachers.length > 0 && (
                        <div className="p-4 rounded-lg bg-gray-50 border">
                            <h3 className="font-medium mb-2 text-gray-800">อาจารย์ที่เลือก</h3>
                            {selectedTeachers.map((teacher) => (
                                <div key={teacher.t_ID} className="text-sm text-gray-700 mb-1">
                                    <p><strong>ชื่อ:</strong> {teacher.t_name}</p>
                                    <p><strong>ตำแหน่ง:</strong> {teacher.t_AcademicRanks}</p>
                                    <p><strong>รหัส:</strong> {teacher.t_code}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#000066] hover:bg-gray-700 text-white py-2 rounded-lg transition-all"
                    >
                        ยืนยัน
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Assign;