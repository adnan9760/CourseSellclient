import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-richblack-900 text-white min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">About Us</h1>
          <p className="text-lg text-gray-300">
            At <span className="font-semibold text-white">SkillShareHub</span>, we believe in the power of education. 
            Our mission is to make learning accessible, engaging, and impactful for everyone.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 shadow-lg p-6 rounded-lg text-center">
            <h2 className="text-4xl font-bold text-yellow-400">10M+</h2>
            <p className="text-gray-400">Learners Worldwide</p>
          </div>
          <div className="bg-gray-800 shadow-lg p-6 rounded-lg text-center">
            <h2 className="text-4xl font-bold text-yellow-400">200K+</h2>
            <p className="text-gray-400">Courses Available</p>
          </div>
          <div className="bg-gray-800 shadow-lg p-6 rounded-lg text-center">
            <h2 className="text-4xl font-bold text-yellow-400">50K+</h2>
            <p className="text-gray-400">Expert Instructors</p>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Our Vision</h2>
          <p className="text-gray-300 mb-6">
            To revolutionize education by providing affordable and accessible learning opportunities for everyone.
          </p>
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Our Mission</h2>
          <p className="text-gray-300">
            We connect learners with the best instructors worldwide, fostering growth and success in every field.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">Join Our Community</h2>
          <p className="text-gray-300 text-lg mb-6">
            Begin your learning journey today and unlock your true potential.
          </p>
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full shadow-lg hover:bg-emerald-400 transition">
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
