import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { CreateBuilder, Fetchsection } from '../../../../services/operation/authapi';
import { useDispatch } from 'react-redux';
import LeatureAdd from './LeatureAdd';

export default function CourseBuilder() {
  const dispatch = useDispatch();
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseid');
  const name = queryParams.get('courseName');

  const [sections, setSections] = useState([]);
  const [call, setCall] = useState(false); 

  useEffect(() => {
    // Fetch data inside the useEffect, not in another function
    const fetchData = async () => {
      try {
        const data = await dispatch(Fetchsection(courseId)); // Assuming Fetchsection is an action creator
        console.log("data section", data);
        setSections(data.data.coursecontent)
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    };
  
    fetchData();
  }, [call, dispatch]); // Dependencies to re-run the effect when 'call' or 'dispatch' changes

  const handleCallToggle = (newCallState) => {
    console.log("presssss", newCallState);
    setCall(newCallState);  
  };

  const [formData, setFormData] = useState({
    section: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    onclickhandler(); 
  }

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, 
    }));
  }

  async function onclickhandler() {
    console.log("Inside onclick");

    const data = {
      ...formData,
      courseid: courseId, 
    };
    console.log("data", data);

    dispatch(CreateBuilder(data))
      .then((response) => {
        const sectionDetails = response.data.data;
        setSections((prevSections) => [...prevSections, sectionDetails]);
        console.log("Section Created Successfully:", sectionDetails);
      })
      .catch((error) => {
        console.error("Error creating section:", error);
      });
  }

  return (
    <div className="p-4 space-y-2 rounded-lg">
      <form onSubmit={handleSubmit}>
        <p className="text-[28px] font-mono bold">Course Builder</p>
        <label className="w-full mt-3">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Section name
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            required
            value={formData.section}
            placeholder="Add a section to build your Course"
            onChange={changeHandler}
            name="section"
            className="bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5"
          />
        </label>
        <button
          type="submit" 
          className="border-solid border-2 border-yellow-500 text-yellow-500 text-[17px] items-center gap-x-2 flex text-white px-4 py-3 rounded-lg mt-4"
        >
          Create Section <IoIosAddCircleOutline size={20} />
        </button>
      </form>

      {sections.length === 0 ? (
        ""
      ) : (
        sections.map((sec, index) => (
          <LeatureAdd 
            key={index} 
            currentCallState={call} 
            onCallToggle={handleCallToggle}  
            sectionName={sec.sectionName} 
            sectionid={sec._id} 
          />
        ))
      )}
    </div>
  );
}
