const db = require('../db');

const StudentController = {
    async getAllstudent(req, res) {
        try {
            const students = await db.query('SELECT * FROM thesis');
            res.json(students[0]); // Assuming the first element of the array contains the results
        } catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = StudentController;