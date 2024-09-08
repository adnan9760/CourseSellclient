import React, { useEffect, useState } from 'react'
import SubLecture from './SubLecture'
export default function LeatureAdd({sectionName,sectionid}) {
    const[section , setsection]= useState([]);
   
  return (
    <div>
        <SubLecture sectionName={sectionName} sectionid={sectionid}></SubLecture>
    </div>
  )
}
