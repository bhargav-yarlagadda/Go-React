import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";


const TaskList = () => {
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
    <div className="h-full w-full "> 
   
    <div className="p-6 grid grid-cols-1 md:py-10 h-full w-full overflow-y-scroll bg-[#eed7c5] sm:grid-cols-2 lg:grid-cols-4 gap-3" style={{scrollbarWidth:"none"}}>
      {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
            <p className="text-gray-600">No tasks found.</p>
        )}
    </div>
    </div>
  );
};

export default TaskList;
