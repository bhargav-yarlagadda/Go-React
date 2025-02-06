import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import Navbar from "./components/Navbar";
import EditTask from "./components/EditTask";

const App = () => {
  return (
    <div className="w-full h-screen  flex flex-col justify-start items-center overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/new-task" element={<CreateTask />} />
        <Route path='/edit-task/:id' element={<EditTask/>}/>


      </Routes>
    </div>
  );
};

export default App;
