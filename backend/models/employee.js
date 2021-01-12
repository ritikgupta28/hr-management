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
		teamName: {
			type: String,
			default: ""
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

employeeSchema.methods.addLeave = function (dates) {
	const newAbsent = this.absent;
	dates.map(date => (
		newAbsent.push(date)
	))
	this.absent = newAbsent;
	return this.save();
};

employeeSchema.methods.addTeam = function (name) {
	let newName = this.teamName;
	newName = name;
	this.teamName = newName;
	return this.save();
}

module.exports = mongoose.model('Employee', employeeSchema);