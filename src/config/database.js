const mongoose = require('mongoose');
const {MONGODB_URL} =require('./serverConfig');
const connect = async ()=>{
    await mongoose.connect(MONGODB_URL);
}

module.exports = connect;