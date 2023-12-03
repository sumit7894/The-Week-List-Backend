const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
});

module.exports = taskSchema;