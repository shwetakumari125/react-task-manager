import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import Header from "./components/Header";

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-6 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/new" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<EditTaskPage />} />
        </Routes>
      </main>
    </div>
  );
}
