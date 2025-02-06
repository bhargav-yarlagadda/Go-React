import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
  const { id } = useParams(); // Get task id from the URL
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    name: '',
    desc: '',
    priority: 'low',
    isActive: true,
    dueDate: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch task data when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/task/${id}`);
        const task = response.data;
        setTaskData({
          name: task.name,
          desc: task.desc,
          priority: task.priority,
          isActive: task.isActive,
          dueDate: task.dueDate,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to fetch task');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updated task object with ID in the body
    const updatedTask = {
      id: id,  // Use the id from URL parameters
      name: taskData.name,
      desc: taskData.desc,
      priority: taskData.priority,
      isActive: taskData.isActive,
      dueDate: taskData.dueDate,
    };

    try {
      // Send PUT request to update the task
      const response = await axios.put(`http://localhost:8080/task`, updatedTask);

      if (response.status === 200) {
        navigate('/'); // Navigate back after successful update
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
    }
  };

  // Loading and error states
  if (loading) {
    return <p>Loading task...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            name="name"
            value={taskData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            name="desc"
            value={taskData.desc}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Status</label>
          <select
            name="isActive"
            value={taskData.isActive}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
