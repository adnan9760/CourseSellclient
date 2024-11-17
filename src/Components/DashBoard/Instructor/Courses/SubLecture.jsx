import React, { useEffect, useState } from "react";
import { FaBarcode } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import { DeleteSection, EditSection } from "../../../../services/operation/authapi";
import { useDispatch } from "react-redux";
import AddLecture from "./Addlecture";
import LectureIcon from "./LectureIcon";
import { fetchSubsection } from "../../../../services/operation/authapi";
export default function SubLecture({ sectionName, sectionid ,currentCallState, onCallToggle  }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(sectionName);
  const[isAddLectureopen,setisAddLectureopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const[ subsection, setsubsection] = useState([]);
  const[call,setcall] = useState(false);
  const [fetchcall, setfetchCall] = useState(currentCallState);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchSubsection(sectionid));
        setsubsection(data.data.subSection);
      } catch (error) {
        console.error("Error fetching subsection:", error);
      }
    };
    fetchData();
  }, [call]); 
  const handleCallToggle = (newCallState) => {

    setcall(newCallState);  
  };
  

 function handleDeleteClick(){
       const responce = dispatch(DeleteSection(sectionid));
       const newCallState = !fetchcall;
       setfetchCall(newCallState); 
       onCallToggle(newCallState); 

  
 }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleNameChange(event) {
    setEditedName(event.target.value);
  }

 async function handleSave() {
    setIsEditing(false);
    dispatch(await EditSection({sectionid, editedName}));
  }
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSave();
    }
  }
  function handleraddlecture(){
     setisAddLectureopen(true);
  }
  useEffect(()=>{
    console.log("press",isAddLectureopen)
  },[isAddLectureopen])
  return (
    <div>
     
    <div className="m-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-3">
          <div className="flex">
            <MdOutlineArrowDropDown size={20} />
            <FaBarcode size={20} />
          </div>
          {isEditing ? (
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
            <p>{editedName}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <MdOutlineModeEdit
            size={20}
            onClick={handleEditClick}
            className="cursor-pointer"
          />
          <RiDeleteBin5Line size={20}
          onClick={handleDeleteClick} className="cursor-pointer" />
          <TiArrowSortedDown size={20} />
        </div>
      </div>
      {
        subsection.length === 0 
        ? (<div></div>) 
        : (
          subsection.map((subsec,id)=>{
            return(
              <LectureIcon title={subsec.title} ></LectureIcon>
            )
          })
        )
      }
      <div className="h-[1px] bg-white mt-1"></div>
      <div className="ml-7 mt-3 space-x-1 text-yellow-500 flex items-center">
        <GoPlus size={20} />
        <button onClick={handleraddlecture}  className="text-[18px] bold">Add Lecture</button>
      </div>
     
      {
        isAddLectureopen && <AddLecture currentCallState={call} onCallToggle={handleCallToggle} sectionid = {sectionid} state={isAddLectureopen} setstate={setisAddLectureopen}></AddLecture>
      }
      
    </div>
    </div>
  );
}
