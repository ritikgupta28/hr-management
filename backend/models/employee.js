const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
		name: {
			type: String,
			required: true
	  },
	  password: {
		  type: String
	  },
		email: {
			type: String,
			required: true
		},
		mobile: {
			type: String,
			default: ""
		},
		role: {
			type: String,
			default: ""
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
		},
		register: {
			type: Boolean,
			default: false
		}
});

employeeSchema.methods.addEmployee = function (name, email, hashedPw, mobile) {
	let newName = this.name;
	newName = name;
	this.name = newName;
	let newEmail = this.email;
	newEmail = email;
	this.email = newEmail;
	let newPassword = this.password;
	newPassword = hashedPw;
	this.password = newPassword;
	let newMobile = this.mobile;
	newMobile = mobile;
	this.mobile = newMobile;
	let newRegister = true;
	this.register = newRegister;
	return this.save();
}

employeeSchema.methods.addTeam = function (name) {
	let newName = this.teamName;
	newName = name;
	this.teamName = newName;
	return this.save();
}

employeeSchema.methods.addLeave = function (dates) {
	const newAbsent = this.absent;
	dates.map(date => {
		if(newAbsent.indexOf(date) === -1) {
			newAbsent.push(date);
		}
	})
	this.absent = newAbsent;
	return this.save();
};

module.exports = mongoose.model('Employee', employeeSchema);