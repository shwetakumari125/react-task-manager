import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../components/TaskForm";
import { updateTaskAsync, fetchTasksAsync, toggleStatusLocal } from "../features/tasks/tasksSlice";

export default function EditTaskPage(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector(s => s.tasks.items.find(t => String(t.id) === String(id)));
  const [ready, setReady] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(task?.status);

  useEffect(()=> {
    if(!task) {
      dispatch(fetchTasksAsync()).then(()=> setReady(true));
    } else {
      setReady(true);
      setCurrentStatus(task.status);
    }
  }, [task, dispatch]);

  if(!ready) return <div>Loading task...</div>;
  if(!task) return <div>Task not found</div>;

  function handleToggleStatus() {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    setCurrentStatus(newStatus);
  }

  async function handleUpdate(data){
    const updatedData = {
      ...task,
      ...data,
      status: currentStatus 
    };
    
    await dispatch(updateTaskAsync({ 
      id: task.id, 
      data: updatedData
    })).unwrap();
    await dispatch(fetchTasksAsync());
    navigate("/tasks");
  }

  function handleToggleStatus(){
    dispatch(toggleStatusLocal(task.id));
  }

  return (
    <div>
  <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>

  <div className="mb-4 flex items-center justify-end gap-3">
    <span
      className={`text-sm font-medium ${
        task.status === "Completed" ? "text-green-600" : "text-yellow-600"
      }`}
    >
      {task.status}
    </span>

    <button
      onClick={handleToggleStatus}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${
        task.status === "Completed" ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
          task.status === "Completed" ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>

  <TaskForm
    initial={task}
    onSubmit={handleUpdate}
    submitLabel="Save"
    showStatus={false}
  />
</div>

  );
}
