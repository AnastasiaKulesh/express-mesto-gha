const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
} = require('../controllers/card');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', setLike);
cardRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardRouter;
