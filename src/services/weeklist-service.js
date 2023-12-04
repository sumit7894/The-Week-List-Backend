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
            const weeklist = await this.weeklistRepository.getWeeklist(weeklistId);
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
    
    async updateTask(data){
        try {
            const weeklist = await this.weeklistRepository.getWeeklist(data.weeklistId);
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
            const weeklist = await this.weeklistRepository.getWeeklist(data.weeklistId);
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
    async getAllWeeklist(){
        try {
        const weeklists = await this.weeklistRepository.getAllWeeklist();
        const allWeeklists =await  Promise.all(weeklists.map(async(weeklist)=>{
        const timeDifference =await this.findTimeDifference(weeklist.createdAt);
        const totalTime = 168
        const remainingTime = Math.abs(timeDifference - totalTime)
        const days = Math.floor(remainingTime/24);
        const hours = remainingTime%24;
        let payload = {...weeklist.toObject(),"Remaining Time":`${days} Days ${hours} Hours Left`}
        return payload;
        }))
        return allWeeklists;
        } 
        catch (error) {
            console.log("Somthing went wrong in the weeklist service");
            console.log(error);
        }
    }
}

module.exports = WeeklistService;