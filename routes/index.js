const router = require('express').Router();
const cardRouter = require('./card');
const userRouter = require('./user');

const { STATUS_NOT_FOUND } = require('../constants/errors');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
