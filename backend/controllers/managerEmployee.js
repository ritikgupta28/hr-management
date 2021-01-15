const Employee = require('../models/employee');
const Manager = require('../models/manager')

exports.getEmployee = (req, res, next) => {
	const id = req.params.id;
	Employee.findById(id)
		.then(employee => {
			res.status(200).json({
				employee: employee
			})
		})
		.catch(err => {
      const error = new Error;
      error.message = 'Failed to fetch employee!'
      next(error);
    });
}

exports.getAttendance = (req, res, next) => {
  const id = req.params.id;
  let holidays;
  Manager.find()
    .then(manager => {
      holidays = manager[0].holiday;
      Employee.findById(id)
      .then(employee => {
        res.status(200).json({
          absents: employee.absent,
          holidays: holidays
        })
      })
      .catch(err => {
        const error = new Error;
        error.message = 'Failed to fetch attendance!'
        next(error);
      });
    })
    .catch(err => {
      const error = new Error;
      error.message = 'Failed to fetch attendance!'
      next(error);
    });
}

exports.postSalary = (req, res, next) => {
  const { id, month } = req.body;
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
    .catch(err => {
      const error = new Error;
      error.message = 'Failed to get salary!'
      next(error);
    });
}