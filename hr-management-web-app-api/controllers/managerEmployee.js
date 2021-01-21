const Employee = require('../models/employee');
const Manager = require('../models/manager');

exports.getEmployee = async (req, res, next) => {
	const id = req.params.id;

  try {
    const employee = await Employee.findById(id)

    res.status(200).json({
      employee: employee
    });
  } catch(err) {
      const error = new Error('Failed to fetch employee!');
      error.statusCode = 500;
      next(error);
  }
}

exports.getAttendance = async (req, res, next) => {
  const id = req.params.id;
  let holidays;

  try {
    const manager = await Manager.find()
    holidays = manager[0].holiday;
    const employee = await Employee.findById(id)
    
    res.status(200).json({
      absents: employee.absent,
      holidays: holidays
    });
  } catch(err) {
      const error = new Error('Failed to fetch attendance!');
      error.statusCode = 500;
      next(error);
  }
}

exports.postSalary = async (req, res, next) => {
  const { id, month } = req.body;
  
  try {
    if(!month) {
      const error = new Error('Please enter valid month!');
      error.statusCode = 500;
      throw error;
    }
    const employee = await Employee.findById(id)
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
  } catch(err) {
      if(err.statusCode !== 500) {
        const error = new Error('Failed to get salary!');
        error.statusCode = 500;
        next(error);
      }
      else {
        next(err);
      }
  }
}