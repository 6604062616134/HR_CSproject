const express = require('express');
const router = express.Router();
const AssignationController = require('../controllers/assignationController');

router.post('/create', AssignationController.createAssignation); // Create a new assignation
router.get('/getAll', AssignationController.getAllAssignation); // Get all assignations

module.exports = router;