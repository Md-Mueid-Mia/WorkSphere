

import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="space-y-6">
          {/* Error Code */}
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            404
          </h1>

          {/* Error Image */}
          <div className="relative w-48 h-48 mx-auto">
            <img 
              src="https://i.ibb.co.com/dmmCnKq/Main-Scene.gif" 
              alt="Error Illustration" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 hover:shadow-lg"
          >
            <FaHome className="text-xl" />
            <span>Back to Home</span>
          </Link>

          {/* Additional Help Text */}
          <p className="text-sm text-gray-500 mt-4">
            If you think this is a mistake, please contact support
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default ErrorPage;