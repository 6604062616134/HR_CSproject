import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [detail, setDetail] = useState(''); // รายละเอียดงาน

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

    useEffect(() => {
        if (isDropdownOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup เมื่อ component ถูก unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isDropdownOpen]);

    const createAssignation = async () => {
        try {
            const response = await axios.post('http://localhost:8000/assignation/create', {
                eventName,
                eventDateStart,
                eventDateEnd,
                number,
                docName,
                detail,
                selectedTeachers, // ส่งข้อมูลอาจารย์ที่เหลือกไปด้วย
            });
            console.log('Assignation created:', response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        try {
            await createAssignation(); // เรียก API เพื่อสร้างข้อมูล
            alert('ข้อมูลถูกส่งเรียบร้อยแล้ว!');
        } catch (error) {
            console.error('Error creating assignation:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
    };

    const handleCheckboxChange = (e, teacher) => {
        if (e.target.checked) {
            setSelectedTeachers((prev) => [...prev, teacher]);
        } else {
            setSelectedTeachers((prev) =>
                prev.filter((t) => t.t_ID !== teacher.t_ID)
            );
        }
    };

    const handleReset = () => {
        setEventName('');
        setEventDateStart('');
        setEventDateEnd('');
        setNumber('');
        setDocName('');
        setDetail('');
        setSelectedTeachers([]); // ล้างรายชื่ออาจารย์ที่เลือกด้วย
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-20">
                <form onSubmit={handleSubmit} className="w-full max-w-5xl flex gap-8">
                    {/* ส่วนช่องกรอกข้อมูล */}
                    <div className="flex-1 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-800">แบบฟอร์มกำหนดกิจกรรม</h2>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-lg"
                            >
                                รีเซ็ต
                            </button>
                        </div>
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
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">รายละเอียด</label>
                            <textarea
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 h-40 resize-none"
                                placeholder="รายละเอียดงาน"
                                required
                            />
                        </div>
                    </div>

                    <div className='flex flex-col w-1/2 gap-4 mb-2'>
                        {/* ส่วนรายชื่ออาจารย์ที่เลือก */}
                        <div className="flex-1 p-4 rounded-lg border relative h-[455px] overflow-visible">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-800">อาจารย์ที่เลือก</h3>
                                <div className="relative">
                                    <div className="flex flex-row gap-2">
                                        <div
                                            className="px-4 py-2 border rounded-lg bg-white cursor-pointer focus:outline-none shadow-lg z-50"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        >
                                            เลือกอาจารย์
                                        </div>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
                                            onClick={() => setSelectedTeachers([])}
                                        >
                                            ล้างรายการ
                                        </button>
                                    </div>
                                    {isDropdownOpen && (
                                        <div
                                            className="absolute z-[9999] mt-2 w-64 max-h-64 overflow-y-auto bg-white border rounded-lg shadow-lg"
                                            style={{ top: '100%', right: 0 }}
                                        >
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
                            </div>
                            <div className="max-h-[400px] overflow-y-auto pb-10">
                                {selectedTeachers.length > 0 ? (
                                    selectedTeachers.map((teacher, index) => (
                                        <div
                                            key={teacher.t_ID}
                                            className={`flex items-center text-sm text-gray-700 ${index !== selectedTeachers.length - 1 ? 'border-b border-gray-300 pb-2 mb-2' : ''
                                                }`}
                                        >
                                            <span>{teacher.t_AcademicRanks}</span>
                                            <span className="ml-1">{teacher.t_name}</span>
                                            <span className="ml-4 font-bold">{teacher.t_code}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">ยังไม่มีอาจารย์ที่ถูกเลือก</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#000066] hover:bg-gray-700 text-white py-2 rounded-lg transition-all shadow-lg"
                        >
                            ยืนยัน
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Assign;