export async function ListTaskApi() {
  const response = await fetch("http://localhost:8080/tasks");
  if (!response.ok) throw new Error("Failed to fetch tasks");

  return await response.json();
}
