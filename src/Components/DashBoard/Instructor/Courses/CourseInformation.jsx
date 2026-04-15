import React, { useEffect, useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { BsCloudUpload } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import apiconnector from "../../../../services/apiconnector";
import { catagories } from "../../../../services/apis";
import { setStep } from "../../../../reducer/slices/courseSlice";
import { CreateCourse } from "../../../../services/operation/authapi";
import { useNavigate } from "react-router-dom";

// ─── Validation rules ────────────────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_SIZE_MB = 5;

function validateField(name, value, extras = {}) {
  switch (name) {
    case "title":
      if (!value.trim()) return "Course title is required.";
      if (value.trim().length < 5) return "Title must be at least 5 characters.";
      if (value.trim().length > 100) return "Title must be under 100 characters.";
      return "";

    case "description":
      if (!value.trim()) return "Description is required.";
      if (value.trim().length < 20) return "Description must be at least 20 characters.";
      if (value.trim().length > 500) return "Description must be under 500 characters.";
      return "";

    case "price":
      if (value === "" || value === null) return "Price is required.";
      if (isNaN(value) || Number(value) < 0) return "Price must be a non-negative number.";
      if (Number(value) > 100000) return "Price seems too high. Max ₹1,00,000.";
      return "";

    case "category":
      if (!value) return "Please select a category.";
      return "";

    case "tags":
      if (!extras.tags || extras.tags.length === 0) return "Add at least one tag.";
      return "";

    case "image":
      if (!value) return "Please upload a course thumbnail.";
      return "";

    case "courseBenefit":
      if (!value.trim()) return "Course benefit is required.";
      if (value.trim().length < 10) return "Describe at least one benefit (min 10 characters).";
      if (value.trim().length > 300) return "Benefits must be under 300 characters.";
      return "";

    case "requirements":
      if (!extras.requirements || extras.requirements.length === 0)
        return "Add at least one requirement.";
      return "";

    default:
      return "";
  }
}

function validateAll(formData, tags, requirements) {
  return {
    title: validateField("title", formData.title),
    description: validateField("description", formData.description),
    price: validateField("price", formData.price),
    category: validateField("category", formData.category),
    tags: validateField("tags", "", { tags }),
    image: validateField("image", formData.image),
    courseBenefit: validateField("courseBenefit", formData.courseBenefit),
    requirements: validateField("requirements", "", { requirements }),
  };
}

// ─── Error message component ──────────────────────────────────────────────────
function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="text-pink-300 text-xs mt-1 flex items-center gap-1">
      <span>⚠</span> {message}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Restore from localStorage ──────────────────────────────────────────────
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("formData"));
    if (saved) setFormData(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // ── Fetch categories ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchSublink = async () => {
      try {
        const result = await apiconnector("GET", catagories.CATAGORIES_API);
        setcategory(result.data.data);
      } catch (error) {
        console.log("Could not fetch the category list");
      }
    };
    fetchSublink();
  }, []);

  // ── Re-validate tags/requirements whenever they change ────────────────────
  useEffect(() => {
    if (touched.tags) {
      setErrors((prev) => ({ ...prev, tags: validateField("tags", "", { tags }) }));
    }
  }, [tags, touched.tags]);

  useEffect(() => {
    if (touched.requirements) {
      setErrors((prev) => ({
        ...prev,
        requirements: validateField("requirements", "", { requirements: requirement }),
      }));
    }
  }, [requirement, touched.requirements]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const blurHandler = (name, value) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateImageFile = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type))
      return "Only JPG, PNG, WebP, or GIF images are allowed.";
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024)
      return `Image must be under ${MAX_IMAGE_SIZE_MB}MB.`;
    return "";
  };

  const applyImage = (file) => {
    const imgError = validateImageFile(file);
    setTouched((prev) => ({ ...prev, image: true }));
    if (imgError) {
      setErrors((prev) => ({ ...prev, image: imgError }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setErrors((prev) => ({ ...prev, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) applyImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) applyImage(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setFormData((prev) => ({ ...prev, image: "" }));
    setTouched((prev) => ({ ...prev, image: true }));
    setErrors((prev) => ({ ...prev, image: "Please upload a course thumbnail." }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed.length > 30) {
        setErrors((prev) => ({ ...prev, tags: "Each tag must be under 30 characters." }));
        return;
      }
      if (tags.length >= 10) {
        setErrors((prev) => ({ ...prev, tags: "Maximum 10 tags allowed." }));
        return;
      }
      if (!tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTouched((prev) => ({ ...prev, tags: true }));
      }
      setInputValue("");
    }
  };

  const handleKeyDownForReq = (e) => {
    if (e.key === "Enter" && reqValue.trim()) {
      e.preventDefault();
      const trimmed = reqValue.trim();
      if (trimmed.length > 100) {
        setErrors((prev) => ({
          ...prev,
          requirements: "Each requirement must be under 100 characters.",
        }));
        return;
      }
      if (requirement.length >= 15) {
        setErrors((prev) => ({
          ...prev,
          requirements: "Maximum 15 requirements allowed.",
        }));
        return;
      }
      if (!requirement.includes(trimmed)) {
        setRequirement([...requirement, trimmed]);
        setTouched((prev) => ({ ...prev, requirements: true }));
      }
      setReqValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
    setTouched((prev) => ({ ...prev, tags: true }));
  };

  const handleReqRemove = (reqToRemove) => {
    setRequirement(requirement.filter((r) => r !== reqToRemove));
    setTouched((prev) => ({ ...prev, requirements: true }));
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark everything as touched so errors show up
    setTouched({
      title: true,
      description: true,
      price: true,
      category: true,
      tags: true,
      image: true,
      courseBenefit: true,
      requirements: true,
    });

    const newErrors = validateAll(formData, tags, requirement);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) return;

    setIsSubmitting(true);
    try {
      const coursedata = { ...formData, tags, requirements: requirement };
      const data = await dispatch(CreateCourse(coursedata));
      navigate(
        "/dashboard/add-course?courseid=" +
          data.data.data._id +
          "&courseName=" +
          data.data.data.title
      );
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = validateAll(formData, tags, requirement);
    setErrors(newErrors);
    setTouched({
      title: true, description: true, price: true, category: true,
      tags: true, image: true, courseBenefit: true, requirements: true,
    });
    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) return;
    handleSubmit(e);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="p-4 space-y-2 rounded-lg">
      <form onSubmit={handleSubmit} noValidate>

        {/* Course Title */}
        <label className="w-full mt-3 block">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Course Title <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            value={formData.title}
            placeholder="Enter Course Title"
            onChange={changeHandler}
            onBlur={() => blurHandler("title", formData.title)}
            name="title"
            className={`bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5 border ${
              errors.title ? "border-pink-400" : "border-transparent"
            }`}
          />
          <FieldError message={errors.title} />
        </label>

        {/* Description */}
        <label className="w-full mt-3 block">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Course Short Description <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows={4}
            value={formData.description}
            placeholder="Enter Description"
            onChange={changeHandler}
            onBlur={() => blurHandler("description", formData.description)}
            name="description"
            className={`bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5 border ${
              errors.description ? "border-pink-400" : "border-transparent"
            }`}
          />
          <div className="flex justify-between">
            <FieldError message={errors.description} />
            <span className={`text-xs mt-1 ${formData.description.length > 500 ? "text-pink-400" : "text-richblack-400"}`}>
              {formData.description.length}/500
            </span>
          </div>
        </label>

        {/* Price */}
        <label className="w-full mt-3 block">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Price <sup className="text-pink-200">*</sup>
          </p>
          <div className="relative">
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-5" />
            <input
              type="number"
              value={formData.price}
              placeholder="Enter Price"
              onChange={changeHandler}
              onBlur={() => blurHandler("price", formData.price)}
              name="price"
              min="0"
              className={`bg-richblack-800 rounded-[0.3rem] w-full p-[12px] pl-8 text-richblack-5 border ${
                errors.price ? "border-pink-400" : "border-transparent"
              }`}
            />
          </div>
          <FieldError message={errors.price} />
        </label>

        {/* Category */}
        <label className="w-full mt-3 block">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Category <sup className="text-pink-200">*</sup>
          </p>
          <select
            name="category"
            onChange={changeHandler}
            onBlur={() => blurHandler("category", formData.category)}
            value={formData.category}
            className={`bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5 border ${
              errors.category ? "border-pink-400" : "border-transparent"
            }`}
          >
            <option value="" disabled>Select Category</option>
            {category.map((subcategory, index) => (
              <option key={index} value={subcategory.id}>{subcategory.name}</option>
            ))}
            <option value="other">Other</option>
          </select>
          <FieldError message={errors.category} />
        </label>

        {/* Tags */}
        <div className="w-full mt-3">
          <p className="text-sm text-white font-medium flex items-center">
            Tags <sup className="text-pink-400 ml-1">*</sup>
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div key={index} className="bg-yellow-100 text-gray-800 flex items-center px-3 py-1 rounded-full text-sm">
                {tag}
                <button type="button" onClick={() => handleTagRemove(tag)} className="ml-2 text-gray-600 hover:text-gray-900">
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => blurHandler("tags", "", { tags })}
            placeholder="Add a tag and press Enter"
            className={`bg-richblack-800 rounded-lg w-full p-[12px] text-gray-300 focus:outline-none focus:ring-1 focus:ring-white border ${
              errors.tags ? "border-pink-400" : "border-transparent"
            }`}
          />
          <div className="flex justify-between">
            <FieldError message={errors.tags} />
            <span className="text-xs text-richblack-400 mt-1">{tags.length}/10</span>
          </div>
        </div>

        {/* Thumbnail */}
        <label className="w-full mt-3 block">
          <p className="text-sm text-white font-medium flex items-center">
            Course Thumbnail <sup className="text-pink-400 ml-1">*</sup>
          </p>
          <div
            className={`border-2 mt-3 h-[250px] bg-richblack-800 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer ${
              errors.image ? "border-pink-400" : "border-richblack-200"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !previewImage && document.getElementById("imageUpload").click()}
          >
            {previewImage ? (
              <div className="relative w-full h-full">
                <img src={previewImage} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                <BsCloudUpload size={30} className="text-yellow-50 mx-auto mb-2" />
                <p className="text-sm">Drag & Drop or Click to Upload</p>
                <p className="text-xs mt-1 text-richblack-400">JPG, PNG, WebP, GIF · Max {MAX_IMAGE_SIZE_MB}MB</p>
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
          <FieldError message={errors.image} />
        </label>

        {/* Course Benefit */}
        <label className="w-full mt-3 block">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Course Benefit <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows={4}
            value={formData.courseBenefit}
            placeholder="Enter Course Benefit"
            onChange={changeHandler}
            onBlur={() => blurHandler("courseBenefit", formData.courseBenefit)}
            name="courseBenefit"
            className={`bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5 border ${
              errors.courseBenefit ? "border-pink-400" : "border-transparent"
            }`}
          />
          <div className="flex justify-between">
            <FieldError message={errors.courseBenefit} />
            <span className={`text-xs mt-1 ${formData.courseBenefit.length > 300 ? "text-pink-400" : "text-richblack-400"}`}>
              {formData.courseBenefit.length}/300
            </span>
          </div>
        </label>

        {/* Requirements */}
        <div className="w-full mt-3">
          <p className="text-sm text-white font-medium flex items-center">
            Requirements <sup className="text-pink-400 ml-1">*</sup>
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {requirement.map((req, index) => (
              <div key={index} className="bg-yellow-100 text-gray-800 flex items-center px-3 py-1 rounded-full text-sm">
                {req}
                <button type="button" onClick={() => handleReqRemove(req)} className="ml-2 text-gray-600 hover:text-gray-900">
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
            onBlur={() => blurHandler("requirements", "", { requirements: requirement })}
            placeholder="Add a requirement and press Enter"
            className={`bg-richblack-800 rounded-lg w-full p-[12px] text-gray-300 focus:outline-none focus:ring-1 focus:ring-white border ${
              errors.requirements ? "border-pink-400" : "border-transparent"
            }`}
          />
          <div className="flex justify-between">
            <FieldError message={errors.requirements} />
            <span className="text-xs text-richblack-400 mt-1">{requirement.length}/15</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-x-9">
          {editcourse && (
            <button
              type="button"
              onClick={() => dispatch(setStep(2))}
              className="border-richblack-200 shadow-white shadow-lg text-white px-4 py-2 rounded-lg mt-4 hover:text-[15px]"
            >
              Continue without Saving
            </button>
          )}

          {!editcourse ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Next"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
