const express = require('express');
const router = express.Router();
const StaffProjectController = require('../controllers/staffProjectController');

router.get('/getall', StaffProjectController.getAllStaffProjects);
router.get('/getByStaffId', StaffProjectController.getStaffProjectByStaffId);
router.get('/getByStudentId', StaffProjectController.getStaffProjectByStudentId);

router.post('/create', StaffProjectController.createStaffProject);
router.post('/update/:sp_ID', StaffProjectController.updateStaffProject);

router.delete('/delete/:sp_ID', StaffProjectController.deleteStaffProject);

module.exports = router;