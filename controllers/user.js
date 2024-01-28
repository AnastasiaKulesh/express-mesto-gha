/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('../models/User');

const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_SERVER_ERROR,
  NotFoundError,
} = require('../constants/errors');

// Получить всех пользователей
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_SUCCESS).send(users);
  } catch (error) {
    return res
      .status(STATUS_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

// Получить определенного пользователя по Id
module.exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(() => new NotFoundError());

    return res.status(STATUS_SUCCESS).send({ data: user });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: 'Пользователь по указанному ID не найден' });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: 'Передан неверный ID' });
    }
    return res
      .status(STATUS_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

// Создать пользователя
module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });

    return res.status(STATUS_CREATED).send(newUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', error: error.message });
    }
    return res
      .status(STATUS_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

// Обновить профиль пользователя
module.exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError());

    return res.status(STATUS_SUCCESS).send(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: 'Пользователь по указанному ID не найден' });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', error: error.message });
    }
    return res
      .status(STATUS_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

// Обновить аватар пользователя
module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError());

    return res.status(STATUS_SUCCESS).send(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: 'Пользователь по указанному ID не найден' });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', error: error.message });
    }
    return res
      .status(STATUS_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};
