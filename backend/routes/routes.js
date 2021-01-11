const express = require('express');

const managerController = require('../controllers/manager');
const employeeController = require('../controllers/employee');

const router = express.Router();

router.get('/employeeList', managerController.getEmployeeList);

router.post('/newEmployee', managerController.postNewEmployee);

router.get('/teamList', managerController.getTeamList);

router.post('/newTeam', managerController.postNewTeam);

router.get('/attendance', managerController.getAttendance);

module.exports = router;