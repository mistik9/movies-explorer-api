const router = require('express').Router();
const NotFoundError = require('../utils/errors/NotFoundError');
const { NOT_FOUND_MESSAGE } = require('../utils/constants')

const userRouter = require('./user');
const movieRouter = require('./movie');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const signoutRouter = require('./signout');

const auth = require('../middlewares/auth');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use('/signout', signoutRouter);
router.use(auth);
router.use('/movies', movieRouter);
router.use('/users', userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

module.exports = router;
