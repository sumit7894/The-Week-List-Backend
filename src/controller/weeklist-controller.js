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

module.exports ={
    createWeeklist,
    deleteWeeklist
}