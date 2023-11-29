const UserRespository = require('../repository/user-repository');

class UserService{
    constructor(){
        this.userRepository = new UserRespository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the service layer",error);
        }
    }
}
module.exports = UserService;