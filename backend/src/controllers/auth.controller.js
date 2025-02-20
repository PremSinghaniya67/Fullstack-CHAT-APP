import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signup=async (req,res)=>{
    const {fullName,email,password}=req.body;
    try{
        if(!fullName|| !email || !password)
            return res.status(400).json({message:"All fields are required"})
        if(password.length<6)
            return res.status(400).json({message:"Password must be at least 6 characters"})
        const user=await User.findOne({email})
        if(user)
            return res.status(400).json({message:"Email already exists"})
        
        //hash password using bcrypt 
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName,
            email,
            password:hashedPassword,
        })
        if(newUser){
            //generate jwt token here 
            generateToken(newUser._id,res);
            await newUser.save(); //as we create new user using js-method (construction function) and not using mongose-method(.create) , so we have to save explicitly
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(401).json({message:"Invalid user data"})
        }
    }
    catch(e){
        console.log("error in signup controller",e.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login=async (req,res)=>{
    const {email,password}=req.body;
   try{
        const user=await User.findOne({email})
        if(!user)
            return res.status(400).json({message:"Invalid credentials"})
        
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({message:"Invalid credentials"})

        //login success create token for user..
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    }
   catch(err){
        console.log("Error in login controller",err.message)
        res.status(500).json({message:"Internal server error"})
   }
}

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }
    catch(err){
        console.log("Error in logout controller",err.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const  updateProfile=async (req,res)=>{ 
    //To upload images into it we use cloudinary : for More visit : cloudinary.com and login and u have a cloud  , then use npm-cloudinary after install and use cloundinary.config() to set (key,secret,cloudName )given by cloudinary-bucket . eg -> libFolder
    try{
        const {profilePic}=req.body;
        const userId=req.user._id; //as we use a middleware before updateProfile function and in middleware function we add userId in req. thats why we can use here
        if(!profilePic)
            res.status(400).json({message:"Profile pic is required"})
        
        const uploadResponse=await cloudinary.uploader.upload(profilePic); //cloudinary is not a DB , It is just a bucket for our image 

        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true}) //new:true --> to return updated userInfo , new:false(default)->to return old data..

        res.status(200).json(updatedUser)
    }
    catch(err){
        console.log("error in updateProfile controller",err.message);
        res.status(500).json({message:"Internal server error"}) 
    }
}

export const checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user) //give authenticated user
    }
    catch(e){
        console.log("Error in check auth controller",err.message)
        res.status(500).json({message:"Internal server error"})
    }
}

