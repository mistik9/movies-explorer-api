require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const NotFoundError = require('./utils/errors/NotFoundError');
const {
  userRouter, movieRouter, signupRouter, signinRouter,
} = require('./routes');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT } = process.env;
const { URL_DB } = process.env;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(cors);

mongoose.connect(URL_DB)
  .then(console.log('DB is connected'))
  .catch((err) => console.log(err));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(requestLogger);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

app.use(auth);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use((req, res, next) => next(new NotFoundError('Cтраница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
