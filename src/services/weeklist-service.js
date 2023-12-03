const WeeklistRepository = require('../repository/weeklist-repository');
class WeeklistService{
    constructor(){
        this.weeklistRepository = new WeeklistRepository();
    }
    async create(data){
        try {
            const weeklist = await this.weeklistRepository.create(data);
            return weeklist;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist service layer");
        }
    }
}

module.exports = WeeklistService;