const io = require('../socket');


exports.applyLeave = (req, res, next) => {
  const { description } = req.body;
  io.getIO().emit('description', {
    action: 'notification',
    description: description
  });
  // res.status(200).json({
  //   message: 'done',
  //   description: description
  // })
}