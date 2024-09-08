import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const Dashboard = () => {
  const {loading : authloading } = useSelector((state)=>state.auth);
  const {loading : profileloading } = useSelector((state)=>state.profile);

  if(authloading || profileloading ){
    return <div>Loading...</div>

  }
  return (
    <div className='relative min-h-[calc(100vh-3.5rem)] flex'>
      <SideBar></SideBar>
      <div className=' '></div>
          <Outlet></Outlet>
    </div>
  )
}

export default Dashboard