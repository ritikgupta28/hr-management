const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const Employee = require('../models/employee');
const Team = require('../models/team');
const Notification = require('../models/notification');
const Manager = require('../models/manager');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "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"
    }
  })
);

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
	Employee.find({ register: true })
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
	
	Employee.findOne({ email: email })
		.then(employee => {
			if(!employee) {
				const employee = new Employee({
					name: name,
					email: email,
					role: role,
					salary: salary
				});

				employee
					.save()
					// .then(result => {
					// 	return transporter.sendMail({
					// 		to: email,
					// 		from: 'rgritik001@gmail.com',
					// 		subject: 'Signup Succeeded!',
					// 		html: '<h4>Hey! You have successfully registered as an employee.</h4>'
					// 	});
					// })
					.then(resData => {
						res.status(200).json({
							message: 'Employee Added!'
						});
					})
					.catch(err => {
    			  if(!err.statusCode) {
							err.statusCode = 500;
						}
						next(err);
			    });
			}
			else {
				const error = new Error('Employee is already registered!');
				error.statusCode = 500;
				throw error;
			}
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
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

exports.postAcceptReply = async (req, res, next) => {
	const { id } = req.body;
	let dates, holidays;
	
	try {
		const manager = await Manager.find()
		holidays = manager[0].holiday;
		let notification = await Notification.findById(id)
		dates = notification.dates;
		notification = await	notification.addReply('accept');
		const employee = await Employee.findById(notification.employeeId)
		await employee.addLeave(dates, holidays);
		
		res.status(200).json({
			message: 'Success!'
		});
	} catch(err) {
      const error = new Error;
      error.message = 'Failed to accept leave!'
      next(err);
  }
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