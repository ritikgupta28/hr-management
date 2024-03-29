const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 500;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  }
  catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 500;
    throw error;
  }
  req.employeeId = decodedToken.employeeId;

  if(!req.employeeId) {
    const error = new Error('Hello employee, this url is not valid for you!');
    error.statusCode = 500;
    throw error;
  }
  next();
};