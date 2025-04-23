const express = require('express');
const router = express.Router();
const AssignationController = require('../controllers/assignationController');

router.get('/:id', AssignationController.getAssignationById);
router.get('/getAll', AssignationController.getAllAssignation); // Get all assignations
router.get('/getByIds', AssignationController.getAssignationByIds);

router.post('/create', AssignationController.createAssignation); // Create a new assignation

module.exports = router;