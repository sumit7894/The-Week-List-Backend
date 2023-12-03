const Weeklist =require('../models/weeklist');
class WeeklistRepository{
    async create(data){
        try {
            const weeklist = await Weeklist.create(data);
            return weeklist;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist repo",error);
        }
    }
}

module.exports = WeeklistRepository;