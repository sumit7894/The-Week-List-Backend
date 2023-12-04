const express =require('express')
const{createWeeklist,deleteWeeklist,updateTask,deleteTask} = require('../controller/weeklist-controller');
const weeklistRouter = express.Router();

weeklistRouter.route('/create').post(createWeeklist);
weeklistRouter.route('/delete/:id').delete(deleteWeeklist);

weeklistRouter.route('/task/update').patch(updateTask);
weeklistRouter.route('/task/delete').delete(deleteTask);

module.exports = weeklistRouter;
