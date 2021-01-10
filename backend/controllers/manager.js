const mongoose = require('mongoose');

const Employee = require('../models/employee');

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
	Team.find()
		.then(team => {
			team.populate('members.employeeId')
			.execPopulate()
			.then(result => {
				res.status(200).json({
					teams: result
				});
			})
			.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
}

exports.postNewTeam = (req, res, next) => {
	const { name, employees, description } = req.body;
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