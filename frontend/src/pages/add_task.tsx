import { useState } from "react";
import { AddTaskApi } from "../api/add_task";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: taskTitle,
      description: taskDescription,
    };

    try {
      const response = await AddTaskApi(data);

      if (response) {
        navigate("/");
        window.location.reload();
      } else {
        setError("An error occurred while adding task");
      }
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while adding task");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-5 text-center text-gray-700">
          Add Task
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-3">
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium text-gray-700 ml-1"
            >
              Task Name
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-black"
              placeholder="type your task name"
              id="taskTitle"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-gray-700 ml-1"
            >
              Task Description
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-black"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="type your task description"
              id="taskDescription"
              rows={3}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 transition-all duration-200 p-2 rounded-md shadow-lg text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
