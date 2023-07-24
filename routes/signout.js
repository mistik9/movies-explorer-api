const signoutRouter = require('express').Router();

const { logout } = require('../controllers/user');

signoutRouter.post('/', logout);

module.exports = signoutRouter;
