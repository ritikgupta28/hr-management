const Notification = require('../models/notification');
const Employee = require('../models/employee')

exports.postApplyLeave = async (req, res, next) => {
  const { reason, dates } = req.body;

  try {
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
      const error = new Error;
      error.message = 'Failed to apply leave!';
      next(error);
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
      const error = new Error;
      error.message = 'Failed to edit employee!';
      next(error);
  }
}