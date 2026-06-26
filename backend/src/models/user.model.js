const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    username: {
        type:String,
        unique:[true, "Username already exists"],
        required:true
    }, 
    email: {
        type:String,
        unique:[true, "email already exists"],
        required:true
    }, 
    password: {
        type:String,
        required:true
    }, 
    bio:String,
    profileImage: {
        type:String,
        default:"https://thumbs.dreamstime.com/b/default-profile-picture-icon-high-resolution-high-resolution-default-profile-picture-icon-symbolizing-no-display-picture-360167031.jpg?w=768"
    }
})

const userModel=mongoose.model("users",userSchema);

module.exports=userModel;