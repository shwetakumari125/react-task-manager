import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="mx-6 flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">Task Manager</h1>
        <nav>
          <Link to="/tasks" className="mr-4 text-sm hover:text-indigo-600">Tasks</Link>
          <Link to="/tasks/new" className="text-sm bg-indigo-600 text-white px-3 py-2.5 rounded hover:bg-indigo-700">Create Task</Link>
        </nav>
      </div>
    </header>
  );
}
