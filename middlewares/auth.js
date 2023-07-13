const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');
const { NOT_SIGNIN_MESSAGE } = require('../utils/constants');
const { DEV_KEY } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError(NOT_SIGNIN_MESSAGE));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY);
    req.user = payload;
  } catch (err) {
    return next(new AuthError(NOT_SIGNIN_MESSAGE));
  }

  return next();
};

module.exports = auth;
