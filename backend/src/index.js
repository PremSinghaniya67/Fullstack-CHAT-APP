import express from 'express'; //on adding (type:module ->supports import) inside package.json which bydefault is (type:commonjs ->supports require)
import dotevn from 'dotenv'
import cors from 'cors'

import path from "path"

import {connectDB} from './lib/db.js'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app,server } from './lib/socket.js'; //build socket.io server on top of the backend


dotevn.config()

// Before socket.io we use this 
// const app=express() 

const __dirname=path.resolve()

app.use(express.json()) //allow to extract json data from req.body.
app.use(cookieParser()) //allow to parse/extract the cookie

app.use(cors({
    origin:"http://localhost:5173", 
    credentials:true, 
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


const PORT=process.env.PORT;

//specially setup for Deployment (also lineNo : 20,5 , 36-42)
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    
    //for all req, we want to send res into the entry point of fronted  
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

// app.listen(PORT,()=>{
//     console.log('server connected successfully on port : ',PORT)
//     connectDB()
// }) 

// socket.io server....
server.listen(PORT,()=>{
    console.log('server connected successfully on port : ',PORT)
    connectDB()
})
