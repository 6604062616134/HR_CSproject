import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function NavbarProject() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTeacherListOpen, setIsTeacherListOpen] = useState(false);
    const [isStaffListOpen, setIsStaffListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(!isModalOpen); // เปิด/ปิด Modal
    };

    return (
        <div>
            <nav className="bg-[#000066] p-4 fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto flex items-center justify-between">
                    {/* โลโก้และเมนู */}
                    <div className="flex items-center gap-10">
                        <button onClick={handleToggle} className="text-white text-xl z-10">
                            ☰
                        </button>
                        <div className="text-white text-lg font-bold">HR-CS</div>
                    </div>
                    {/* ปุ่มเพิ่มข้อมูลนักศึกษา */}
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md"
                        onClick={handleModalToggle}
                    >
                        เพิ่มข้อมูลนักศึกษา
                    </button>
                </div>
            </nav>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[800px]">
                        <h2 className="text-lg font-bold mb-4">เพิ่มข้อมูลนักศึกษา</h2>
                        <form>
                            <div className="flex flex-wrap gap-4">
                                {/* <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ลำดับ</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ลำดับ"
                                    />
                                </div> */}
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">วันที่</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex-[2] min-w-[300px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div className="flex-[2] min-w-[300px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ปริญญานิพนธ์เรื่อง (ไทย)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="หัวข้อปริญญานิพนธ์ (ไทย)"
                                    />
                                </div>
                                <div className="flex-[2] min-w-[300px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ปริญญานิพนธ์เรื่อง (อังกฤษ)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="หัวข้อปริญญานิพนธ์ (อังกฤษ)"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ประธานกรรมการ</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ประธานกรรมการ"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">กรรมการ</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="กรรมการ"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">อาจารย์ที่ปรึกษาหลัก</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="อาจารย์ที่ปรึกษาหลัก"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">อาจารย์ที่ปรึกษาร่วม</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="อาจารย์ที่ปรึกษาร่วม"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ปีการศึกษา</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ปีการศึกษา"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ห้องสอบ</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ห้องสอบ"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                    onClick={handleModalToggle}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
                        className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                        onClick={handleToggle}
                    >
                        มอบหมายงาน
                    </NavLink>
                    <NavLink
                        to="/project"
                        className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                        onClick={handleToggle}
                    >
                        สอบโปรเจค
                    </NavLink>
                    <NavLink
                        to="/grade"
                        className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                        onClick={handleToggle}
                    >
                        ประชุมเกรดภาควิชา
                    </NavLink>
                    <hr className="my-4 border-t border-1 border-gray-300 w-64 mx-auto" />
                    <button
                        onClick={handleTeacherToggle}
                        className="w-full flex justify-between items-center px-4 py-2 text-white font-bold hover:bg-white hover:text-black rounded"
                    >
                        อาจารย์
                        <span className={`transform transition-transform ${isTeacherListOpen ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    {/* รายชื่ออาจารย์ */}
                    {isTeacherListOpen && (
                        <div className="ml-4 mt-2 max-h-64 overflow-y-auto scrollbar-custom">
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.อัครา ประโยชน์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.อภิสิทธิ์ รัตนาตรานุรักษ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                อ.อนุสรณ์ วงษ์สนิท
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                รศ.ดร. เบญจพร ลิ้มธรรมาภรณ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.เฉียบวุฒิ รัตนวิไลสกุล
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                อ.เอิญ สุริยะฉาย
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                รศ.ดร.กฤดาภัทร สีหารี
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.คันธารัตน์ อเนกบุณย์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                รศ.ดร.กอบเกียรติ สระอุบล
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.ลือพล พิพานเมฆาภรณ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                อ.ดร.ณัฐกิตติ์ จิตรเอื้อตระกูล
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.นิกร สุทธิเสงี่ยม
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                อ.ณัฐวุฒิ สร้อยดอกสน
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.นนทกร สถิตานนท์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                อ.ปรัชญาพร เลี้ยงสุทธิสกนธ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                รศ.ดร.ปรวัฒน์ วิสูตรศักดิ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.สรร รัตนสัญญา
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.สถิตย์ ประสมพันธ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                ผศ.ดร.สุวัจชัย กมลสันติโรจน์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                รศ.ดร.ธนภัทร์ อนุศาสน์อมรกุล
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                อ.ดร.ธรรศฏภณ สุระศักดิ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                อ.ยนต์ชนก เขาแก้ว
                            </NavLink>
                        </div>
                    )}
                    <button
                        onClick={handleStaffToggle}
                        className="w-full flex justify-between items-center px-4 py-2 text-white font-bold hover:bg-white hover:text-black rounded"
                    >
                        เจ้าหน้าที่
                        <span className={`transform transition-transform ${isStaffListOpen ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    {/* รายชื่อเจ้าหน้าที่ */}
                    {isStaffListOpen && (
                        <div className="ml-4 mt-2 max-h-64 overflow-y-auto scrollbar-custom">
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                นาย ฐิตินันท์ ขันทอง
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                นางสาว อาลิษา หุ่นไทย
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                นางสาว จันทิมา อรรฆรุจิรัตน์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                นาย เกรียงไกร เอี่ยมวงค์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                นายนที ปัญญาประสิทธิ์
                            </NavLink>
                            <NavLink
                                to="/detail"
                                className="block py-2 px-4 text-white hover:bg-white hover:text-black rounded"
                                onClick={handleToggle}
                            >
                                นางสาว อุษณีย์ บัลลังน้อย
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavbarProject;