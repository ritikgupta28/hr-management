const Notification = require('../models/notification');

exports.postApplyLeave = (req, res, next) => {
  const { reason, dates } = req.body;
  const notification = new Notification({
    dates: dates,
    employeeId: req.employeeId,
    reason: reason
  });

  notification
    .save()
    .then(result => {
      res.status(200).json({
        message: 'Success!'
      });
    })
    .catch(err => {
      const error = new Error;
      error.message = 'Failed to apply leave!'
      next(error);
    });
}

exports.postEditEmployee = (req, res, next) => {
  const { name, email, mobile, address, city, country } = req.body;
  
  Employee.findOne({ email: email })
    .then(employee => {
      employee.editEmployee(name, mobile, address, city, country);
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}