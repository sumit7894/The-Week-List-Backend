const validateSignInAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:"Somthing went wrong",
            err:'Email or password is missing in SignIn request'
        })
    }
    next();
}

const validateSignUpAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password || !req.body.gender || req.body.age || req.body.mobile){
        return res.status(400).json({
            success:false,
            data:{},
            message:"Somthing went wrong",
            err:'Any field has been missed in sign up'
        })
    }
    next();
}

module.exports ={
    validateSignInAuth,
    validateSignUpAuth
}