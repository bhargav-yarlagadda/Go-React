import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./components/TaskCard";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/");
        console.log(response)
        setTasks(response.data); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className="text-gray-600">No tasks found.</p>
      )}
    </div>
  );
};

export default App;
