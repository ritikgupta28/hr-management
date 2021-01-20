const express = require('express');

const managerController = require('../controllers/manager');
const employeeController = require('../controllers/employee');
const managerEmployeeController = require('../controllers/managerEmployee');
const isManager = require('../middleware/isManagerAuth');
const isManagerEmployee = require('../middleware/isManagerEmployeeAuth');
const isEmployee = require('../middleware/isEmployeeAuth');

const router = express.Router();

router.get('/employeeList', isManager, managerController.getEmployeeList);

router.post('/newEmployee', isManager, managerController.postNewEmployee);

router.get('/teamList', isManager, managerController.getTeamList);

router.post('/newTeam', isManager, managerController.postNewTeam);

router.get('/notification', isManager, managerController.getNotification);

router.post('/acceptReply', isManager, managerController.postAcceptReply);

router.post('/rejectReply', isManager, managerController.postRejectReply);

router.get('/holiday', isManager, managerController.getHoliday);

router.post('/holiday', isManager, managerController.postHoliday);

router.get('/employee/:id', isManagerEmployee, managerEmployeeController.getEmployee);

router.get('/attendance/:id', isManagerEmployee, managerEmployeeController.getAttendance);

router.get('/notification/:id', isEmployee, employeeController.getNotification);

router.post('/salary', isManagerEmployee, managerEmployeeController.postSalary);

router.post('/editEmployee', isEmployee, employeeController.postEditEmployee);

router.post('/leave', isEmployee, employeeController.postApplyLeave);

module.exports = router;