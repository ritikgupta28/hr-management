const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const Employee = require('../models/employee');
const authController = require('../controllers/auth');

router.post('/emloyeeSignup', [
	body('email')
		.isEmail()
		.withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body('password',
		'Please enter a password with only numbers and text and at least 6 characters.'
	)
		.trim()
		.isLength({ min: 6 })
		.isAlphanumeric(),
	body('name')
		.trim()
		.not()
		.isEmpty()
],
	authController.employeeSignup
);

router.put('/managerSignup', [
	body('email')
		.isEmail()
		.withMessage('Please enter a valid email.')
		.custom((value, { req }) => {
			return Employee.findOne({ email: value }).then(userDoc => {
				if(userDoc) {
					return Promise.reject('Email address is already exists');
				}
			});
		})
    .normalizeEmail(),
  body('password',
		'Please enter a password with only numbers and text and at least 6 characters.'
	)
		.trim()
		.isLength({ min: 6 })
		.isAlphanumeric()
	],
	authController.managerSignup
);

router.post('/google', authController.googleLogin);

router.post('/login', authController.login);

module.exports = router;