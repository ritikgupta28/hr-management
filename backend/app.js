const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const routes = require('./routes/routes');

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

app.use('/', routes);
app.use('/auth', authRoutes);

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