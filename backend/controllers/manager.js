const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const Employee = require('../models/employee');
const Team = require('../models/team');
const Notification = require('../models/notification');

exports.getEmployeeList = (req, res, next) => {
	Employee.find()
		.then(employee => {
			res.status(200).json({
				employees: employee
			});
		})
		.catch(err => console.log(err));
}

exports.postNewEmployee = (req, res, next) => {
	const { name, email, teamAssign } = req.body;
	const employee = new Employee({
		name: name,
		email: email,
		teamAssign: teamAssign
	});

	employee
		.save()
		.then(result => {
			res.status(200).json({
				message: 'Success!'
			})
		})
		.catch(err => console.log(err));
}

exports.getTeamList = (req, res, next) => {
	Team.find().populate('members.employeeId')
		.exec()
		.then(result => {
			res.status(200).json({
				teams: result
			});
		})
		.catch(err => console.log(err));
}

exports.postNewTeam = (req, res, next) => {
	const { name, members, description } = req.body;
	const employees = members.map(i => {
		return { employeeId: ObjectId(i) };
	});
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
		.catch(err => console.log(err));
}

exports.getNotification = (req, res, next) => {
	Notification.find().sort({ 'updatedAt': -1 }).populate('employeeId')
		.exec()
		.then(result => {
			res.status(200).json({
				notifications: result
			});
		})
		.catch(err => console.log(err));
}

exports.postAcceptReply = (req, res, next) => {
	const { date, id } = req.body;

	Notification.findById(id)
		.then(notification => {
			notification.addReply('accept');
			Employee.findById(notification.employeeId)
				.then(employee => {
					return employee.addLeave(date);
				})
				.then(result => {
					res.status(200).json({
						message: 'Success!'
					});
				})
				.catch(err => console.log(err)); 
		})
		.catch(err => console.log(err));	
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
		.catch(err => console.log(err));	 
}