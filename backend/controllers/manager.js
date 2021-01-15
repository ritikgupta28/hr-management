const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const Employee = require('../models/employee');
const Team = require('../models/team');
const Notification = require('../models/notification');
const Manager = require('../models/manager');

exports.postHoliday = (req, res, next) => {
	const { dates } = req.body;
	Manager.findById(req.managerId)
		.then(manager => {
			return manager.addHoliday(dates);
		})
		.then(result => {
			res.status(200).json({
				message: 'Success!'
			});
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to post holiday!'
      next(error);
    });
}

exports.getEmployeeList = (req, res, next) => {
	Employee.find()
		.then(employee => {
			res.status(200).json({
				employees: employee
			});
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to fetch employees!'
      next(error);
    });
}

exports.postNewEmployee = (req, res, next) => {
	const { name, email, role, salary } = req.body;
	const employee = new Employee({
		name: name,
		email: email,
		role: role,
		salary: salary
	});

	employee
		.save()
		.then(result => {
			res.status(200).json({
				message: 'Success!'
			})
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to add employee!'
      next(error);
    });
}

exports.getTeamList = (req, res, next) => {
	Team.find().populate('members.employeeId')
		.exec()
		.then(result => {
			res.status(200).json({
				teams: result
			});
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to fetch teams!'
      next(error);
    });
}

exports.postNewTeam = (req, res, next) => {
	const { name, members, description } = req.body;

	const employees = members.map(i => {
		return { employeeId: ObjectId(i.id) };
	});

	members.map(id => {
		Employee.findById(id.id)
			.then(employee => {
				employee.addTeam(name);
			})
			.catch(err => {
      	const error = new Error;
      	error.message = 'Failed to add team name in employee!'
      	next(error);
    	});
	})
	
	const team = new Team({
		name: name,
		members: employees,
		description: description
	});

	team
		.save()
		.then(result => {
			res.status(200).json({
				message: 'Success!'
			})
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to add team!'
      next(error);
    });
}

exports.getNotification = (req, res, next) => {
	Notification.find().sort({ 'updatedAt': -1 }).populate('employeeId')
		.exec()
		.then(result => {
			res.status(200).json({
				notifications: result
			});
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to fetch notifications!'
      next(error);
    });
}

exports.postAcceptReply = (req, res, next) => {
	const { id } = req.body;
	let dates;
	
	Notification.findById(id)
		.then(notification => {
			dates = notification.dates;
			notification.addReply('accept');
			Employee.findById(notification.employeeId)
				.then(employee => {
					return employee.addLeave(dates);
				})
				.then(result => {
					res.status(200).json({
						message: 'Success!'
					});
				})
				.catch(err => {
      		const error = new Error;
      		error.message = 'Failed to add dates of leave in employee!'
      		next(error);
    		});
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to accept leave!'
      next(error);
    });
}

exports.postRejectReply = (req, res, next) => {
	const { id } = req.body;

	Notification.findById(id)
		.then(notification => {
			return notification.addReply('reject');
		})
		.then(result => {
			res.status(200).json({
				message: 'Success!'
			});
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to reject leave!'
      next(error);
    });
}