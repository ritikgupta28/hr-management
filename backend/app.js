const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const MONGODB_URI = "";

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

app.get('/', (req, res) => {
  res.send('Server is working!!')
})

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
	.connect(MONGODB_URI)
	.then(result => {
		server.listen(port);
	})
	.catch(err => console.log(err));