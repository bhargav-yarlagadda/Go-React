import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleInsertTask = () => {
    navigate("/new-task"); // Navigate to the Create Task page
  };

  return (
    <div className="bg-black text-white w-full max-w-full flex justify-between items-center px-6 py-4 shadow-xl">
      {/* Logo on the left */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer tracking-wider transition duration-300 ease-in-out hover:text-gray-300"
      >
        TaskBar
      </div>

      {/* Button on the right to navigate to Insert Task page */}
      <button
        onClick={handleInsertTask}
        className="bg-teal-500 text-white py-2 px-5 rounded-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105"
      >
        Insert Task
      </button>
    </div>
  );
};

export default Navbar;
