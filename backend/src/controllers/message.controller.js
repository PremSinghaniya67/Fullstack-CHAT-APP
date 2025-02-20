import cloudinary from "../lib/cloudinary.js";
import {getRecieverSocketId, io} from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar=async (req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password") //ne->not equal to

        res.status(200).json(filteredUsers)

    }
    catch(err){
        console.log("Error in getUsersForSidebar controller",err.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getMessages=async (req,res)=>{
    try{
        const { id:userToChat }=req.params;
        const myId=req.user._id;

        //find all the messages where sender is either currUser or the user to chat with 
        const messages=await Message.find({
            $or:[
                {senderId:myId,recieverId:userToChat},
                {senderId:userToChat,recieverId:myId}
            ]
        }) 

        res.status(200).json(messages);
    } 
    catch(e){
        console.log("Error in getMessages controller :",err.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessage=async (req,res)=>{
    try{
        const { text,image }=req.body;
        const {id:recieverId}=req.params;
        const senderId=req.user._id; //which is myId
        
        let imageUrl;

        // if sender send the message with image as well ..
        if(image){ 
            //upload base64 image to cloudinary
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            recieverId, 
            text,
            image:imageUrl,
        })
        await newMessage.save();

        //todo: realtime functionality goes here ==> socket.io 
            // After adding message to the database send message to the reciever.
            const recieverSocketId = getRecieverSocketId(recieverId); //give socketId of recieverId if recieverId is loggedIn and online
            
            
            if(recieverSocketId){

                // io.emit() not to broadcast  message .. ❌ As it is personal chat

                io.to(recieverSocketId).emit("newMessage",newMessage);
            }


        res.status(200).json(newMessage);
    } 
    catch(err){ 
        console.log("Error in sendMessage controller :",err.message)
        res.status(500).json({message:"Internal server error"})
    }
}