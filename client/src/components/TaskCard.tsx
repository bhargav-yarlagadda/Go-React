import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const TaskCard = ({ task }) => {
  const [priority, setPriority] = useState(task.priority);
  const [isActive, setIsActive] = useState(task.isActive);
    const navigator = useNavigate()
  // Limit description to 100 characters
  const truncatedDesc =
    task.desc.length > 100 ? task.desc.slice(0, 100) + "..." : task.desc;

  return (
    <div
      className={`rounded-xl bg-[#ffd6ff] max-h-[400px] p-5 py-10 w-72 border border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform ${
        isActive ? "hover:border-indigo-500" : "opacity-75"
      }`}
    >
      {/* Task Title & Description */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{task.name}</h2>
      <p className="text-sm text-gray-700 mt-1 leading-tight mb-4">{truncatedDesc || "no desc available" } </p>

      {/* Status Dropdown */}
      <div className="mt-4 w-full">
        <label className="text-sm font-medium text-gray-700 mb-1">Status:</label>
        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value === "true")}
          className="w-full mt-1 p-2 text-sm text-gray-800 border bg-gray-50 border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        >
          <option value={isActive}>{isActive ?"Active":"Inactive"}</option>
        
        </select>
      </div>

      {/* Task Details */}
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>🗓 Created: {new Date(task.createdAt).toLocaleDateString()}</p>
        <p>🔄 Last Updated: {new Date(task.updatedAt).toLocaleDateString()}</p>
        <p>⏳ Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>

      {/* Priority Selection */}
      <div className="mt-6  flex justify-between gap-2">
        {["low", "normal", "high"].map((level) => (
          <button
            key={level}
            onClick={() => setPriority(level)}
            className={`px-4 cursor-pointer py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              priority === level
                ? "text-white bg-indigo-600 shadow-md hover:shadow-xl"
                : "text-gray-800 border border-gray-400 hover:bg-indigo-200 hover:text-indigo-800"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
      <button className="bg-blue-600 rounded-md w-full  mt-4 text-white py-1 text-xl" onClick={()=>{navigator(`/edit-task/${task._id}`)}} >Edit</button>
    </div>
  );
};

export default TaskCard;
