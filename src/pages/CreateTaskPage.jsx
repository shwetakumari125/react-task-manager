import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";
import { addTaskAsync, fetchTasksAsync } from "../features/tasks/tasksSlice";

export default function CreateTaskPage(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(s => s.tasks.items);

  async function handleCreate(data){
    const maxOrder = tasks.length ? Math.max(...tasks.map(t=>t.order ?? 0)) : -1;
    const payload = { ...data, order: maxOrder + 1 };
    await dispatch(addTaskAsync(payload)).unwrap();
    dispatch(fetchTasksAsync());
    navigate("/tasks");
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
      <TaskForm onSubmit={handleCreate} submitLabel="Create" />
    </div>
  );
}
