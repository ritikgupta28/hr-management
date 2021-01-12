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
   	},
   	reply: {
   		type: String,
   		default: 'unseen'
	  },
	  dates: {
		  type: Array,
		  default: [Date]
	  }
  },
  { timestamps: true }
);

notificationSchema.methods.addReply = function(answer) {
	let newReply = this.reply;
	newReply = answer;
	this.reply = newReply;
	return this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);