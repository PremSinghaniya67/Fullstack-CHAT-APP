import { useEffect, useState } from 'react'
import './App.css'

import { Routes,Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

import {Toaster} from 'react-hot-toast'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'

import {Loader} from 'lucide-react'

function App() {
  const {theme}= useThemeStore();
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}= useAuthStore();
    // console.log(onlineUsers) //just to check 
  
  // useEffect(()=>{
  //   checkAuth();
  // },[authUser]) 
  
  // if authUser get change This checkAuth function called. ❌❌[ this code change by me  as above useEffect code create an infinite calliing of checkAuth function]
  useEffect(()=>{
    checkAuth();
  },[]) 

  //if we try to checking Auth , while isCheckingAuth=false and authUser=null --> show loading part
  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen ">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
    
  }
  // console.log("hello")
  return (
    <div data-theme={theme} >
      
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser? <HomePage/> : <Navigate to='/login'/>}/>
        <Route path="/signup" element={!authUser? <SignupPage/> : <Navigate to='/'/>}/>
        <Route path="/login" element={!authUser? <LoginPage/> : <Navigate to='/'/>}/>
        <Route path="/settings" element={<SettingPage/>}/>
        <Route path="/profile" element={authUser? <ProfilePage/> : <Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App


// Difference b/w..
// {authUser?<Route path="/settings" element={<SettingPage/>}/>:null}
// <Route path="/profile" element={authUser?<ProfilePage/>:null}/>

// 1. routes not found if authUser--> null/undefined
// 2. routes get hit but page not show as element will be null if authUser--> null / undefined