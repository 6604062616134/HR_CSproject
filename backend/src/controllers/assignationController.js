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
                number,
                createdDate = new Date(),
                modifiedDate = new Date(),
                detail,
                docName,
                eventDateStart,
                eventDateEnd,
                eventName,
                selectedTeachers = [],
                selectedStaff = [],
            } = req.body;

            let teacherIds = [];
            let staffIds = [];

            // ตรวจสอบ selectedTeachers
            if (selectedTeachers.length > 0) {
                const teacherIdsQuery = `SELECT t_ID FROM teacher WHERE t_ID IN (?)`;
                const [teacherIdsResult] = await db.query(teacherIdsQuery, [selectedTeachers.map((teacher) => teacher.t_ID)]);
                teacherIds = teacherIdsResult.map((row) => row.t_ID); // ดึงเฉพาะ t_ID ออกมาเป็นอาร์เรย์
            }

            // ตรวจสอบ selectedStaff
            if (selectedStaff.length > 0) {
                const staffIdQuery = `SELECT s_ID FROM staff WHERE s_ID IN (?)`;
                const [staffIdsResult] = await db.query(staffIdQuery, [selectedStaff.map((staff) => staff.s_ID)]);
                staffIds = staffIdsResult.map((row) => row.s_ID); // ดึงเฉพาะ s_ID ออกมาเป็นอาร์เรย์
            }

            // Insert into assignation table พร้อมเก็บ t_ID และ s_ID ในรูปแบบ JSON
            const insertAssignationQuery = `INSERT INTO assignation (a_number, createdDate, modifiedDate, detail, docName, eventDateStart, eventDateEnd, eventName, t_ID, s_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const assignationValues = [
                number,
                createdDate,
                modifiedDate,
                detail,
                docName,
                eventDateStart,
                eventDateEnd,
                eventName,
                JSON.stringify(teacherIds), // แปลง t_ID เป็น JSON ก่อนเก็บในฐานข้อมูล
                JSON.stringify(staffIds),  // แปลง s_ID เป็น JSON ก่อนเก็บในฐานข้อมูล
            ];
            await db.query(insertAssignationQuery, assignationValues);

            res.status(201).json({ message: 'Assignation created successfully' });
        } catch (error) {
            console.error('Error creating assignation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getAssignationById(req, res) {
        const { id } = req.params; // รับ id จาก URL
        const { type } = req.query; // รับ type (teacher หรือ staff) จาก query parameter

        try {
            let query = '';
            const params = [];

            if (type === 'teacher') {
                query = 'SELECT * FROM assignation WHERE JSON_CONTAINS(t_ID, ?, "$")'; // ค้นหาใน JSON Array ของ t_ID
                params.push(JSON.stringify(Number(id))); // แปลง id เป็น JSON String
            } else if (type === 'staff') {
                query = 'SELECT * FROM assignation WHERE JSON_CONTAINS(s_ID, ?, "$")'; // ค้นหาใน JSON Array ของ s_ID
                params.push(JSON.stringify(Number(id))); // แปลง id เป็น JSON String
            } else {
                return res.status(400).json({ error: 'Invalid type. Must be "teacher" or "staff".' });
            }

            console.log('Executing Query:', query, params); // ตรวจสอบ Query และพารามิเตอร์
            const [assignations] = await db.query(query, params);

            if (assignations.length === 0) {
                return res.status(404).json({ error: 'No assignations found for the given ID and type.' });
            }

            res.status(200).json(assignations);
        } catch (error) {
            console.error('Error fetching assignation by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getAssignationByIds(req, res) {
        try {
            const { t_ID, s_ID } = req.query;
            let query = 'SELECT * FROM assignation WHERE 1=1';
            const params = [];

            if (t_ID) {
                query += ' AND t_ID = ?';
                params.push(t_ID);
            }

            if (s_ID) {
                query += ' AND s_ID = ?';
                params.push(s_ID);
            }

            const [assignations] = await db.query(query, params);
            res.status(200).json(assignations);
        } catch (error) {
            console.error('Error fetching assignations by IDs:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = AssignationController;