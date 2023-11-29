const express = require('express');
const {PORT} = require('./config/serverConfig');
const connect = require('./config/database')
const app = express();


app.listen(PORT, async()=>{
    console.log(`Server started at the port number ${PORT}`);
    await connect();
    console.log("Server connected with mongo db");
})