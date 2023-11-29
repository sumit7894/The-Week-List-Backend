const express = require('express');

const {signUp,signIn,health} = require('../controller/user-controller');

const authRouter = express.Router();

authRouter.route('/signup').post(signUp);
authRouter.route('/signin').post(signIn);
authRouter.route('/health').get(health);

module.exports= authRouter;