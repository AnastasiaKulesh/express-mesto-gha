const userRouter = require('express').Router();
const {
  getUserById,
  createUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateProfile);
userRouter.patch('/avatar', updateAvatar);

module.exports = userRouter;
