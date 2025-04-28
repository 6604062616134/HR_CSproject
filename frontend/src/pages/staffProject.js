import { useState, useEffect } from "react";
import NavbarStaffProject from "../components/navbar-Staffproject";
import axios from 'axios';

function StaffProject() {
    const [data, setData] = useState([]); // เก็บข้อมูลจาก API
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // สำหรับเปิด/ปิด modal
    const [editData, setEditData] = useState(null); // เก็บข้อมูลของแถวที่ต้องการแก้ไข
    const [searchTerm, setSearchTerm] = useState(''); // เก็บคำค้นหา
    const [searchTermYear, setSearchTermYear] = useState(''); // เก็บค่าปีการศึกษาที่เลือก
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // สำหรับเปิด/ปิดดรอปดาวน์

    useEffect(() => {
        const fetchData = async () => {
            try {
                // เรียก API /getall จาก staffProjectController
                const response = await axios.get('http://localhost:8000/staffproject/getall');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = (item) => {
        setEditData({ ...item });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/staffproject/update/${editData.sp_ID}`, editData);
            if (response.status === 200) {
                alert('แก้ไขข้อมูลสำเร็จ');
                setIsEditModalOpen(false); // ปิด modal
                window.location.reload(); // รีเฟรชหน้าเว็บเพื่อโหลดข้อมูลใหม่
            }
        } catch (error) {
            console.error('Error updating data:', error);
            alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
        }
    };

    const filteredData = data.filter((item) => {
        const search = searchTerm.toLowerCase();
        const yearMatch = searchTermYear ? item.year === searchTermYear : true; // กรองตามปีการศึกษา
        return (
            yearMatch && // ตรวจสอบว่าตรงกับปีการศึกษาที่เลือก
            (
                item.thesisNameTH?.toLowerCase().includes(search) || // ชื่อโปรเจค (ไทย)
                item.thesisNameEN?.toLowerCase().includes(search) || // ชื่อโปรเจค (อังกฤษ)
                item.teacherName?.toLowerCase().includes(search) || // ชื่ออาจารย์
                item.staffName?.toLowerCase().includes(search) || // ชื่อเจ้าหน้าที่
                item.studentName1?.toLowerCase().includes(search) || // ชื่อนักศึกษา 1
                item.studentName2?.toLowerCase().includes(search) || // ชื่อนักศึกษา 2
                item.studentID_1?.toLowerCase().includes(search) || // รหัสนักศึกษา 1
                item.studentID_2?.toLowerCase().includes(search) // รหัสนักศึกษา 2
            )
        );
    });

    return (
        <div className="container mx-auto px-4 py-20">
            <NavbarStaffProject className="print:hidden" />
            <div className="flex items-center gap-4 mb-4">
                <h1 className="text-xl font-bold">ตารางการตรวจโปรเจคสำหรับเจ้าหน้าที่</h1>
                <div className="flex items-center gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="ค้นหา..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border text-xs rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <div
                            className="px-4 py-2 border rounded-3xl bg-white cursor-pointer focus:outline-none z-50 text-xs hover:bg-gray-100 hover:text-blue-600 transition-all duration-300 ease-in-out flex items-center justify-between"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {searchTermYear || 'เลือกเทอม'}
                            <span className={`ml-2 transform transition-transform duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        {isDropdownOpen && (
                            <div
                                className="absolute z-[9999] mt-2 text-xs w-64 max-h-64 overflow-y-auto bg-white border rounded-3xl shadow-lg"
                                style={{ top: '100%' }}
                            >
                                {/* ตัวเลือกค่าว่าง */}
                                <div
                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                                    onClick={() => {
                                        setSearchTermYear(''); // ตั้งค่าเป็นค่าว่าง
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    -
                                </div>
                                {/* ตัวเลือกเทอม */}
                                {['1/2566', '2/2566', '1/2567', '2/2567', '1/2568', '2/2568', '1/2569', '2/2569', '1/2570', '2/2570'].map((term) => (
                                    <div
                                        key={term}
                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                                        onClick={() => {
                                            setSearchTermYear(term);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {term}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* ตารางแสดงข้อมูล */}
            <div className="overflow-x-auto flex-grow w-full">
                <table className="w-full bg-white border border-gray-300 rounded-3xl print-cell">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="px-4 py-2 border text-xs">ชื่อโปรเจค</th>
                            <th className="px-4 py-2 border text-xs">ชื่อนักศึกษา</th>
                            <th className="px-4 py-2 border text-xs">รหัสนักศึกษา</th>
                            <th className="px-4 py-2 border text-xs">ปีการศึกษา</th>
                            <th className="px-4 py-2 border text-xs">อาจารย์</th>
                            <th className="px-4 py-2 border text-xs">เจ้าหน้าที่</th>
                            <th className="px-4 py-2 border text-xs">ตรวจ</th>
                            <th className="px-4 py-2 border text-xs">หมายเหตุ</th>
                            <th className="px-4 py-2 border text-xs print:hidden">แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-4 py-2 border text-xs break-words whitespace-normal">
                                        {item.thesisNameTH || '-'} <br /> {item.thesisNameEN || '-'}
                                    </td>
                                    <td className="px-4 py-2 border text-xs break-words whitespace-normal">
                                        {item.studentName1 || '-'} <br /> {item.studentName2 || '-'}
                                    </td>
                                    <td className="px-4 py-2 border text-xs break-words whitespace-normal">
                                        {item.studentID_1 || '-'} <br /> {item.studentID_2 || '-'}
                                    </td>
                                    <td className="px-4 py-2 border text-xs text-center">{item.year || '-'}</td>
                                    <td className="px-4 py-2 border text-xs text-center">{item.teacherName || '-'}</td>
                                    <td className="px-4 py-2 border text-xs text-center">{item.staffName || '-'}</td>
                                    <td className="px-4 py-2 border text-xs text-center">
                                        {item.checked ? 'ตรวจแล้ว' : 'ยังไม่ตรวจ'}
                                    </td>
                                    <td className="px-4 py-2 border text-xs break-words whitespace-normal max-w-[200px]">
                                        {item.note || '-'}
                                    </td>
                                    <td className="px-4 py-2 border text-xs text-center print:hidden">
                                        <button
                                            className="px-2 py-1 bg-[#000066] text-white rounded-3xl z-50 hover:scale-105 hover:bg-white hover:text-black shadow-lg transition-transform duration-300"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            แก้ไข
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-4 py-2 border text-center text-xs text-gray-500">
                                    ไม่พบข้อมูล
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl shadow-lg w-[90%] max-w-[600px]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">แก้ไขข้อมูล</h2>
                            <button
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded-3xl hover:bg-gray-600 hover:scale-105 transition-all duration-300 ease-in-out"
                                onClick={async () => {
                                    if (window.confirm('คุณต้องการลบข้อมูลนี้หรือไม่?')) {
                                        try {
                                            await axios.delete(`http://localhost:8000/staffproject/delete/${editData.sp_ID}`);
                                            alert('ลบข้อมูลสำเร็จ');
                                            setIsEditModalOpen(false);
                                            window.location.reload();
                                        } catch (error) {
                                            console.error('Error deleting data:', error);
                                            alert('เกิดข้อผิดพลาดในการลบข้อมูล');
                                        }
                                    }
                                }}
                            >
                                ลบข้อมูล
                            </button>
                        </div>
                        <form>
                            <div className="flex flex-wrap gap-4">
                                {/* ชื่อโปรเจค (ไทย) */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อโปรเจค (ไทย)</label>
                                    <input
                                        type="text"
                                        name="thesisNameTH"
                                        value={editData?.thesisNameTH || ''}
                                        onChange={(e) => setEditData({ ...editData, thesisNameTH: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* ชื่อโปรเจค (อังกฤษ) */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อโปรเจค (อังกฤษ)</label>
                                    <input
                                        type="text"
                                        name="thesisNameEN"
                                        value={editData?.thesisNameEN || ''}
                                        onChange={(e) => setEditData({ ...editData, thesisNameEN: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* ชื่อนักศึกษา 1 */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อนักศึกษา 1</label>
                                    <input
                                        type="text"
                                        name="studentName1"
                                        value={editData?.studentName1 || ''}
                                        onChange={(e) => setEditData({ ...editData, studentName1: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* ชื่อนักศึกษา 2 */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อนักศึกษา 2</label>
                                    <input
                                        type="text"
                                        name="studentName2"
                                        value={editData?.studentName2 || ''}
                                        onChange={(e) => setEditData({ ...editData, studentName2: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* รหัสนักศึกษา 1 */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">รหัสนักศึกษา 1</label>
                                    <input
                                        type="text"
                                        name="studentID_1"
                                        value={editData?.studentID_1 || ''}
                                        onChange={(e) => setEditData({ ...editData, studentID_1: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* รหัสนักศึกษา 2 */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">รหัสนักศึกษา 2</label>
                                    <input
                                        type="text"
                                        name="studentID_2"
                                        value={editData?.studentID_2 || ''}
                                        onChange={(e) => setEditData({ ...editData, studentID_2: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* ปีการศึกษา */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ปีการศึกษา</label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={editData?.year || ''}
                                        onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="เช่น 2/2567"
                                    />
                                </div>

                                {/* อาจารย์ */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">อาจารย์</label>
                                    <input
                                        type="text"
                                        name="teacherName"
                                        value={editData?.teacherName || ''}
                                        onChange={(e) => setEditData({ ...editData, teacherName: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* เจ้าหน้าที่ */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">เจ้าหน้าที่</label>
                                    <input
                                        type="text"
                                        name="staffName"
                                        value={editData?.staffName || ''}
                                        onChange={(e) => setEditData({ ...editData, staffName: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* หมายเหตุ */}
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ</label>
                                    <textarea
                                        name="note"
                                        value={editData?.note || ''}
                                        onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>
                                {/* สถานะการตรวจสอบ */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">สถานะการตรวจสอบ</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="checked"
                                                value="1"
                                                checked={editData?.checked === 1}
                                                onChange={() => setEditData({ ...editData, checked: 1 })}
                                            />
                                            ตรวจแล้ว
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="checked"
                                                value="0"
                                                checked={editData?.checked === 0}
                                                onChange={() => setEditData({ ...editData, checked: 0 })}
                                            />
                                            ยังไม่ตรวจ
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded-3xl hover:bg-gray-400 hover:scale-105 transition-all duration-300 ease-in-out"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-[#000066] text-white rounded-3xl hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out"
                                    onClick={handleSaveEdit}
                                >
                                    บันทึก
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StaffProject;