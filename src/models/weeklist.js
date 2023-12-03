const mongoose = require('mongoose');
const taskSchema = require('./taskSchema');


const weeklistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    tasks:[taskSchema]
},{timestamps:true})

const Weeklist = mongoose.model('Weeklist',weeklistSchema);

module.exports = Weeklist;