import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './AddPro.scss'
import { useNavigate } from 'react-router-dom';

function AddPro({setUser,setProfile}) {
  const navigate=useNavigate();
  const value=localStorage.getItem('Auth');
  const [user,setDetails]=useState({
    bio:"",
    name:"",
    profile:"",
    dob:""
  })
  useEffect(()=>{
    getDetails();
  },[])
const getDetails=async()=>{
    if(value!==null){
    try {
      const res=await axios.get("http://localhost:3000/api/profile",{headers:{"Authorization":`Bearer ${value}`}})
      console.log(res);
    if (res.status==200) {
      // setUserName(res.data.username);
      console.log(res.data.profile);
      setUser(res.data.username);
      if(res.data.profile)
        setProfile(res.data.profile.profile);
      if(res.data.profile)
        setDetails(res.data.profile)
    }else if (res.status==403){
      alert(res.data.msg);
      navigate('/login')
    }
    else{
      navigate('/login')
    }
    } catch (error) {
      console.log("error");
      navigate('/login')
    }
    }else{
      navigate('/login')
    }
  }
  // Handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    const res=await axios.post("http://localhost:3000/api/edituser",user,{headers:{"Authorization":`Bearer ${value}`}});
    console.log(res);
    if(res.status==201){
      alert(res.data.msg)
      navigate('/profile')
    }else{
      alert(res.data.msg)
    }
  };
  // console.log(user);
  
  const handleChange=(e)=>{
    // console.log(e.target.value);
    setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  // Handle image change
  const handleFile=async(e)=>{
    // console.log(e.target.files[0]);
    const profile=await convertToBase64(e.target.files[0])
    // console.log(profile);
    setDetails((pre)=>({...pre,profile:profile}))
  }
  function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
  }
  return (
    <div  className='AddPro'>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name='name'  value={user.name} onChange={handleChange}  placeholder="Enter your name" />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name='dob' value={user.dob} onChange={handleChange}  />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={user.bio} name='bio' onChange={handleChange} placeholder="Write a short bio" />
        </div>
        <div>
          <label>Profile Photo:</label>
          <input type="file" onChange={handleFile} accept="image/*" />
          {user.profile && <img src={user.profile} alt="Profile" style={{ width: '100px', height: '100px', marginTop: '10px',objectFit:'cover' }} />}
        </div>
        <button type="submit">{!user?"Save Details":"Add Details"}</button>
      </form>
    </div>
  );
}

export default AddPro;
