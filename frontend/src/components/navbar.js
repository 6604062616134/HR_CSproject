import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Navbar({ className = "" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTeacherListOpen, setIsTeacherListOpen] = useState(false);
    const [isStaffListOpen, setIsStaffListOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/teacher/'); // URL ของ API
                setTeachers(response.data); // เก็บข้อมูลใน state
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get('http://localhost:8000/staff/'); // URL ของ API
                setStaff(response.data); // เก็บข้อมูลใน state
            } catch (error) {
                console.error('Error fetching staff:', error);
            }
        };

        fetchStaff();
    }, []);

    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen); // สลับสถานะเปิด/ปิดเมนูหลัก
    };

    const handleTeacherToggle = () => {
        setIsTeacherListOpen(!isTeacherListOpen); // สลับสถานะเปิด/ปิดรายชื่ออาจารย์
    };

    const handleStaffToggle = () => {
        setIsStaffListOpen(!isStaffListOpen); // สลับสถานะเปิด/ปิดรายชื่อเจ้าหน้าที่
    };

    const fetchTeacherById = async (teacherId) => {
        try {
            const response = await axios.get(`http://localhost:8000/teacher/${teacherId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching teacher data:', error);
            return null;
        }
    }

    const fetchStaffById = async (staffId) => {
        try {
            const response = await axios.get(`http://localhost:8000/staff/${staffId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching staff data:', error);
            return null;
        }
    }

    return (
        <div>
            <nav className="bg-[#000066] p-4 fixed top-0 left-0 w-full z-50 print:hidden">
                <div className="flex items-center justify-between px-4 lg:px-8">
                    {/* ปุ่ม ☰ หรือ ✕ */}
                    <div className="flex items-center gap-4">
                        <button onClick={handleToggle} className="text-white text-xl z-10">
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                        <div className="text-white text-lg font-bold">HR-CS</div>
                    </div>
                </div>
            </nav>
            {/* ไซด์บาร์ */}
            <div
                className={`fixed top-0 left-0 h-full bg-[#000066] text-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-40 overflow-y-auto print:hidden`}
                style={{ width: '304px' }}
            >
                <button
                    onClick={handleToggle}
                    className="text-white text-xl absolute top-4 right-4"
                >
                    ✕
                </button>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">เมนู</h2>
                    <NavLink
                        to="/"
                        className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded-3xl"
                        onClick={handleToggle}
                    >
                        มอบหมายงาน
                    </NavLink>
                    <NavLink
                        to="/project"
                        className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded-3xl"
                        onClick={handleToggle}
                    >
                        สอบโปรเจค
                    </NavLink>
                    <NavLink
                        to="/staffProject"
                        className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded-3xl"
                        onClick={handleToggle}>
                        ตรวจโปรเจค(เจ้าหน้าที่)
                    </NavLink>
                    <hr className="my-4 border-t border-1 border-gray-300 w-64 mx-auto" />
                    <button
                        onClick={handleTeacherToggle}
                        className="w-full flex justify-between items-center px-4 py-2 text-white font-bold hover:bg-white hover:text-black rounded-3xl"
                    >
                        อาจารย์
                        <span className={`transform transition-transform ${isTeacherListOpen ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    {/* รายชื่ออาจารย์ */}
                    {isTeacherListOpen && (
                        <div className="ml-4 mt-2 max-h-64 overflow-y-auto scrollbar-custom">
                            {teachers.map((teacher) => (
                                <NavLink
                                    key={teacher.t_ID}
                                    to={`/detail/teacher/${teacher.t_ID}`} // ส่ง type "teacher" และ id
                                    className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded-3xl"
                                    onClick={handleToggle}
                                >
                                    {teacher.t_name}
                                </NavLink>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={handleStaffToggle}
                        className="w-full flex justify-between items-center px-4 py-2 text-white font-bold hover:bg-white hover:text-black rounded-3xl"
                    >
                        เจ้าหน้าที่
                        <span className={`transform transition-transform ${isStaffListOpen ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    {/* รายชื่อเจ้าหน้าที่ */}
                    {isStaffListOpen && (
                        <div className="ml-4 mt-2 max-h-64 overflow-y-auto scrollbar-custom">
                            {staff.map((staffMember) => (
                                <NavLink
                                    key={staffMember.s_ID}
                                    to={`/detail/staff/${staffMember.s_ID}`} // ส่ง type "staff" และ id
                                    className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded-3xl"
                                    onClick={handleToggle}
                                >
                                    {staffMember.s_name}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;