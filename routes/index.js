const router = require('express').Router();
const cardRouter = require('./card');
const userRouter = require('./user');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
