const express = require('express');

const managerController = require('../controllers/manager');
const employeeController = require('../controllers/employee');

const router = express.Router();

router.get('/employeeList', managerController.getEmployeeList);

router.post('/newEmployee', managerController.postNewEmployee);

router.get('/teamList', managerController.getTeamList);

router.post('/newTeam', managerController.postNewTeam);

router.get('/employee/:id', employeeController.getEmployee);

router.get('/attendance/:id', employeeController.getAttendance);

router.post('/leave', employeeController.postApplyLeave);

router.get('/notification', managerController.getNotification);

router.post('/acceptReply', managerController.postAcceptReply);

router.post('/rejectReply', managerController.postRejectReply);

router.post('/salary', employeeController.postSalary);

module.exports = router;