export async function AddTaskApi(dataBody: {
  title: string;
  description: string;
}) {
  try {
    const response = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while adding task");
  }
}
