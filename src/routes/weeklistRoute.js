const express =require('express')
const{createWeeklist,deleteWeeklist} = require('../controller/weeklist-controller');
const weeklistRouter = express.Router();

weeklistRouter.route('/create').post(createWeeklist);
weeklistRouter.route('/delete/:id').delete(deleteWeeklist);
module.exports = weeklistRouter;