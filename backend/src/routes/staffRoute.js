const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staffController');

router.get('/', StaffController.getAllStaff);
router.get('/:id', StaffController.getStaffById);

module.exports = router;