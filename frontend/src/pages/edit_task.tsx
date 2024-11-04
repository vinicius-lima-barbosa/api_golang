import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditTaskApi } from "../api/edit_task";
import { ListTaskByIdApi } from "../api/list_task_by_id";

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      if (!id) {
        throw new Error("ID is undefined");
      }

      const response = await ListTaskByIdApi(id);
      console.log(response);
      setNewTitle(response.title);
      setNewDescription(response.description);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch task");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: newTitle,
      description: newDescription,
    };

    try {
      if (!id) {
        throw new Error("ID is undefined");
      }

      await EditTaskApi(id, data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to edit task");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-5 text-center text-gray-700">
          Edit Task
        </h1>
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
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-black"
              placeholder="Edit your task name"
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
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Edit your task description"
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
