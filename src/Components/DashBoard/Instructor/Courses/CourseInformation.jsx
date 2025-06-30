import React, { useEffect, useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { BsCloudUpload } from "react-icons/bs";
import { useSelector } from "react-redux";
import apiconnector from "../../../../services/apiconnector";
import { catagories } from "../../../../services/apis";
import { setStep } from "../../../../reducer/slices/courseSlice";
import { useDispatch } from "react-redux";
import { CreateCourse } from "../../../../services/operation/authapi";
import { useNavigate } from "react-router-dom";
export default function CourseInformation() {
  const initialFormData = {
    title: "",
    description: "",
    price: 0,
    category: "",
    tags: [],
    image: "",
    courseBenefit: "",
  };
  
  const navigate = useNavigate();
  const { editcourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [reqValue, setReqValue] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [requirement, setRequirement] = useState([]);
  const [category, setcategory] = useState([]);
  const [isFormUpdated, setIsFormUpdated] = useState(false);
  useEffect(() => {
    const formIsUpdated =
      JSON.stringify(formData) !== JSON.stringify(initialFormData);
    setIsFormUpdated(formIsUpdated);
  }, [formData]);
  useEffect(() => {
    const fetchSublink = async () => {
      try {
        const result = await apiconnector("GET", catagories.CATAGORIES_API);
        console.log(result.data.data);
        setcategory(result.data.data);
      } catch (error) {
        console.log("Could not fetch the category List");
      }
    };

    fetchSublink();
  }, []);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };
 function IsformUpdated(){
  
 }
  const handleKeyDownForReq = (e) => {
    if (e.key === "Enter" && reqValue.trim()) {
      e.preventDefault();
      if (!requirement.includes(reqValue.trim())) {
        setRequirement([...requirement, reqValue.trim()]);
        setReqValue("");
      }
    }
  };
   function onsubmit(){
    if(!isFormUpdated){
      alert("Please fill all the fields");
      return;
    }  
  }
  const handleRemoveImage = () => {
    setPreviewImage("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleReqRemove = (reqToRemove) => {
    setRequirement(requirement.filter((req) => req !== reqToRemove));
  };
useEffect(()=>{
  const saved = JSON.parse(localStorage.getItem('formData'));
  if(saved){
    setFormData(saved);
  }
},[])
useEffect(() => {
  localStorage.setItem("formData", JSON.stringify(formData));
}, [formData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
const coursedata = {
    ...formData
};

console.log("Coursedata",coursedata);
    try {
      const data =  await dispatch(CreateCourse(coursedata));
      navigate("/dashboard/add-course?courseid="+data.data.data._id +"&courseName=" + data.data.data.title)
      console.log("couese data id",data.data.data._id)
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  

  return (
    <div className="p-4 space-y-2 rounded-lg">
      <form onSubmit={handleSubmit}>
        <label className="w-full mt-3">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Course Title
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            required
            value={formData.title}
            placeholder="Enter Course Title"
            onChange={changeHandler}
            name="title"
            className="bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5"
          />
        </label>

        <label className="w-full mt-3">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Course Short Description
            <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            required
            rows={4}
            value={formData.description}
            placeholder="Enter Description"
            onChange={changeHandler}
            name="description"
            className="bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5"
          />
        </label>

        <label className="w-full mt-3">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Price
            <sup className="text-pink-200">*</sup>
          </p>
          <div className="relative">
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-5" />
            <input
              type="number"
              required
              value={formData.price}
              placeholder="Enter Price"
              onChange={changeHandler}
              name="price"
              className="bg-richblack-800  rounded-[0.3rem] w-full p-[12px] pl-3 text-richblack-5"
            />
          </div>
        </label>

        <label className="w-full mt-3">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Category
            <sup className="text-pink-200">*</sup>
          </p>
          <select
            required
            name="category"
            onChange={changeHandler}
            value={formData.category}
            className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5"
          >
            <option value="" disabled>
              Select Category
            </option>
            {category.map((subcategory, index) => (
              <option key={index} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </label>

        <div className="w-full mt-3">
          <p className="text-sm text-white font-medium flex items-center">
            Tags
            <sup className="text-pink-400 ml-1">*</sup>
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-yellow-100 text-gray-800 flex items-center px-3 py-1 rounded-full text-sm relative"
              >
                {tag}
                <button
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 text-gray-600 hover:text-gray-900"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag and press Enter"
            className="bg-richblack-800 rounded-lg w-full p-[12px] text-gray-300 focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>

        <label className="w-full mt-3">
          <p className="text-sm text-white font-medium flex items-center">
            Course Thumbnail
            <sup className="text-pink-400 ml-1">*</sup>
          </p>
          <div
            className="border-2 mt-3 h-[250px] bg-richblack-800 border-dashed border-richblack-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()} // Prevent default behavior for drag-over
          >
            {previewImage ? (
              <div className="relative w-full h-auto">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                <p className="text-lg font-medium mb-2">
                  <BsCloudUpload size={30} className="text-yellow-50 mx-auto" />
                  Drag & Drop or Click to Upload
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
              </div>
            )}
          </div>
        </label>

        <label className="w-full mt-3">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Course Benefit
            <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            type="text"
            required
            rows={4}
            value={formData.courseBenefit}
            placeholder="Enter Course Benefit"
            onChange={changeHandler}
            name="courseBenefit"
            className="bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5"
          />
        </label>

        <div className="w-full mt-3">
          <p className="text-sm text-white font-medium flex items-center">
            Requirements
            <sup className="text-pink-400 ml-1">*</sup>
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {requirement.map((req, index) => (
              <div
                key={index}
                className="bg-yellow-100 text-gray-800 flex items-center px-3 py-1 rounded-full text-sm relative"
              >
                {req}
                <button
                  onClick={() => handleReqRemove(req)}
                  className="ml-2 text-gray-600 hover:text-gray-900"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={reqValue}
            onChange={(e) => setReqValue(e.target.value)}
            onKeyDown={handleKeyDownForReq}
            placeholder="Add a requirement and press Enter"
            className="bg-richblack-800 rounded-lg w-full p-[12px] text-gray-300 focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>
        <div className="flex justify-end gap-x-9 ">
          {editcourse && (
            <div className="justify-end grid">
              <button
                onClick={() => {
                  dispatch(setStep(2));
                }}
                className="border-richblack-200 shadow-white shadow-lg text-white px-4 py-2 rounded-lg mt-4 hover:text-[15px] "
              >
                Continue without Saving
              </button>
            </div>
          )}

          {!editcourse ? (
            <div className="justify-end grid">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600 "
              >
                Next
              </button>
            </div>
          ) : (
            <div className="justify-end grid">
              <button
              onClick={onsubmit}
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

