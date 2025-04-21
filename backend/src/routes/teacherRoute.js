const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');

router.get('/', TeacherController.getAllTeachers);
router.get('/:id', TeacherController.getTeacherById);

module.exports = router;