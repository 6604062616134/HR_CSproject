import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function NavbarStaffProject() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTeacherListOpen, setIsTeacherListOpen] = useState(false);
    const [isStaffListOpen, setIsStaffListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [staff, setStaff] = useState([]);
    const [formData, setFormData] = useState({
        datetime: '',
        thesisnameTH: '',
        thesisnameEN: '',
        studentCode1: '',
        studentCode2: '',
        FLname1: '',
        FLname2: '',
        MainMentor: '',
        year: '',
        note: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseTeachers = await axios.get('http://localhost:8000/teacher/');
            setTeachers(responseTeachers.data);

            const responseStaff = await axios.get('http://localhost:8000/staff/');
            setStaff(responseStaff.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า

        if (!formData.thesisnameTH && !formData.thesisnameEN) {
            alert('กรุณากรอกชื่อปริญญานิพนธ์อย่างน้อย 1 ช่อง');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/student/create', formData);
            if (response.status === 200) {
                alert('บันทึกข้อมูลสำเร็จ');
                fetchData(); // โหลดข้อมูลใหม่
                handleModalToggle(); // ปิด Modal อัตโนมัติ
                setFormData({
                    datetime: '',
                    thesisnameTH: '',
                    thesisnameEN: '',
                    studentCode1: '',
                    studentCode2: '',
                    FLname1: '',
                    FLname2: '',
                    chairman: '',
                    director: '',
                    MainMentor: '',
                    CoMentor: '',
                    year: '',
                    room: '',
                    grade: '',
                    note: '',
                }); // เคลียร์ข้อมูลในฟอร์ม
            }
        } catch (error) {
            console.error('Error creating student thesis info:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/teacher/');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        const fetchStaff = async () => {
            try {
                const response = await axios.get('http://localhost:8000/staff/');
                setStaff(response.data);
            } catch (error) {
                console.error('Error fetching staff:', error);
            }
        };

        fetchTeachers();
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

    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };

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

                    {/* ปุ่มเพิ่มข้อมูล */}
                    <button
                        className="px-3 py-1 bg-white text-sm text-black rounded-3xl shadow-lg hover:bg-green-600 hover:scale-105 hover:text-white transition-all duration-300 ease-in-out"
                        onClick={handleModalToggle}
                    >
                        เพิ่มข้อมูล
                    </button>
                </div>
            </nav>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl shadow-lg w-[800px]">
                        <h2 className="text-lg font-bold mb-4 no-print">เพิ่มข้อมูลนักศึกษา</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">วันที่สอบ</label>
                                    <input
                                        type="date"
                                        name="datetime"
                                        value={formData.datetime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex-[2] min-w-[300px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ปริญญานิพนธ์เรื่อง (ไทย)</label>
                                    <input
                                        type="text"
                                        name="thesisnameTH"
                                        value={formData.thesisnameTH}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ชื่อปริญญานิพนธ์ (ไทย)"
                                    />
                                </div>
                                <div className="flex-[2] min-w-[300px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ปริญญานิพนธ์เรื่อง (อังกฤษ)</label>
                                    <input
                                        type="text"
                                        name="thesisnameEN"
                                        value={formData.thesisnameEN}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ชื่อปริญญานิพนธ์ (อังกฤษ)"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">รหัสนักศึกษา 1</label>
                                    <input
                                        type="text"
                                        name="studentCode1"
                                        value={formData.studentCode1}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="รหัสนักศึกษา 1"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">รหัสนักศึกษา 2</label>
                                    <input
                                        type="text"
                                        name="studentCode2"
                                        value={formData.studentCode2}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="รหัสนักศึกษา 2"
                                    />
                                </div>
                                <div className="flex-[2] min-w-[300px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล (นักศึกษา)</label>
                                    <input
                                        type="text"
                                        name="FLname1"
                                        value={formData.FLname1}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ชื่อ-นามสกุล (นักศึกษา)"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ปีการศึกษา</label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ปีการศึกษา"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded-3xl hover:bg-gray-400"
                                    onClick={handleModalToggle}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
                                >
                                    บันทึก
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* ไซด์บาร์ */}
            <div
                className={`fixed top-0 left-0 h-full bg-[#000066] text-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
                style={{ width: '304px' }}
            >
                <button
                    onClick={handleToggle}
                    className="text-white text-xl absolute top-4 right-4"
                >
                    ✕
                </button>
                <div className="p-4 mt-4">
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

export default NavbarStaffProject;