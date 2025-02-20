import mongoose  from "mongoose";

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
},{timestamps:true})

const Message=mongoose.model('Message',messageSchema) //mongoose what that your model name is start with uppercase and name should singular . 
                                            // mongoose automatically update name from Message--> messages.

export default Message;