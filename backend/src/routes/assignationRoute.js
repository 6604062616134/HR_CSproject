const express = require('express');
const router = express.Router();
const AssignationController = require('../controllers/assignationController');

router.get('/:id', AssignationController.getAssignationById);
router.get('/getAll', AssignationController.getAllAssignation);
router.get('/getByIds', AssignationController.getAssignationByIds);

router.post('/create', AssignationController.createAssignation);

router.delete('/delete/:id', AssignationController.deleteAssignation);

router.put('/update/:id', AssignationController.updateAssignation);

module.exports = router;