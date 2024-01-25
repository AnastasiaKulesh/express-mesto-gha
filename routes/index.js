const router = require('express').Router();
const cardRouter = require('./card');
const userRouter = require('./user');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
