import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

function Detail({ type }) {
    const { id } = useParams(); // ดึง id จาก URL
    const [personDetail, setPersonDetail] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const endpoint = type === 'teacher'
                    ? `http://localhost:8000/teacher/${id}` // API สำหรับอาจารย์
                    : `http://localhost:8000/staff/${id}`; // API สำหรับเจ้าหน้าที่
                const response = await axios.get(endpoint);
                setPersonDetail(response.data);
            } catch (error) {
                console.error('Error fetching person detail:', error);
            }
        };

        fetchDetail();
    }, [id, type]);

    if (!personDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">รายละเอียด</h1>
                <p><strong>ชื่อ:</strong> {personDetail.name}</p>
                <p><strong>ตำแหน่ง:</strong> {personDetail.position}</p>
                <p><strong>อีเมล:</strong> {personDetail.email}</p>
                {/* เพิ่มข้อมูลอื่น ๆ ตามที่ต้องการ */}
            </div>
        </div>
    );
}

export default Detail;