const signoutRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { logout } = require('../controllers/user');

signoutRouter.post('/', logout);



module.exports = signoutRouter;
