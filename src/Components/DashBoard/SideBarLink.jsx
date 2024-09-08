import React from 'react';
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from 'react-router-dom';

export default function SideBarLink({ link, icons }) {
  const location = useLocation();
  const Icon = Icons[icons] || Icons['VscQuestion']; // Fallback to a default icon if the specified one is not found

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink 
      to={link.path} 
      className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-[#4b6796]"}`}
    >
      <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>
      
      <div className='flex items-center gap-x-2'>
        {Icon ? <Icon className='text-lg' /> : <span className='text-lg'>?</span>}
        <span className='text-sm'>{link.name}</span>
      </div>
    </NavLink>
  );
}
