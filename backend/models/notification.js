const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
		employeeId: {
			type: Schema.Types.ObjectId,
			ref: 'Employee',
			required: true
		},
		reason: {
			type: String,
			required: true
		}
});

module.exports = mongoose.model('Notification', notificationSchema);