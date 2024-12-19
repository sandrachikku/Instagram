import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Email from './Components/Email/Email';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Nav from './Components/Nav/Nav'
import Profile from './Components/Profile/Profile';
import AddPro from './Components/AddPro/AddPro';
import Post from './Components/Post/Post';
import PostD from './Components/PostD/PostD';

const App = () => {
  const [user,setUser]=useState("");
  const [profile,setProfile]=useState("")
  return (
    <BrowserRouter>
      {user&&<Nav user={user} profile={profile} />}
      <Routes>
        <Route path='/' element={<Home  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/register' Component={Signup}/>
        <Route path='/profile' element={<Profile  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/addprodetails' element={<AddPro  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/addpost' element={<Post  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/postdetails/:id' element={<PostD  setUser={setUser} setProfile={setProfile}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App