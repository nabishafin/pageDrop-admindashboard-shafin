import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-[#E32B6B] to-[#FB4A3A] h-screen text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-lg text-white bg-black px-6 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
