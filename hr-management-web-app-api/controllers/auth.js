const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const Manager = require('../models/manager');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.employeeSignup = async (req, res, next) => {
	const { email, name, password } = req.body;

	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
	 		const error = new Error(errors.array()[0].msg);
	 		error.statusCode = 500;
	 		error.data = errors.array()[0].msg;
	 		throw error;
  	}

		let employee = await Employee.findOne({ email: email })
		if(!employee) {
			const error = new Error('Email is not verified!');
			error.statusCode = 500;
			throw error;
		}
		else {
			if(employee.register) {
				const error = new Error('Email is already registered!');
				error.statusCode = 500;
				throw error;
			}
			const hashedPw = await	bcrypt.hash(password, 12)
			employee = await employee.addEmployee(name, email, hashedPw);

			res.status(201).json({
				message: 'Employee created!'
			});
		}
	} catch(err) {
			if(err.statusCode !== 500) {
				const error = new Error('Signup is not successful!');
				error.statusCode = 500;
				next(error);
			}
			else {
				next(err);
			}
	}
}

exports.googleEmployeeSignup = async (req, res, next) => {
	const { tokenId, password } = req.body;

	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
		 	const error = new Error(errors.array()[0].msg);
	 		error.statusCode = 500;
		 	error.data = errors.array()[0].msg;
		 	throw error;
	  }

		const response = await client.verifyIdToken({
			idToken: tokenId,
			audience: process.env.GOOGLE_CLIENT_ID
		})
		const { email_verified, name, email } = response.payload;
		if(email_verified) {
			let employee = await Employee.findOne({ email: email })
			if(!employee) {
				const error = new Error('Email is not verified!');
				error.statusCode = 500;
				throw error;
			}
			else {
				if(employee.register) {
					const error = new Error('Email is already registered!');
					error.statusCode = 500;
					throw error;
				}
				const hashedPw = await bcrypt.hash(password, 12)
				employee = await employee.addEmployee(name, email, hashedPw);

				res.status(201).json({
					message: 'Employee created!'
				});
			}
		}
		else {
			const error = new Error('Google email not verified!');
			error.statusCode = 500;
			throw error;
		}
	} catch(err) {
			if(err.statusCode !== 500) {
				const error = new Error('Signup is not successful!');
				error.statusCode = 500;
				next(error);
			}
			else {
				next(err);
			}
	}
}

exports.managerSignup = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
		 	const error = new Error(errors.array()[0].msg);
	 		error.statusCode = 422;
		 	error.data = errors.array()[0].msg;
		 	throw error;
	  }

		const hashedPw = await bcrypt.hash(password, 12)
		let manager = new Manager({
			email: email,
			password: hashedPw
		});
		manager = await manager.save();

		res.status(201).json({
			message: 'Manager created!',
			managerId: result._id
		});
	} catch(err) {
			if(err.statusCode !== 500) {
				const error = new Error('Signup is not successful!');
				error.statusCode = 500;
				next(error);
			}
			else {
				next(err);
			}
	}
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

	try {
		let employee = await Employee.findOne({ email: email })
		if(!employee) {
			let manager = await Manager.findOne({ email: email })
			if(!manager) {
				const error = new Error('E-mail is not registered!');
				error.statusCode = 500;
				throw error;
			}
			
			const isEqual = await bcrypt.compare(password, manager.password);
			if(!isEqual) {
				const error = new Error('Wrong password!');
				error.statusCode = 500;
				throw error;
			}
			
			const token = jwt.sign({
				email: manager.email,
				managerId: manager._id.toString()
			},
			'somesupersecretsecret',
			{ expiresIn: '3h' }
			);
			
			res.status(200).json({
				token: token,
				managerId: manager._id.toString(),
				employeeId: "null"
			});
		}
		else {
			const isEqual = await bcrypt.compare(password, employee.password);
			if(!isEqual) {
				const error = new Error('Wrong password!');
				error.statusCode = 500;
				throw error;
			}
			const token = jwt.sign({
				email: employee.email,
				employeeId: employee._id.toString(),
			},
			'somesupersecretsecret', 
			{ expiresIn: '3h' }
			);

			res.status(200).json({
				token: token,
				employeeId: employee._id.toString(),
				managerId: "null"
			});
		}
	} catch(err) {
			if(err.statusCode !== 500) {
				const error = new Error('Login is not successful!');
				error.statusCode = 500;
				next(error);
			}
			else {
				next(err);
			}
  }
}

exports.googleLogin = async (req, res, next) => {
	const { tokenId } = req.body;

	try {
		const response = await client.verifyIdToken({
			idToken: tokenId,
			audience: "915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com"
		})
		const { email_verified, email } = response.payload;
		if(email_verified) {
			let employee = await Employee.findOne({ email: email })
			if(!employee) {
				let manager = await Manager.findOne({ email: email })
				if(!manager) {
					const error = new Error('E-mail is not registered!');
					error.statusCode = 500;
					throw error;
				}
				
				const token = jwt.sign({
					email: manager.email,
					managerId: manager._id.toString()
				},
				'somesupersecretsecret',
				{ expiresIn: '3h' }
				);
				
				res.status(200).json({
					token: token,
					managerId: manager._id.toString(),
					employeeId: "null"
				});
			}
			else {
				const token = jwt.sign({
					email: employee.email,
					employeeId: employee._id.toString(),
				},
				'somesupersecretsecret', 
				{ expiresIn: '3h' }
				);

				res.status(200).json({
					token: token,
					employeeId: employee._id.toString(),
					managerId: "null"
				});
			}
		}
		else {
			const error = new Error('Google email not verified!');
			error.statusCode = 500;
			throw error;
		}
	} catch(err) {
			if(err.statusCode !== 500) {
				const error = new Error('Login is not successful!');
				error.statusCode = 500;
				next(error);
			}
			else {
				next(err);
			}
	}
}