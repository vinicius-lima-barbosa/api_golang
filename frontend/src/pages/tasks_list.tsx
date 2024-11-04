import { useEffect, useState } from "react";
import TaskCard from "../components/task_card";
import { ListTaskApi } from "../api/list_task";
import { TaskType } from "../types/task_type";

export default function TasksList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskData = await ListTaskApi();
      setTasks(taskData || []);
    };

    getTasks();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 m-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
