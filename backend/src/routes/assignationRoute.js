const express = require('express');
const router = express.Router();
const AssignationController = require('../controllers/assignationController');

router.post('/create', AssignationController.createAssignation); // Create a new assignation

module.exports = router;