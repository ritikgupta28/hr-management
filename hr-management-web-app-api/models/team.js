const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		members: [
			{
				employeeId: {
					type: Schema.Types.ObjectId,
					ref: 'Employee',
					required: true
				}
			}
		],
		description: {
			type: String,
			required: true
		}
});

module.exports = mongoose.model('Team', teamSchema);