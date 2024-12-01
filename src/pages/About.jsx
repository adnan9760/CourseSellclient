import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    // TODO: Replace this with your form submission logic
    alert("Your message has been sent successfully!");

    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-richblack-900 to-richblack-800 text-gray-200 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-richblack-700 p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-yellow-500 text-center mb-8">
          Contact Us
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Have questions or feedback? We'd love to hear from you! Fill out the form below, and we’ll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-richblack-600 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="Enter your full name"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-richblack-600 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="Enter your email"
            />
          </div>
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-4 bg-richblack-600 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="Enter the subject"
            />
          </div>
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-4 bg-richblack-600 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="Enter your message"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition duration-300"
          >
            Send Message
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-8">
          © 2024 Studynotion. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
