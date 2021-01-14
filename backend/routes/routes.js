const express = require('express');

const managerController = require('../controllers/manager');
const employeeController = require('../controllers/employee');
const isManager = require('../middleware/isManagerAuth');
const isEmployee = require('../middleware/isEmployeeAuth');

const router = express.Router();

router.get('/employeeList', isManager, managerController.getEmployeeList);

router.post('/newEmployee', isManager, managerController.postNewEmployee);

router.get('/teamList', isManager, managerController.getTeamList);

router.post('/newTeam', isManager, managerController.postNewTeam);

router.get('/employee/:id', isManager, isEmployee, employeeController.getEmployee);

router.get('/attendance/:id', isManager, isEmployee, employeeController.getAttendance);

router.post('/leave', isEmployee, employeeController.postApplyLeave);

router.get('/notification', isManager, managerController.getNotification);

router.post('/acceptReply', isManager, managerController.postAcceptReply);

router.post('/rejectReply', isManager, managerController.postRejectReply);

router.post('/salary', isManager, isEmployee, employeeController.postSalary);

router.post('/holiday', isManager, managerController.postHoliday);

module.exports = router;