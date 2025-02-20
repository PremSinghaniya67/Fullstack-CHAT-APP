import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


export const protectRoute=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt; //to grab this token from the cookies we have to use cookie-parser
        if(!token)
            return res.status(401).json({message:"Unauthorized - No Token Provided"})

        //if token exist , verify the token is valid or decode , validate using jwt.varify with our secretKey
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded)
            return res.status(401).json({message:"Unauthorized - Invalid Token "})

        const user=await User.findById(decoded.userId).select("-password") // extract entire user info except password -> .select()

        if(!user)
            return res.status(401).json({message:"User not found"})

        req.user=user;

        next();
    }
    catch(e){
        console.log("Error in protectRoute middleware: ",e.message)
        res.status(500).json({message:"Internal server error"})
    }
}