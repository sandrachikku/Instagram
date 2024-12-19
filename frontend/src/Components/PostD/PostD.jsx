import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './PostD.scss'

const PostD = ({setUser,setProfile}) => {
  useEffect(()=>{
      postDetails();
  },[])
  const value=localStorage.getItem('Auth')
  const {id}=useParams();
  const [posts,setPosts]=useState({});
  const [photos,setPhotos]=useState([])
  const navigate=useNavigate();
  const postDetails=async()=>{
    try {
        if(value!==null){
        const res=await axios.get(`http://localhost:3000/api/postdetails/${id}`,{headers:{"Authorization":`Bearer ${value}`}})
        // console.log(res);
            if (res.status==200) {
              console.log(res.data.post);
              setUser(res.data.username);
              setProfile(res.data.profile);
              setPosts({...res.data.post});
              setPhotos([...res.data.post.photos])
            }else{
              alert(res.data.msg);
              navigate('/login')
            }
        }
        else{
          navigate('/login')
        }
      }
      catch (error) {
       console.log("error");
     }
    }
  return (
    <div className='PostD'>
      <div className="left">
            {photos.map((photo,ind)=><img key={ind} src={photo} alt='post'/>)} 
      </div>
      <div className="right">
        <label htmlFor="desc">
            Description:
        </label>
       <h3 id='desc'>{posts.description}</h3>
        <label htmlFor="date">Date:</label>
       <h3 id='date'>{posts.postDate}</h3>
        <label htmlFor="time">Time:</label>
       <h3 id='time'>{posts.postTime}</h3>
      </div>
    </div>
  )
}

export default PostD
