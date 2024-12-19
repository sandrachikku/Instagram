import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    userId:{type:String},
    description:{type:String},
    photos:{type:Array},
    postDate:{type:String},
    postTime:{type:String},
    likes:[]
})

export default mongoose.model.Posts || mongoose.model("Post",postSchema);
