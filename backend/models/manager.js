const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
		password: {
		  type: String,
		  required: true
	  },
		email: {
			type: String,
			required: true
		},
		holiday: {
			type: Array,
			default: [Date]
		}
});

managerSchema.methods.addHoliday = function(dates) {
	const newHoliday = this.holiday;
	dates.map(date => {
		if(newHoliday.indexOf(date) === -1) {
			newHoliday.push(date);
		}
	})
	this.holiday = newHoliday;
	return this.save();
};

module.exports = mongoose.model('Manager', managerSchema);