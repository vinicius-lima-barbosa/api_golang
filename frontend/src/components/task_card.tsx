import { useNavigate } from "react-router-dom";
import { DeleteTaskApi } from "../api/delete_task";
import { TaskType } from "../types/task_type";
import { FaCheck, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { UpdateTaskApi } from "../api/update_task";

interface TaskProps {
  task: TaskType;
}

export default function TaskCard({ task }: TaskProps) {
  const navigate = useNavigate();

  const handleCompleteTask = async () => {
    try {
      const response = UpdateTaskApi(!task.isCompleted, task.id);

      if (!response) {
        alert("Failed to complete task");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = DeleteTaskApi(task.id);
      if (!response) {
        alert("Failed to delete task");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col border w-96 rounded-xl shadow-lg p-2 mb-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">{task.title}</h1>
        <div className="flex justify-center items-center gap-2">
          <button
            className={`${
              task.isCompleted ? "bg-gray-500" : "bg-green-500"
            } hover:bg-green-700 transition-all duration-200 text-white font-semibold p-2 rounded-lg shadow-lg`}
            onClick={handleCompleteTask}
          >
            <FaCheck />
          </button>
          <button
            className="transition-all duration-200 text-white font-semibold p-2 rounded-lg shadow-lg bg-blue-500 hover:bg-blue-700"
            onClick={() => navigate(`/edit/${task.id}`)}
          >
            <FaRegEdit />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 transition-all duration-200 text-white font-semibold p-2 rounded-lg shadow-lg"
            onClick={handleDeleteTask}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      <p className="text-slate-800 text-justify break-words">
        {task.description}
      </p>
    </div>
  );
}
