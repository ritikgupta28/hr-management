const express = require('express');

const managerController = require('../controllers/manager');
const employeeController = require('../controllers/employee');

const router = express.Router();

router.get('/employeeList', managerController.getEmployeeList);

router.post('/newEmployee', managerController.postNewEmployee);

module.exports = router;