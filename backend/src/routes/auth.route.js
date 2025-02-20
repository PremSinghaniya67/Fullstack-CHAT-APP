import express from 'express'
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
 const router=express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.put("/update-profile", protectRoute ,updateProfile)

router.get("/check",protectRoute, checkAuth) //whenever client ask for profile-pic from frontend (on page render-reRender) we 1st check authentication and then give

export default  router;