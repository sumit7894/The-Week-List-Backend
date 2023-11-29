const UserService = require('../services/user-service');

const userService = new UserService();

const signUp = async(req,res)=>{
    try {
        const response = await userService.create({
            fullName : req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            age: req.body.age,
            mobile: req.body.mobile
        })
        return res.status(201).json({
            success:true,
            message:"Successfully created a new user",
            data:response,
            err:{}
        });
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

const signIn = async(req,res)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            success:true,
            message:"Successfully logged in",
            data:response,
            err:{}
        });
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

module.exports ={
    signUp,
    signIn
}