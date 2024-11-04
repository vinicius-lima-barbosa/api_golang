import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./Layout.tsx";
import TasksList from "./pages/tasks_list.tsx";
import AddTask from "./pages/add_task.tsx";
import EditTask from "./pages/edit_task.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </Layout>
    </Router>
  </StrictMode>
);
