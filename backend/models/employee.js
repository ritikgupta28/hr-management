const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
		team: {
			type: String
		},
		teamAssign: {
			type: Boolean,
			required: true
		},
		city: {
			type: String
		},
		state: {
			type: String
		},
		country: {
			type: String
		},
		salary: {
			type: Number
		},
		absent: {
			type: Array,
			default: [Date]
		}
});

employeeSchema.methods.addLeave = function (date) {
	const newAbsent = this.absent;
	newAbsent.push(date);
	this.absent = newAbsent;
	return this.save();
};

module.exports = mongoose.model('Employee', employeeSchema);