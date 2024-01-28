/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

// Временное решение авторизации (добавляется в каждый запрос объект user)
app.use((req, res, next) => {
  req.user = {
    _id: '65aa8fb4415916f43987ab48',
  };

  next();
});

app.use(express.json());

// Подключение роутер
app.use(router);

// Подключение к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
