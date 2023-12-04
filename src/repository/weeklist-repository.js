const Weeklist =require('../models/weeklist');
const User = require('../models/user');
class WeeklistRepository{
    async create(data){
        try {
            const weeklist = await Weeklist.create(data);
            if(weeklist){
                await User.findByIdAndUpdate(weeklist.user,{
                    $push:{weeklists:weeklist._id}
                })
            }
            return weeklist;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist repo",error);
        }
    }
    async delete(weeklistId){
        try {
            const weeklist = await Weeklist.findById(weeklistId);
            console.log("here is weeklist id",weeklistId);
            console.log("here is userId",weeklist);
            await Weeklist.findByIdAndDelete(weeklistId);
            await User.findByIdAndUpdate(weeklist.user,{
                $pull:{weeklists:weeklist._id}
            })
        } catch (error) {
            console.log("Somthing went wrong");
        }
    }
}

module.exports = WeeklistRepository;