const employee = require('../models/employee');
const Employee = require('../models/employee');
const Notification = require('../models/notification');

// const io = require('../socket');

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
  const id = req.params.id;

  const holidays = [
    '04-01-2021'
  ];

  Employee.findById(id)
    .then(employee => {
      res.status(200).json({
        absents: employee.absent,
        holidays: holidays
      })
    })
    .catch(err => console.log(err));
}

exports.postApplyLeave = (req, res, next) => {
  const { reason, id, dates } = req.body;
  const notification = new Notification({
    dates: dates,
    employeeId: id,
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
    .catch(err => console.log(err));
}

exports.postSalary = (req, res, next) => {
  const { month, id } = req.body;
  Employee.findById(id)
    .then(employee => {
      const absent  = employee.absent;
      let countAbsents = 0;
      absent.map(date => {
        if(date.substring(3,10).indexOf(month) !== -1) {
          countAbsents++;
        }
      })
      let salary = (employee.salary)/12;
      let expectedSalary = salary;
      expectedSalary -= ((expectedSalary/30)*countAbsents);
      res.status(200).json({
        salary: salary,
        expectedSalary: expectedSalary
      });
    })
    .catch(err => console.log(err));
}