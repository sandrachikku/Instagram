import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from './img/main.webp'
import './Profile.scss'

const Profile = ({setUser,setProfile}) => {
    const navigate=useNavigate();
    const value=localStorage.getItem('Auth');
    const [user,setData]=useState({})
    const [posts,setPost]=useState([])
    useEffect(()=>{
        getDetails();
        getPosts();
      },[])
    const getDetails=async()=>{
        if(value!==null){
        try {
          const res=await axios.get("http://localhost:3000/api/profile",{headers:{"Authorization":`Bearer ${value}`}})
        if (res.status==200) {
          // setUserName(res.data.username);
          console.log(res.data);
          
          setUser(res.data.username);
          if(res.data.profile)
            setProfile(res.data.profile.profile);
          setData(res.data.profile)
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
    const getPosts=async()=>{
      const res=await axios.get("http://localhost:3000/api/getpost",{headers:{"Authorization":`Bearer ${value}`}})
      console.log(res.data);
      setPost(res.data);
    }
  return (
    <div className='Profile'>
      <div className="left">
        <div className="top">
          <img src={user?user.profile:img} alt="" />
        
            <h2>{user?user.name:"NAME"}</h2>
            <h3>{user?user.dob:"Date of Birth"}</h3>
            <p>{user?user.bio:"BIO"}</p>
         
        </div>
        <div className="bottom">
            <button onClick={()=>navigate('/addprodetails')}>{user?"Edit details":"Add Details"}</button>
            <button >Delete Account</button>
            <button onClick={()=>{localStorage.removeItem('Auth')
              navigate('/')
            }}>Logout</button> 
        </div>
      </div>
      <div className="right">
        <div className="add">
          <button onClick={()=>navigate('/addpost')}>Add Posts</button>
        </div>
        <div className="posts">
          {posts.map((post)=> <Link key={post._id} className='post' to={`/postdetails/${post._id}`}>
              <img src={post.photos[0]} alt="" />
          </Link>
            )}
        </div>
      </div>
    </div>
  )
}

export default Profile
