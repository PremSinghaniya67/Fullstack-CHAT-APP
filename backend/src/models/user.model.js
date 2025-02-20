import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    profilePic:{
        type:String,
        default:'',
    },
},{timestamps:true})

const User=mongoose.model('User',userSchema) //mongoose what that your model name is start with uppercase and name should singular . 
                                            // mongoose automatically update name from User--> users.

export default User;