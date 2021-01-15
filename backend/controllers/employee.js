const Notification = require('../models/notification');

// const io = require('../socket');

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
      // io.getIO().emit('leave', {
      //   action: 'leave',
      //   employeeId: id,
      //   reason: reason
      // });
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