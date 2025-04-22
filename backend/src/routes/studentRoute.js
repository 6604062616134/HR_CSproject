const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

router.get('/all', StudentController.getAllstudent);

module.exports = router;