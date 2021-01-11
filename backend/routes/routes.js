const express = require('express');

const managerController = require('../controllers/manager');
const employeeController = require('../controllers/employee');

const router = express.Router();

router.get('/employeeList', managerController.getEmployeeList);

router.post('/newEmployee', managerController.postNewEmployee);

router.get('/teamList', managerController.getTeamList);

router.post('/newTeam', managerController.postNewTeam);

router.get('/employee/:id', employeeController.getEmployee);

router.get('/attendance', employeeController.getAttendance);

router.post('/leave', employeeController.applyLeave);

router.get('/notification', managerController.getNotification);

router.post('/reply', managerController.postReply);

module.exports = router;