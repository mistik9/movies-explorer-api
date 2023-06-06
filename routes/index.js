const router = require('express').Router();

const userRouter = require('./user');
const movieRouter = require('./movie');
const signinRouter = require('./signin');
const signupRouter = require('./signup');

const auth = require('../middlewares/auth');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use(auth);
router.use('/movies', movieRouter);
router.use('/users', userRouter);

module.exports = router;
