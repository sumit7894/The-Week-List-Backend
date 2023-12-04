const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    weeklists: [{
        type: mongoose.Types.ObjectId,
        ref: 'Weeklist',
    }],

},{timestamps:true})

const User = mongoose.model('User',userSchema);

module.exports = User;