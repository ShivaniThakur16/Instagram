import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    bio:{
        type:String,
        default:"",
        trim:true,
    },
    image:
    {
        type:String,
        default:"https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
        trim:true,
    },
})

const userModel = mongoose.model("User", userSchema);
export default userModel;