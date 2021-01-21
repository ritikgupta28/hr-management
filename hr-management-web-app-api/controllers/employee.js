const Notification = require('../models/notification');
const Employee = require('../models/employee')

exports.postApplyLeave = async (req, res, next) => {
  const { reason, dates } = req.body;

  try {
    if(!reason || !dates) {
      const error = new Error;
      error.message = 'Please enter valid reason or dates!';
      throw error;
    }
    let notification = new Notification({
      dates: dates,
      employeeId: req.employeeId,
      reason: reason
    });

    notification = await notification.save()

    res.status(200).json({
      message: 'Success!'
    });
  } catch(err) {
      if(err.statusCode !== 500) {
        const error = new Error('Failed to apply leave!');
        error.statusCode = 500;
        next(error);
      }
      else {
        next(err);
      }
  }
}

exports.postEditEmployee = async (req, res, next) => {
  const { newEmployee } = req.body;
  
  try {
    let employee = await Employee.findOne({ email: newEmployee.email })
    employee = employee.editEmployee(newEmployee);

    res.status(200).json({
      message: 'update done'
    });
  } catch(err) {
      const error = new Error('Failed to edit employee!');
      error.statusCode = 500;
      next(error);
  }
}

exports.getNotification = async (req, res, next) => {
  const id = req.params.id; 
	try {
    const notification = await Notification.find({ employeeId: id }).sort({ 'updatedAt': -1 }).populate('employeeId').exec()
		res.status(200).json({
			notifications: notification
		});
	} catch(err) {
      const error = new Error('Failed to fetch notifications!');
      error.statusCode = 500;
      next(error);
  }
}