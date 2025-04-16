const userRouter = require('express').Router();
const userCtrl = require('../controllers/user.ctrl');

userRouter.post('/', userCtrl.postUser); // Create a new user
userRouter.put('/:id', userCtrl.updateUser); // Update a user by ID
userRouter.get('/owner/:id', userCtrl.getOwner); // Get users by owner ID
userRouter.delete('/:id', userCtrl.deleteUser); // Delete a user by ID
userRouter.get('/findone/:id', userCtrl.findOneUser); // Get a user by ID 'findOneUser'


module.exports = userRouter;