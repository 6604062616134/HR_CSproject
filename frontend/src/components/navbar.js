import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTeacherListOpen, setIsTeacherListOpen] = useState(false);
    const [isStaffListOpen, setIsStaffListOpen] = useState(false);

    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen); // สลับสถานะเปิด/ปิดเมนูหลัก
    };

    const handleTeacherToggle = () => {
        setIsTeacherListOpen(!isTeacherListOpen); // สลับสถานะเปิด/ปิดรายชื่ออาจารย์
    };

    const handleStaffToggle = () => {
        setIsStaffListOpen(!isStaffListOpen); // สลับสถานะเปิด/ปิดรายชื่อเจ้าหน้าที่
    };

    return (
        <div>
            <nav className="bg-[#000066] p-4 fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto flex items-center gap-10">
                    <button onClick={handleToggle} className="text-white text-xl z-10">
                        ☰
                    </button>
                    <div className="text-white text-lg font-bold">HR-CS</div>
                </div>
            </nav>
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
                <div className="p-4">
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

export default Navbar;