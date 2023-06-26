const { SERVER_MESSAGE } = require ('../utils/constants')

const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? SERVER_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
