const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo, updateUser, logout,
} = require('../controllers/user');

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

userRouter.post('/signout', logout);

module.exports = userRouter;
