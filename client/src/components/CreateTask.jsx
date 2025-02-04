import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const CreateTask = () => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "low", // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // POST request to localhost:8080/task
      const response = await axios.post("http://localhost:8080/task", task);
      console.log("Task Submitted:", response.data);
      // Clear form fields after successful submission
      setTask({
        name: "",
        description: "",
        dueDate: "",
        priority: "low",
      });
      Navigate('/')
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className=" max-w-md w-full h-fulla py-4 mt-10 max-h-[700px] px-6  mx-auto bg-[#eaf2d7]  rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
            Name of Task
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-600 font-medium mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-600 font-medium mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
