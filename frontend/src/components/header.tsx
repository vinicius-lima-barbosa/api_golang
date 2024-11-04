import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-around items-center bg-slate-200 p-4">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        My Task
      </h1>

      <button
        onClick={() => navigate("/add")}
        className="ml-4 bg-green-600 hover:bg-green-700 transition-all duration-200  text-white px-2 py-1 rounded font-semibold"
      >
        Add Task
      </button>
    </header>
  );
}
