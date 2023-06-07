const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');
const { DEV_KEY} = require('../utils/config')

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY );
    req.user = payload;
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }

  return next();
};

module.exports = auth;
