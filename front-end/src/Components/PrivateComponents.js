import React from 'react'
import '../App.css'
import { Navigate,Outlet } from 'react-router-dom'

const PrivateComponents = () => {
    const auth = localStorage.getItem('user');
  return  auth?<Outlet />:<Navigate to="/singnup" />

  
}

export default PrivateComponents