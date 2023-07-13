require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { DEV_PORT, DEV_DB } = require('./utils/config');
const { PORT, URL_DB } = process.env;

const app = express();
mongoose.connect(URL_DB || DEV_DB)

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(requestLogger);

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT || DEV_PORT, () => {
  console.log(`Server running at ${PORT || DEV_PORT}`)
});

