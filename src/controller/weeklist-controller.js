const WeeklistService = require('../services/weeklist-service');

const weeklistService = new WeeklistService();

const createWeeklist = async(req,res)=>{
    try {
        const response = await weeklistService.create({
            user:req.body.user,
            name:req.body.name,
            tasks:req.body.tasks
        })
        return res.status(201).json({
            success:true,
            message:"Successfully created Weeklist",
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
            data:{},
            err:error
        })
    }
}
const deleteWeeklist = async(req,res)=>{
    try {
        const response = await weeklistService.destroy(req.params.id);
        return res.status(201).json({
            success: true,
            message:"Successfully deleted the weeklist",
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Failed to delte the weeklist",
            data:{},
            err:error
        })
    }
}
const updateTask = async(req,res)=>{
    try {
    const response = await weeklistService.updateTask(
        {
            weeklistId:req.body.weeklistId,
            taskId:req.body.taskId,
            description:req.body.description
        })
        return res.status(201).json({
            success:true,
            message:"Successfully updated the task",
            data:response,
            err:{}
        })
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update the task",
            data:{},
            err:error
        })
    }
}
const deleteTask = async(req,res)=>{
    try {
        const response = await weeklistService.deleteTask({
            weeklistId : req.body.weeklistId,
            taskId:req.body.taskId
        })
        return res.status(201).json({
            success:true,
            message:"Successfully deleted the task",
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to delete the task",
            data:{},
            err:error
        })
    }
}
module.exports ={
    createWeeklist,
    deleteWeeklist,
    updateTask,
    deleteTask
}