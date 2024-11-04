export async function UpdateTaskApi(isComleted: boolean, id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isCompleted: isComleted }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return await response.json();
}
