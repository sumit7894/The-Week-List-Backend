const express = require('express');
const {PORT} = require('./config/serverConfig');
const connect = require('./config/database')
const app = express();
const Weeklist = require('./models/weeklist');
const UserRespository = require('./repository/user-repository');
const bodyParser = require('body-parser');
// const userRepo = new UserRespository();
const authRouter = require('./routes/authRoute');
const weeklistRouter = require('./routes/weeklistRoute');
app.listen(PORT, async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    console.log(`Server started at the port number ${PORT}`);
    await connect();
    console.log("Server connected with mongo db");
    app.use('/',authRouter);
    app.use('/weeklist',weeklistRouter);
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
    // const task1 = {
    //     description : "hello this is my very first task",
    //     status:"done"
    // }
    // const task1 ={
    //     description:"the second one",
    // }
    // const weeklist = await Weeklist.create({
    //     user:'65675be468ca30303913f0c1',
    //     name:'Weeklist -1',
    //     tasks:{
    //         description:"hey new task from the index.js",
    //         status:"new status from index.js"
    //     }
    // })
    // console.log(weeklist);
})