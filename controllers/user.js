const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK, NOT_FOUND_USER_MESSAGE, BAD_DATA_USER_MESSAGE,
  CONFLICT_USER_MESSAGE, SIGNIN_MESSAGE, CLEAR_COOKIE_MESSAGE,
} = require('../utils/constants');
const {
  BadRequestError, ConflictError, NotFoundError,
} = require('../utils/errors/index');
const { DEV_KEY } = require('../utils/config');
const { NONAME } = require('dns');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_DATA_USER_MESSAGE));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  // const {
  //   name, about, avatar, email, password,
  // } = req.body;
  bcrypt.hash(req.body.password, 10)

    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_USER_MESSAGE));
      } if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_DATA_USER_MESSAGE));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {

    new: true,
    runValidators: true,
  })

    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_DATA_USER_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_USER_MESSAGE));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY, { expiresIn: '7d' });
      console.log(token);
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.send({ success: SIGNIN_MESSAGE });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ success: CLEAR_COOKIE_MESSAGE });
};

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  login,
  logout,
};
