/* eslint-disable no-console */
const User = require('../models/User');

// Получить всех пользователей
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

// Получить определенного пользователя по Id
module.exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      () => new Error('NotFoundError'),
    );

    return res.status(200).send({ data: user });
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res
        .status(404)
        .send({ message: 'Пользователь по указанному ID не найден' });
    }
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Передан неверный ID' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

// Создать пользователя
module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });

    return res.status(200).send(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .send({ message: 'Переданы неверные данные', error: error.message });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
