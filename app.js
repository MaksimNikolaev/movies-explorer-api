require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());

app.use(routes); // подключаем роуты

app.listen(PORT);
