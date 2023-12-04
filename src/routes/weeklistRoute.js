const express =require('express')
const{createWeeklist,deleteWeeklist,updateTask,deleteTask,getAllWeeklist} = require('../controller/weeklist-controller');
const weeklistRouter = express.Router();

weeklistRouter.route('/create').post(createWeeklist);
weeklistRouter.route('/delete/:id').delete(deleteWeeklist);

weeklistRouter.route('/task/update').patch(updateTask);
weeklistRouter.route('/task/delete').delete(deleteTask);
weeklistRouter.route('/weeklists').get(getAllWeeklist);
module.exports = weeklistRouter;
