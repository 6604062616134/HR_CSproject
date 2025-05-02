const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        try {
            // ค้นหาผู้ใช้ในฐานข้อมูล
            const [user] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);

            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // ตรวจสอบรหัสผ่าน
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // สร้าง JWT Token
            const token = jwt.sign({ admin_ID: user.admin_ID, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            // ส่ง Token กลับไปใน Cookie
            res.cookie('auth_token', token, { httpOnly: true });
            return res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async logout(req, res) {
        try {
            // ลบ Cookie ที่เก็บ Token
            res.clearCookie('auth_token');
            return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error during logout:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createUser(req, res) {
        try {
            console.log(req.body); // ตรวจสอบว่า req.body มีข้อมูลที่ถูกต้อง
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const created = new Date();
            const modified = new Date();

            const sql_params = [username, hashedPassword, created, modified];

            await db.query(`INSERT INTO admin (username, password, createdDate, modifiedDate) VALUES (?, ?, ?, ?)`, sql_params);

            res.status(201).json({ message: 'User created', status: 'success' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error', status: 'error' });
        }
    }
};

module.exports = UserController;