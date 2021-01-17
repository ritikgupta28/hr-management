const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const Manager = require('../models/manager');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com");

exports.employeeSignup = (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
	 	const error = new Error(errors.array()[0].msg);
	 	error.statusCode = 500;
	 	error.data = errors.array()[0].msg;
	 	throw error;
  }
  
  const { email, name, password } = req.body;

	Employee.findOne({ email: email })
		.then(employee => {
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
				bcrypt.hash(password, 12)
					.then(hashedPw => {
						return employee.addEmployee(name, email, hashedPw );
					})
			}
		})
		.then(result => {
			res.status(201).json({
				message: 'Employee created!'
			});
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.googleEmployeeSignup = (req, res, next) => {
	const { tokenId, password } = req.body;

	client.verifyIdToken({
		idToken: tokenId,
		audience: "915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com"
	})
		.then(response => {
			const { email_verified, name, email } = response.payload;
			if(email_verified) {
				Employee.findOne({ email: email })
					.then(employee => {
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
							bcrypt.hash(password, 12)
								.then(hashedPw => {
									return employee.addGoogleEmployee(name, email, hashedPw);
								})
						}
					})
					.then(result => {
						res.status(201).json({
							message: 'Employee created!'
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
				const error = new Error('Google email not verified!');
				error.statusCode = 500;
				throw error;
			}
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		})
}

exports.managerSignup = (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
	 	const error = new Error(errors.array()[0].msg);
	 	error.statusCode = 422;
	 	error.data = errors.array()[0].msg;
	 	throw error;
  }
  
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

exports.login = (req, res, next) => {
  const { email, password } = req.body;

	let loadedEmployee, managerToken, managerMnagaerId, managerEmployeeId;
	let flag = false;
	Employee.findOne({ email: email })
	.then(employee => {
		if(!employee) {
			let loadedManager;
			return Manager.findOne({ email: email })
			.then(manager => {
				if(!manager) {
					const error = new Error('E-mail is not registered!');
					error.statusCode = 500;
					throw error;
				}
				loadedManager = manager;
				
				return bcrypt.compare(password, manager.password);
			})
			.then(isEqual => {
				if(!isEqual) {
					const error = new Error('Wrong password!');
					error.statusCode = 500;
					throw error;
				}
				const token = jwt.sign({
					email: loadedManager.email,
					managerId: loadedManager._id.toString()
				},
				'somesupersecretsecret',
				{ expiresIn: '3h' }
				);
				
				managerToken = token;
				managerMnagaerId = loadedManager._id.toString();
				managerEmployeeId = "null";
				flag = true;
				return flag;
			})
				.catch(err => {
					if(!err.statusCode) {
						err.statusCode = 500;
					}
				next(err);
			});
		}
		loadedEmployee = employee;
		
		return bcrypt.compare(password, employee.password);
	})
	.then(isEqual => {
		if(flag) {
			res.status(200).json({
				token: managerToken,
				managerId: managerMnagaerId,
				employeeId: managerEmployeeId
			});
		}
		else {
			if(!isEqual) {
				const error = new Error('Wrong password!');
				error.statusCode = 500;
				throw error;
			}
			const token = jwt.sign({
				email: loadedEmployee.email,
				employeeId: loadedEmployee._id.toString(),
			},
			'somesupersecretsecret', 
			{ expiresIn: '3h' }
			);
			
			res.status(200).json({
				token: token,
				employeeId: loadedEmployee._id.toString(),
				managerId: "null"
			});
		}
	})
	.catch(err => {
      next(err);
    });
};

exports.googleLogin = (req, res, next) => {
	const { tokenId } = req.body;

	client.verifyIdToken({
		idToken: tokenId,
		audience: "915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com"
	})
		.then(response => {
			const { email_verified, email } = response.payload;
			if(email_verified) {
				let loadedEmployee, managerToken, managerMnagaerId, managerEmployeeId;
				let flag = false;
				Employee.findOne({ email: email })
					.then(employee => {
						if(!employee) {
							let loadedManager;
							return Manager.findOne({ email: email })
							.then(manager => {
								if(!manager) {
									const error = new Error('E-mail is not registered!');
									error.statusCode = 500;
									throw error;
								}
								loadedManager = manager;
								
								const token = jwt.sign({
									email: loadedManager.email,
									managerId: loadedManager._id.toString()
								},
								'somesupersecretsecret',
								{ expiresIn: '3h' }
								);
								
								managerToken = token;
								managerMnagaerId = loadedManager._id.toString();
								managerEmployeeId = "null";
								flag = true;
								return flag;
							})
							.catch(err => {
								if(!err.statusCode) {
									err.statusCode = 500;
								}
								next(err);
							});
						}
						else if(!employee.register) {
							const error = new Error('E-mail is not verified!');
							error.statusCode = 500;
							throw error;
						}
						loadedEmployee = employee;
						
						return employee;
					})
					.then(isEqual => {
						if(flag) {
							res.status(200).json({
								token: managerToken,
								managerId: managerMnagaerId,
								employeeId: managerEmployeeId
							})
						}
						else {
							const token = jwt.sign({
								email: loadedEmployee.email,
								employeeId: loadedEmployee._id.toString(),
							},
							'somesupersecretsecret',
							{ expiresIn: '3h' }
							);
							
							res.status(200).json({
								token: token,
								employeeId: loadedEmployee._id.toString(),
								managerId: "null"
							});
						}
					})
					.catch(err => {
						next(err);
					});
			}
			else {
				const error = new Error('Google email not verified!');
				error.statusCode = 500;
				throw error;
			}
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		})
}