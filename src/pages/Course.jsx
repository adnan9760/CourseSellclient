import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Course() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
  return (
    <div>
         <nav className='text-white ' >
        <ol className='flex flex-row'>
            <li>
                <Link to="/">Home</Link>

            </li>
            {
                pathnames.map((value,index)=>{
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
                    return isLast ? (<li key={to} aria-current="page">
                        {formattedValue}
                      </li>) : ( <li key={to}>
              <Link to={to}>{formattedValue}</Link>
            </li>)
                })
            }
        </ol>
         </nav>
    </div>
  )
}
