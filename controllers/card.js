/* eslint-disable no-console */
const Card = require('../models/Card');

// Получить все карточки
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

// Создать карточку
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = new Card({ name, link });
    newCard.owner = req.user._id;

    return res.status(200).send(await newCard.save());
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .send({ message: 'Переданы неверные данные', error: error.message });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

// Удалить карточку
module.exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId).orFail(
      () => new Error('NotFoundError'),
    );

    return res.status(200).send({ data: card });
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res
        .status(404)
        .send({ message: 'Карточка по указанному ID не найдена' });
    }
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Передан неверный ID' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
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
    );

    return res.status(200).send(like);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .send({ message: 'Переданы неверные данные', error: error.message });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
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
    );

    return res.status(200).send(like);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .send({ message: 'Переданы неверные данные', error: error.message });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
