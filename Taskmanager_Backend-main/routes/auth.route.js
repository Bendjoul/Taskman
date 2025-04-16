const authRouter = require('express').Router();
const {AuthCtrl:{register, activation, login}} = require('../controllers'); // Import the login and register functions

authRouter.post('/login', login); // Login route
authRouter.post('/register', register); // Register route
//authRouter.post('/logout', logout); // Logout route
authRouter.post("/activation", activation); // Activation route

module.exports = authRouter;