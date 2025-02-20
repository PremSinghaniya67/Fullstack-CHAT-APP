import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app=express();
const server=http.createServer(app);



const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

export function getRecieverSocketId(userId){ //userId --> of the reciever
    return userSocketMap[userId];
}

// Used to store online user inside a Map : 
const userSocketMap={};         // key-value --> {userId:socketId}  -----> userId connected with socketId , It updated on each new connection



io.on("connection",(socket)=>{ //new socket connected to server...

    // after the handshake .........................................
        // console.log("A user connected",socket.id);
        const userId=socket.handshake.query.userId; //fetch userId of new connection --> it send fron clientSide with connection request
        console.log("A user connected",userId,socket.id);

        if(userId) userSocketMap[userId]=socket.id;
 
        // brodcast :  send to all connected sockets...
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    // ----------------------------------------------------------------------------------------

                //now listening-sending routes....
                // We will done this with helper functoion and handle all incomming-outgoing message route in message.controller

                
                socket.on("disconnect",()=>{
                    // console.log("A user disconnected",socket.id);
                    console.log("A user disconnected",userId,socket.id);

                    // change the userSocketMap --> one user remove from online category.
                    delete userSocketMap[userId];
                    io.emit("getOnlineUsers",Object.keys(userSocketMap)); //let everyone know which one get disconnected

                });
});


export {io,app,server}