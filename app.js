require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const error = require('./middlewares/error');
const routes = require('./routes/index');
const NotFoundError = require('./errors/Not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(express.json());

app.use(requestLogger);

app.use(cors());

app.use(routes); // подключаем роуты

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(error);

app.listen(PORT);
