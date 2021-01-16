const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const routes = require('./routes/routes');
const Employee = require('./models/employee');
const Manager = require('./models/manager');
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const MONGODB_URL = "mongodb+srv://ritikgupta:ZU5DvtmxnizGbPsu@cluster0-mzunh.mongodb.net/hr_manager?retryWrites=true&w=majority";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
});

app.get('/callback', function (req, res) {
	const email = profile.emails[0].value;
	console.log('11', email);
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
			// const error = new Error('E-mail is not registered!');
			// error.statusCode = 401;
			// throw error;
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
})

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect('/callback');
	});

passport.use(new GoogleStrategy({
		clientID: "915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com",
		clientSecret: "3fgB-M1mCW_Q1UVK22blcgMM",
		callbackURL: "http://localhost:8000/auth/google/callback"
},	
	function (accessToken, refreshToken, profile, cb) {
		return cb(null, profile);
	}
));

app.use('/', routes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({
		message: message,
		data: data
	});
})

const port = process.env.PORT || '8000';

mongoose
	.connect(MONGODB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
	.then(result => {
		const server = app.listen(port);
		// const io = require('./socket').init(server);
		// io.on('connection', socket => {
		// 	console.log('Client connected');
		// })
	})
	.catch(err => console.log(err));