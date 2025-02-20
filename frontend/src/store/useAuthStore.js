//Here we can have a bunch of different states Using zustand

import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

import {io} from 'socket.io-client'


// const BASE_URL="http://localhost:5001";

// Specially for Deployment .... (comment above code and paste below code)
const BASE_URL=import.meta.env.MODE==="delvelopment"?"http://localhost:5001":"/";


//Syntax :  export const useAuthStore=create((set)=>({}))

export const useAuthStore=create((set,get)=>({  //why get : so that we want to  (use state / call function-state )inside another function-state .
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isChekingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{ //This is for whenever we refresh our page .....
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data})
            get().connectSocket();

        }
        catch(err){
            console.log("Error in checkAuth",err)
            set({authUser:null})
        }
        finally{
            set({isChekingAuth:false})
        }
    },

    signup:async (data)=>{
        set({isSigningUp:true})
        try{
            const res=await axiosInstance.post("/auth/signup",data)
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();

        }
        catch(err){
            toast.error(err.response.data.message);
        }
        finally{
            set({isSigningUp:false});
        }

    },

    login:async (data)=>{
        set({isLoggingIn:true})
        try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Logged in successfully");

            get().connectSocket()

        }
        catch(e){
            toast.error(e.response.data.message)
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
            get().disconnectSocket()
;        }
        catch(err){
            toast.error(err.response.data.message);
        }
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try{
            const res=await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated successfully");
        }
        catch(err){
            // toast.error(err.response);
            toast.error(err.response.data.message);
        }   
        finally{ 
            set({isUpdatingProfile:false})
        }
    },

    connectSocket:()=>{
        const {authUser}=get()

        if(!authUser || get().socket?.connected) return;

        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id,
            }
        });
        socket.connect();
        set({ socket: socket });

        //listening to server for a partiular key either comming in form of message or broadcast form..
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
         
    },

    //if we not define this browser automatically disconnect socket connection when we remove the tab..  But as we want to still connected and only disconnec when user logout.
    disconnectSocket:()=>{
        if(get().socket?.connected)
            get().socket.disconnect()
    }, 



}))


