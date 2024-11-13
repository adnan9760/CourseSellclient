import React from 'react'
import { FaBarcode } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import { useState } from 'react';
function LectureIcon({title}) {
  console.log("tiyle",title)
    const [isEditing, setIsEditing] = useState(false);
    // const [editedName, setEditedName] = useState(title);

    async function handleSave() {
        setIsEditing(false);
        // dispatch(await EditSection({sectionid, editedName}));
      }
      function handleKeyDown(event) {
        if (event.key === 'Enter') {
          handleSave();
        }
      }
    function handleDeleteClick(){
    
    }
    // function handleNameChange(event) {
    //     setEditedName(event.target.value);
    //   }
   
     function handleEditClick() {
       setIsEditing(true);
     }
  return (
    <div className='ml-4 mt-2 mr-4'>
    <div className="flex justify-between">
    <div className="flex items-center gap-x-3">
      <div className="flex">
        <MdOutlineArrowDropDown size={20} />
        <FaBarcode size={20} />
      </div>
      <p>{title}</p>
      {/* {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={handleNameChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bg-richblack-700 text-white p-1 rounded border-none focus:ring-0"
        />
      ) : (
        <p>{title}</p>
      )} */}
    </div>
    <div className="flex space-x-2">
      <MdOutlineModeEdit
        size={20}
        onClick={handleEditClick}
        className="cursor-pointer"
      />
      <RiDeleteBin5Line size={20}
      onClick={handleDeleteClick} />
      <TiArrowSortedDown size={20} />
    </div>
  </div>
  </div>
  )
}

export default LectureIcon