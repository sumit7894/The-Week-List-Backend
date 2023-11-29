const User = require('../models/user');
const bcrypt = require('bcrypt');
const {SALT} = require('../config/serverConfig');
class UserRespository{
    async create(data){
        try {
            const {password} = data;
            const encryptedPassword = bcrypt.hashSync(password,SALT);
            data.password = encryptedPassword;
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the repository layer",error)
        }
    }

    async get(userEmail){
        try {
            const user = await User.findOne(userEmail);
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the repository layer",error)
        }
    }
}

module.exports = UserRespository;