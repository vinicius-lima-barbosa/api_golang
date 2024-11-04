export async function DeleteTaskApi(taskId: string) {
  const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");

  return await response.json();
}
