const express = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();


app.listen(PORT, async()=>{
    console.log(`Server started at the port number ${PORT}`);
})