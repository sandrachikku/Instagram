import mongoose from "mongoose"

const profileSchema=new mongoose.Schema({
    userId:{type:String},
    name:{type:String},
    dob:{type:String},
    bio:{type:String},
    profile:{type:String}
})

export default mongoose.model.Profiles || mongoose.model("Profile",profileSchema);
