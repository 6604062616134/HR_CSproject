const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

router.get('/all', StudentController.getAllstudent);
router.post('/create', StudentController.createstudentthesisinfo);
router.put('/update/:id', StudentController.updatestudentthesisinfo);
router.delete('/delete/:id', StudentController.deletestudentthesisinfo);

module.exports = router;