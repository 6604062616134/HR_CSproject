const db = require('../db');

const AssignationController = {
    async getAllAssignation(req, res) {
        try {
            const assignations = await db.query('SELECT * FROM assignation');
            res.json(assignations[0]); // Assuming the first element of the array contains the results
        } catch (error) {
            console.error('Error fetching assignations:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createAssignation(req, res) {
        try {
            const {
                a_number,
                createdDate = new Date(), // ใช้วันที่ปัจจุบันเป็นค่าเริ่มต้น
                modifiedDate = new Date(), // ใช้วันที่ปัจจุบันเป็นค่าเริ่มต้น
                detail,
                docName,
                eventDateStart,
                eventDateEnd,
                eventName,
                selectedTeachers = [] // รับ selectedTeachers จาก req.body
            } = req.body;
    
            // ค้นหา t_ID จาก selectedTeachers ในตาราง teacher
            const teacherIdsQuery = `SELECT t_ID FROM teacher WHERE t_ID IN (?)`;
            const [teacherIdsResult] = await db.query(teacherIdsQuery, [selectedTeachers.map((teacher) => teacher.t_ID)]);
            const teacherIds = teacherIdsResult.map((row) => row.t_ID); // ดึงเฉพาะ t_ID ออกมาเป็นอาร์เรย์
    
            // Insert into assignation table พร้อมเก็บ t_ID ในรูปแบบ JSON
            const insertAssignationQuery = `INSERT INTO assignation (a_number, createdDate, modifiedDate, detail, docName, eventDateStart, eventDateEnd, eventName, t_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const assignationValues = [
                a_number,
                createdDate,
                modifiedDate,
                detail,
                docName,
                eventDateStart,
                eventDateEnd,
                eventName,
                JSON.stringify(teacherIds) // แปลง t_ID เป็น JSON ก่อนเก็บในฐานข้อมูล
            ];
            await db.query(insertAssignationQuery, assignationValues);
    
            res.status(201).json({ message: 'Assignation created successfully' });
        } catch (error) {
            console.error('Error creating assignation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = AssignationController;