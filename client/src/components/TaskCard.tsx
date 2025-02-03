import React, { useState } from "react";

const TaskCard = ({ task }) => {
  const [priority, setPriority] = useState(task.priority);
  const [isActive, setIsActive] = useState(task.isActive);

  // Limit description to 100 characters
  const truncatedDesc =
    task.desc.length > 100 ? task.desc.slice(0, 100) + "..." : task.desc;

  return (
    <div
      className={`rounded-xl bg-yellow-50 p-5 py-10 w-72 border border-gray-300 shadow-lg backdrop-blur-lg transition-all duration-300 ${
        isActive ? "hover:shadow-2xl" : "opacity-80"
      }`}
    >
      {/* Task Title & Description */}
      <h2 className="text-lg font-bold text-gray-900 tracking-wide">
        {task.name}
      </h2>
      <p className="text-sm text-gray-700 h-4 mt-1 leading-tight">{truncatedDesc}</p>

      {/* Status Dropdown */}
      <div className="mt-3 w-1/2">
        <label className="text-sm  font-semibold  text-gray-800">Status:</label>
        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value === "true")}
          className="w-full mt-1 p-2 text-sm border bg-sky-50 border-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 focus:outline-none"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Task Details */}
      <div className="mt-3 text-sm  text-gray-600 space-y-1">
        <p>🗓 Created: {new Date(task.createdAt).toLocaleDateString()}</p>
        <p>🔄 Last Updated: {new Date(task.updatedAt).toLocaleDateString()}</p>
        <p>⏳ Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>

      {/* Priority Selection */}
      <div className="mt-4 flex justify-between">
        {["low", "medium", "high"].map((level) => (
          <button
            key={level}
            onClick={() => setPriority(level)}
            className={`px-4 py-2 text-sm font-semibold rounded-full border border-gray-700 transition-all duration-300 ${
              priority == level
                ? "text-white bg-black shadow-lg"
                : "text-gray-900 hover:bg-gray-900 hover:text-white"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
