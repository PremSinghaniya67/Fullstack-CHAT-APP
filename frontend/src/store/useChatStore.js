import {create} from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore=create((set,get)=>({ //to get data : use get() -->if we want use name of a state but not want to point to that state , so we not use set() to update as well to make more readable we use get keyword 
    selectedUser:null,

    messages:[],
    users:[],  //for sidebar users
    isUserLoading:false,
    isMessageLoading:false,

    getUsers:async()=>{
        set({isUserLoading:true});
        try{
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data});

        }
        catch(e){
            toast.error(e.response.data.messages);
        }
        finally{
            set({isUserLoading:false});
        }
    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try{
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});

        }
        catch(e){
            toast.error(e.response.data.messages);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },

    sendMessage:async(messageData)=>{
        const {selectedUser,messages}=get();
        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages:[...messages,res.data]})
        }
        catch(e){
            toast.error(e.response.data.message);
        }
    },

    // listen or subscribe to messages  : where should we call? ->if client open their chatContainer and showing message
    subscribeToMessages:()=>{
        const {selectedUser}=get()
        if(!selectedUser) return ;

        const socket=useAuthStore.getState().socket; // as useAuthStore.js:line105 , we create this variable : zustand allow to use using getState()
        
        // todo : optimize this one later ❌ this give error 
            // socket.on("newMessage",(newMessage)=>{set({messages:[...get().messages,newMessage]})})
                // ?error ❌ : on new message come this will show the message into opened-chatbox user even if he is not reciever or sender.
        
        socket.on("newMessage",(newMessage)=>{
            const isMessageSentFromSelectedUser = newMessage.senderId===selectedUser._id; //if A send message to B and B selected user-A then only show new Message inside chatbox selected user(A)
            if(!isMessageSentFromSelectedUser) return;
            
            set({
                messages:[...get().messages,newMessage],
            });
        });

    },

    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket; // copy from line 61
        socket.off("newMessage"); //off this event having event name->new message

    },

    setSelectedUser:(selectedUser)=>{
        set({selectedUser});
    },

}))
