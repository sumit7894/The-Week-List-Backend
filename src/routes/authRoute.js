const express = require('express');

const {signUp,signIn,health} = require('../controller/user-controller');
const AuthRequestValidation = require('../middlewares/index')
const authRouter = express.Router();

authRouter.route('/signup',AuthRequestValidation.validateSignUpAuth).post(signUp);
authRouter.route('/signin',AuthRequestValidation.validateSignInAuth).post(signIn);
authRouter.route('/health').get(health);

module.exports= authRouter;