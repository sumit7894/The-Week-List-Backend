const WeeklistRepository = require('../repository/weeklist-repository');
const UserRespository = require('../repository/user-repository');
class WeeklistService{
    constructor(){
        this.weeklistRepository = new WeeklistRepository();
        this.userRepository = new UserRespository();
    }
    async create(data){
        try {
            const elegibility = await this.elegible(data.user);
            if(!elegibility){
                console.log("For now this user is not elegible to create a new weeklist")
                throw error;
            }
            const weeklist = await this.weeklistRepository.create(data);
            return weeklist;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist service layer");
        }
    }
    async elegible(userId){
        try {
            const user = await this.userRepository.getUserById(userId);
            const count = user.weeklists.length;
            return count ==2 ? false : true;
        } catch (error) {
            console.log("Somthing went wrong in the service layer in elegible fxn");
        }
    }
    async destroy(userId){
        try {
            await this.weeklistRepository.delete(userId);
        } catch (error) {
            console.log("Somthing went wrong in the service layer");
        }
    }
    async updateTask(data){
        try {
            const updatedTask = await this.weeklistRepository.updateTask(data);
            return updatedTask;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist service layer");
            console.log(error);
        }
    }
    async deleteTask(data){
        try {
            await this.weeklistRepository.deleteTask(data);
        } catch (error) {
            console.log("Somthing went wrong in the weeklist service layer");
            console.log(error);
        }
    }
}

module.exports = WeeklistService;