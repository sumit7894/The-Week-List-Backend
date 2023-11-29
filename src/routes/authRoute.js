const express = require('express');

const {signUp} = require('../controller/user-controller');

const authRouter = express.Router();

authRouter.route('/signup').post(signUp);

module.exports= authRouter;