import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios'
import './Signup.scss'; 

function Signup() {
  const navigate=useNavigate();
  const email=localStorage.getItem('email');
    const [user,setUser]=useState({
      email:email,
      username:"",
      password:"",
      cpassword:"",
    })
  const handleChange=(e)=>{
    // console.log(e.target.value);
    setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    // const res=await fetch("http://localhost:3000/api/signup",{
    //   method:"POST",
    //   headers:{"Content-Type":"application/json"},
    //   body:JSON.stringify(user)
    // })
    // const result=await res.json();
    const res=await axios.post("http://localhost:3000/api/signup",user,{Headers:{"Content-Type":"application/json"}});
    // console.log(res);
    if(res.status===201){
      localStorage.removeItem('email')
      alert(res.data.msg);
      navigate('/login')
    }
    else{
      alert(result.msg)
    }
  };
  
  return (
    <div className="Signup">
      <div className="signup-container">
      <div className="signup-box">
        <div className="signup-logo">
          <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png"   alt="Instagram Logo" 
            className="logo"  />
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
        
          <input type="text" placeholder="Username" value={user.username} onChange={handleChange} name='username' className="input-field" />
          <input type="password" placeholder="Password" value={user.password} onChange={handleChange} name='password' className="input-field" />
          <input type="password" placeholder="Confirm Password" value={user.cpassword} onChange={handleChange} name='cpassword' className="input-field" />
          
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Have an account? <Link to={'/login'}>Login</Link></p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
