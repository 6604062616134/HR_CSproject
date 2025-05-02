const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token || req.headers['authorization']?.split(' ')[1]; // ตรวจสอบจาก Cookie หรือ Header

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', status: 'error' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden', status: 'error' });
        }
        req.user = user; // เก็บข้อมูลผู้ใช้ที่ถอดรหัสได้ใน req.user
        next();
    });
};

module.exports = { authenticateToken };