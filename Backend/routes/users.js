const express = require('express');
const usersRouter = express.Router();

const {
    register,
    login,
    forgotpassword,
    userDetails,
    resetpassword,
} = require('../controllers/userController');

const { isAuth } = require('../utils/utils.js');

usersRouter.get('/', isAuth, userDetails);

usersRouter.post('/register', register);

usersRouter.post('/login', login);

usersRouter.post('/forgotpassword', forgotpassword);

usersRouter.put('/resetpassword/:resetToken', resetpassword);

module.exports = usersRouter;