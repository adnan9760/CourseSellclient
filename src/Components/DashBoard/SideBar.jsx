import React from 'react'
import {sidebarLinks} from '../../data/Dashboard-link'
import SideBarLink from './SideBarLink';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function SideBar() {
    const [confirmationModal, setConfirmationModal] = useState(null)
    const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
      )
    const {loading : authloading } = useSelector((state)=>state.auth);
  const {loading : profileloading } = useSelector((state)=>state.profile);

  if(authloading || profileloading ){
    return <div>Loading...</div>

  }
  return (
    <>
    <div className='flex flex-col w-[222px]  gap-[10px]  bg-[#2C333F]'>
 <div className='flex flex-col'>
{
sidebarLinks.map((link) => {
    console.log("Processing link:", link);
   
    
    if (link.type && user?.accountType !== link.type) {
      console.log("Skipping link:", link.name, "due to type mismatch");
      return null;
    }
  
    return (
      <SideBarLink
        key={link.id}
        link={link}
        icons={link.icon}
      />
    );
  })
}
 </div>
 <div className="mx-auto mt-5 mb-5 h-[1px] w-11/12 bg-white" />
 <div className=' flex flex-col'>
 <SideBarLink  link={{ name: "Settings", path: "/dashboard/edit" }}
            icons="VscSettingsGear"></SideBarLink>
 <SideBarLink  link={{ name: "Logout", path: "/dashboard/logout" }}
            icon="VscSignOut"></SideBarLink>
 </div>
    </div>
    </>
  )
}
