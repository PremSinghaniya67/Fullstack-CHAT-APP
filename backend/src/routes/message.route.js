import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';

const router=express.Router();

//to provide all the user (except itself) to the client , so that he can be seen on the side bar..
router.get('/users',protectRoute,getUsersForSidebar) //to provide all the user (except itself) to the client , so that he can be seen on the side bar..

//to give the messages of the corresponding user(id) with the currrent user..
router.get('/:id',protectRoute,getMessages) 

router.post("/send/:id",protectRoute,sendMessage);

export default  router;  