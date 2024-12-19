import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom"
import './Login.scss'; 
import img1 from './img/screenshot3.png'
import img2 from './img/c5Rp7Ym-Klz.png'
import img3 from './img/EHY6QnZYdNX.png'

function Login() {
  const navigate=useNavigate();
  const [loginDetails,setDetails]=useState({
    email:"",
    password:""
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    const res=await fetch("http://localhost:3000/api/signin",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(loginDetails)
    })
    const result=await res.json();
    if(res.status===200){
      localStorage.setItem("Auth",result.token)
      alert(result.msg)
      navigate('/')
    }
    else{
      alert(result.msg)
    }
  };
  const handleChange=(e)=>{
    setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  return (
    <div className="Login">
      
      <div className="login-container">
      <div className="login-box">
        <h2>Instagram</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="text" placeholder="example@email.com" value={loginDetails.email} name="email" onChange={handleChange} className="input-field"    />
          <input type="password" placeholder="Password" value={loginDetails.password} name='password' onChange={handleChange} className="input-field" />
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <div className="or">
          <div className="blank"></div>
          <div className="cont">OR</div>
          <div className="blank"></div>
        </div>
        <p>Forgot password?</p>
      </div>
      <div className="login-footer">
        <p>Don't have an account? <Link to={'/email'}>Sign up</Link></p>
      </div>
      <p>Get the app.</p>
      <div className="geta">
        <img src={img2} alt="" />
        <img src={img3} alt="" />
      </div>
    </div>
    </div>
  );
}

export default Login;
