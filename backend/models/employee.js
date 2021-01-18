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
		address: {
			type: String,
			default: ""
		},
		city: {
			type: String,
			default: ""
		},
		country: {
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

employeeSchema.methods.editEmployee = function (name, mobile, address, city, country) {
	let newName = name;
	this.name = newName;
	let newMobile = mobile;
	this.mobile = newMobile;
	let newAddress = address;
	this.address = newAddress;
	let newCity = city;
	this.city = newCity;
	let newCountry = country;
	this.country = newCountry;
	return this.save();
}

employeeSchema.methods.addEmployee = function (name, email, hashedPw) {
	let newName = name;
	this.name = newName;
	let newEmail = email;
	this.email = newEmail;
	let newPassword = hashedPw;
	this.password = newPassword;
	let newRegister = true;
	this.register = newRegister;
	return this.save();
}

employeeSchema.methods.addTeam = function (name) {
	let newName = name;
	this.teamName = newName;
	return this.save();
}

employeeSchema.methods.addLeave = function (dates, holidays) {
	const newAbsent = this.absent;
	dates.map(date => {
		if(newAbsent.indexOf(date) === -1 && holidays.indexOf(date) === -1) {
			newAbsent.push(date);
		}
	})
	this.absent = newAbsent;
	return this.save();
};

module.exports = mongoose.model('Employee', employeeSchema);