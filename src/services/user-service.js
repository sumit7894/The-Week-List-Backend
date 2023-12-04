const UserRespository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
class UserService{
    constructor(){
        this.userRepository = new UserRespository();
    }
    async create(data){
        try {
            const existingUser = await this.get({email: data.email});
            console.log(existingUser);
            if(existingUser){
                throw {error:'User with this email already exists'};
            }
            const user = await this.userRepository.create(data);
            const token = await this.createToken({
                email: data.email,
                fullName:data.fullName
            });
            return [user,{"token":token}];
        } catch (error) {
            console.log("Somthing went wrong in the service layer",error);
        }
    }
    async get(email){
        try {
            const user = await this.userRepository.get(email);
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the service layer",error);
        }
    }
    async createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log('Somthing went wrong in token creation');
            throw error;
        }
    }
    async checkPassword(userInputPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword,encryptedPassword);
        } catch (error) {
            console.log("Somthing went wrong in password comparison");
            throw error
        }
    }
    async signIn(emailId,password){
        try {
            const user = await this.get({email: emailId});
            const passwordMatch = this.checkPassword(password,user.password);
            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error : 'Incorrect Password'}
            }

            const newJwt = this.createToken({
                email:emailId,
                fullName:user.fullName
            });
            return newJwt;
        } catch (error) {
            console.log("Somthing went wrong in SignIn Process");
            throw error
        }
    }
}   
module.exports = UserService;