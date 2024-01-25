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
