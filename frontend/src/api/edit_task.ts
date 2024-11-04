export async function EditTaskApi(
  id: string,
  data: { title: string; description: string }
) {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to edit task");
  }

  return await response.json();
}
