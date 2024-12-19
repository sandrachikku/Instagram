import React from 'react'
import './Nav.scss'
import img from './img/main.webp'
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({user,profile}) => {
  const navigate=useNavigate();
  return (
    <div className='Nav'>
      <h2><Link to={'/'}>Instagram</Link></h2> 
      <div className="profile">
        <img src={profile?profile:img} alt="" onClick={()=>navigate('/profile')}/>
        <h3>{user}</h3>
      </div>
    </div>
  )
}

export default Nav
