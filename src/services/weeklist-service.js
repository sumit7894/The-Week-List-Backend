const WeeklistRepository = require('../repository/weeklist-repository');
const UserRespository = require('../repository/user-repository');
const Weeklist = require('../models/weeklist');
const moment = require('moment');
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
    async destroy(weeklistId){
        try {
            const weeklist = await this.getWeeklist(weeklistId);
            const timeDifference = await this.findTimeDifference(weeklist.createdAt);
            if(timeDifference > 24){
                console.log("Sorry, you can't delete the weeklist after 24hrs");
                return;
            }
            await this.weeklistRepository.delete(weeklistId);
        } catch (error) {
            console.log("Somthing went wrong in the service layer");
        }
    }
    async getWeeklist(weeklistId){
        try {
            const weeklist = await Weeklist.findById(weeklistId);
            return weeklist;
        } catch (error) {
            console.log(error);
            console.log("Somthing went wrong in the weeklist-service");
        }
    }
    async updateTask(data){
        try {
            const weeklist = await this.getWeeklist(data.weeklistId);
            const timeDifference = await this.findTimeDifference(weeklist.createdAt);
            if(timeDifference > 24){
                console.log("No updation can be made after 24hrs");
                return;
            }
            const updatedTask = await this.weeklistRepository.updateTask(data);
            return updatedTask;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist service layer");
            console.log(error);
        }
    }
    async deleteTask(data){
        try {
            const weeklist = await this.getWeeklist(data.weeklistId);
            const timeDifference =await  this.findTimeDifference(weeklist.createdAt);
            if(timeDifference > 24){
                console.log("No updation can be made after 24hrs");
                throw error;
            }
            await this.weeklistRepository.deleteTask(data);
        } catch (error) {
            console.log("Somthing went wrong in the weeklist service layer");
            console.log(error);
        }
    }
    async findTimeDifference(createdAt){
        const creationTime = moment.utc(createdAt);
        const currentTime = moment.utc(new Date());
        return currentTime.diff(creationTime,'hours');
    }
}

module.exports = WeeklistService;