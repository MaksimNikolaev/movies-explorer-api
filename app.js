require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const NotFoundError = require('./errors/Not-found-err');

const app = express();
const { PORT = 3000 } = process.env;
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());

app.use(routes); // подключаем роуты

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.listen(PORT);
