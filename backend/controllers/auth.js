const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const Manager = require('../models/manager');
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: process.env.SENDGRID_KEY
//     }
//   })
// );

exports.employeeSignup = (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
	 	const error = new Error(errors.array()[0].msg);
	 	error.statusCode = 422;
	 	error.data = errors.array()[0].msg;
	 	throw error;
  }
  
  const { email, name, password } = req.body;

	bcrypt.hash(password, 12)
		.then(hashedPw => {
			const employee = new Employee({
				email: email,
				name: name,
				password: hashedPw
			});
			return employee.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Employee created!',
				employeeId: result._id
			});
			// return transporter.sendMail({
			// 	to: email,
			// 	from: 'rgritik001@gmail.com',
			// 	subject: 'Signup Succeeded!',
			// 	html: '<h4>Hey! You have successfully signed up as an user on Platform Up.</h4>'
			// });
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

	let loadedEmployee;
	let flag = false; 
	Employee.findOne({ email: email })
	.then(employee => {
		if(!employee) {
			let loadedManager;
			return Manager.findOne({ email: email })
			.then(manager => {
				if(!manager) {
					const error = new Error('E-mail is not registered!');
					error.statusCode = 401;
					throw error;
				}
				loadedManager = manager;
				
				return bcrypt.compare(password, manager.password);
			})
			.then(isEqual => {
				if(!isEqual) {
					const error = new Error('Wrong password!');
					error.statusCode = 401;
					throw error;
				}
				const token = jwt.sign({
					email: loadedManager.email,
					managerId: loadedManager._id.toString()
				},
				'somesupersecretsecret',
				{ expiresIn: '3h' }
				);
				
				res.status(200).json({
					token: token,
					id: loadedManager._id.toString()
				});
				flag = true;
			})
			.catch(err => {
				if(!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
			// const error = new Error('E-mail is not registered!');
			// error.statusCode = 401;
			// throw error;
		}
		loadedEmployee = employee;
		
		return bcrypt.compare(password, employee.password);
	})
	.then(isEqual => {
		if(flag) {
			const error = new Error('Success!');
			error.statusCode = 200;
			throw error;
		}
		if(!isEqual) {
			const error = new Error('Wrong password!');
			error.statusCode = 401;
			throw error;
		}
		const token = jwt.sign({
			email: loadedEmployee.email,
			employeeId: loadedEmployee._id.toString()
		}, 
		'somesupersecretsecret', 
		{ expiresIn: '3h' }
		);
		
		res.status(200).json({
			token: token, 
			id: loadedEmployee._id.toString() 
		});
	}) 
	.catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.managerSignup = (req, res, next) => {
	// const errors = validationResult(req);
	// if(!errors.isEmpty()) {
	//  	const error = new Error(errors.array()[0].msg);
	//  	error.statusCode = 422;
	//  	error.data = errors.array()[0].msg;
	//  	throw error;
 //  }
  
  const { email, password } = req.body;

	bcrypt.hash(password, 12)
		.then(hashedPw => {
			const manager = new Manager({
				email: email,
				password: hashedPw
			});
			return manager.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Manager created!',
				managerId: result._id
			});
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};