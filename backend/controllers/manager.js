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
	const { name, email } = req.body;
	const employee = new Employee({
		name: name,
		email: email
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