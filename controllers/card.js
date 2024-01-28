/* eslint-disable no-console */
const mongoose = require('mongoose');
const Card = require('../models/Card');

const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_SERVER_ERROR,
  NotFoundError,
} = require('../constants/errors');

// Получить все карточки
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_SUCCESS).send(cards);
  } catch (error) {
    return res
      .status(STATUS_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

// Создать карточку
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = new Card({ name, link });
    newCard.owner = req.user._id;

    return res.status(STATUS_CREATED).send(await newCard.save());
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

// Удалить карточку
module.exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId).orFail(
      () => new NotFoundError(),
    );

    return res.status(STATUS_SUCCESS).send({ data: card });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: 'Передан неверный ID' });
    }

    if (error instanceof NotFoundError) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: 'Карточка по указанному ID не найдена' });
    }

    return res
      .status(STATUS_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

// Поставить лайк карточке
module.exports.setLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const like = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail(() => new NotFoundError());

    return res.status(STATUS_SUCCESS).send(like);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: 'Карточка по указанному ID не найдена' });
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

// Убрать лайк с карточки
module.exports.deleteLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const like = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail(() => new NotFoundError());

    return res.status(STATUS_SUCCESS).send(like);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: 'Карточка по указанному ID не найдена' });
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
