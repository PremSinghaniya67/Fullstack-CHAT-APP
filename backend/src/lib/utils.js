import jwt from 'jsonwebtoken'

export const generateToken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    // cookie--> it is a client side storage that alway send on each req to the server...
    // cookie(key,value,extra-arg)
    res.cookie('jwt',token,{
        maxAge:7*24*60*60*1000, //MS
        httpOnly:true, //prevent XSS attaks cross-site scripting attacks,
        sameSite:"strict", //CSRF attacks cross-site request forgery attacks , More to google it
        secure:process.env.NODE_ENV!=="development"  //if we are in production->true , development->false
    })  

    return token;
}
