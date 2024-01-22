const userRouter = require('express').Router();
const { getUserById, createUser, getUsers } = require('../controllers/user');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);

module.exports = userRouter;
