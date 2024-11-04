export async function ListTaskByIdApi(id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}`);
  return await response.json();
}
