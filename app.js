require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const error = require('./middlewares/error');
const routes = require('./routes/index');
const NotFoundError = require('./errors/Not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGODB_ADDRESS } = require('./utils/constants');
const limiter = require('./middlewares/rateLimit');

const app = express();
const { PORT = 3000 } = process.env;
// подключаемся к серверу mongo
mongoose.connect(MONGODB_ADDRESS);

app.use(express.json());

app.use(requestLogger);

app.use(cors());

app.use(helmet());

app.use(limiter);

app.use(routes); // подключаем роуты

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(error);

app.listen(PORT);
