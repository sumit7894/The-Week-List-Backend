const express =require('express')
const{createWeeklist} = require('../controller/weeklist-controller');
const weeklistRouter = express.Router();

weeklistRouter.route('/create').post(createWeeklist);

module.exports = weeklistRouter;