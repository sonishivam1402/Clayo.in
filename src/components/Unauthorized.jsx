import React from 'react';
import { Link } from 'react-router-dom';
import { BsShieldFillExclamation } from "react-icons/bs";

const Unauthorized = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <BsShieldFillExclamation className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
