const io = require('../socket');

const Employee = require('../models/employee');
const Notification = require('../models/notification');

exports.getEmployee = (req, res, next) => {
	const id = req.params.id;
	Employee.findById(id)
		.then(employee => {
			res.status(200).json({
				employee: employee
			})
		})
		.catch(err => console.log(err));
}

exports.getAttendance = (req, res, next) => {
  const absents = [
    '03-01-2021',
    '05-01-2021'
  ]
  const holidays = [
    '04-01-2021',
  ]
  res.status(200).json({
    absents: absents,
    holidays: holidays
  })
}

exports.applyLeave = (req, res, next) => {
  const { reason, id } = req.body;
  const notification = new Notification({
    employeeId: id,
    reason: reason
  });

  notification
    .save()
    .then(result => {
      res.status(200).json({
        message: 'Success!'
      });
    })
    .catch(err => console.log(err));

  // io.getIO().emit('description', {
  //   action: 'notification',
  //   description: reason
  // });
  // res.status(200).json({
  //   message: 'done',
  //   description: description
  // })
}