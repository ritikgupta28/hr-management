const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		number: {
			type: Number
		},
		city: {
			type: String
		},
		state: {
			type: String
		},
		country: {
			type: String
		}
	}
);

module.exports = mongoose.model('Employee', employeeSchema);