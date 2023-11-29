const express = require('express');
const {PORT} = require('./config/serverConfig');
const connect = require('./config/database')
const app = express();

const UserRespository = require('./repository/user-repository');
const bodyParser = require('body-parser');
// const userRepo = new UserRespository();
const authRouter = require('./routes/authRoute');
app.listen(PORT, async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    console.log(`Server started at the port number ${PORT}`);
    await connect();
    console.log("Server connected with mongo db");
    // const user = await userRepo.create({
    //     fullName:"Sumit Maurya",
    //     email:"sumit@gmail.com",
    //     gender:"male",
    //     password:"bhaklsdjfkl",
    //     age:23,
    //     mobile:912136669
    // })
    // const userDetail = await userRepo.get({email:"sumit@gmail.com"});
    // console.log(userDetail);
    app.use('/',authRouter);
})