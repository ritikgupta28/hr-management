const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const Employee = require('../models/employee');
const Team = require('../models/team');
const Notification = require('../models/notification');
const Manager = require('../models/manager');

exports.postHoliday = async (req, res, next) => {
	const { dates } = req.body;

	try {
		if(dates.length === 0) {
			const error = new Error('Please enter valid dates!');
			error.statusCode = 500;
      throw error;
		}
		let manager = await Manager.findById(req.managerId)
		manager = await manager.addHoliday(dates);
		
		res.status(200).json({
			message: 'Success!'
		});
	} catch(err) {
			if(err.statusCode !== 500) {
        const error = new Error('Failed to post holiday!');
        error.statusCode = 500;
        next(error);
      }
      else {
        next(err);
      }
  }
}

exports.getHoliday = async (req, res, next) => {
	let holidays;

  try {
    const manager = await Manager.find()
    holidays = manager[0].holiday;
    
    res.status(200).json({
      holidays: holidays
    });
  } catch(err) {
      const error = new Error('Failed to fetch attendance!');
      error.statusCode = 500;
      next(error);
  }
}

exports.getEmployeeList = async (req, res, next) => {
	try {
		const employee = await Employee.find({ register: true })
		
		res.status(200).json({
			employees: employee
		});
	} catch(err) {
      const error = new Error('Failed to fetch employees!');
      error.statusCode = 500;
      next(error);
  }
}

exports.postNewEmployee = async (req, res, next) => {
	const { name, email, role, salary } = req.body;
	
	try {
		if(name.length === 0 || email.length === 0 || role.length === 0 || salary.length === 0) {
			const error = new Error('Please enter valid credentials!');
			error.statusCode = 500;
      throw error;
		}
		let employee = await Employee.findOne({ email: email })
		if(!employee) {
			employee = new Employee({
				name: name,
				email: email,
				role: role,
				salary: salary
			});

			employee = await employee.save()

			res.status(200).json({
				message: 'Employee Added!'
			});
		}
		else {
			const error = new Error('Employee is already added!');
			error.statusCode = 500;
			throw error;
		}
	} catch(err) {
			if(err.statusCode !== 500) {
        const error = new Error('Added employee is failed!');
        error.statusCode = 500;
        next(error);
      }
      else {
        next(err);
      }
	}
}

exports.getTeamList = async (req, res, next) => {
	try {
		const team = await Team.find().populate('members.employeeId')

		res.status(200).json({
			teams: team
		});
	} catch(err) {
      const error = new Error('Failed to fetch teams!');
      error.statusCode = 500;
      next(error);
  }
}

exports.postNewTeam = async (req, res, next) => {
	const { name, members, description } = req.body;

	try {
		if(name.length === 0 || members.length === 0 || description.length === 0) {
			const error = new Error('Please enter valid credentials!');
			error.statusCode = 500;
      throw error;
		}
		const employees = members.map(i => {
			return { employeeId: ObjectId(i.id) };
		});

		members.map(id => {
			Employee.findById(id.id)
				.then(employee => {
					employee.addTeam(name);
				})
				.catch(err => {
					const error = new Error('Failed to add team!');
					error.statusCode = 500;
      		next(error);
				});
		})

		let team = new Team({
			name: name,
			members: employees,
			description: description
		});

		team = await team.save();

		res.status(200).json({
			message: 'Success!'
		});
	} catch(err) {
			if(err.statusCode !== 500) {
        const error = new Error('Failed to add team!');
        error.statusCode = 500;
        next(error);
      }
      else {
        next(err);
      }
  }
}

exports.getNotification = async (req, res, next) => {
	try {
		const notification = await Notification.find().sort({ 'createdAt': -1 }).populate('employeeId').exec()
		
		res.status(200).json({
			notifications: notification
		});
	} catch(err) {
      const error = new Error('Failed to fetch notifications!');
      error.statusCode = 500;
      next(error);
  }
}

exports.postAcceptReply = async (req, res, next) => {
	const { id } = req.body;
	let dates, holidays;
	
	try {
		const manager = await Manager.find()
		holidays = manager[0].holiday;
		let notification = await Notification.findById(id)
		dates = notification.dates;
		notification = await	notification.addReply('accept');
		let employee = await Employee.findById(notification.employeeId)
		employee = await employee.addLeave(dates, holidays);
		
		res.status(200).json({
			message: 'Success!'
		});
	} catch(err) {
      const error = new Error('Failed to accept leave!');
      error.statusCode = 500;
      next(error);
  }
}

exports.postRejectReply = async (req, res, next) => {
	const { id } = req.body;

	try {
		let notification = await Notification.findById(id)
		notification = await notification.addReply('reject');
		
		res.status(200).json({
			message: 'Success!'
		});
	} catch(err) {
      const error = new Error('Failed to reject leave!');
      error.statusCode = 500;
      next(error);
  }
}