import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksAsync,
  reorderLocal,
  deleteTaskAsync,
} from "../features/tasks/tasksSlice";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const filtered = items.filter((t) =>
    filter === "All" ? true : t.status === filter
  );

  async function onDragEnd(result) {
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    const reordered = Array.from(filtered);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const updatedTasks = reordered.map((task, index) => ({
      ...task,
      order: index + 1,
    }));

    // Update UI instantly
    dispatch(reorderLocal(updatedTasks));

    try {
      await Promise.all(
        updatedTasks.map((task) =>
          axios.put(`http://localhost:3001/tasks/${task.id}`, task)
        )
      );
      console.log("✅ Order saved to backend");
    } catch (err) {
      console.error("❌ Failed to save new order:", err);
      dispatch(fetchTasksAsync());
    }
  }

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <div>
          <label className="mr-2 text-sm font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Drag and Drop Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="taskTable">
            {(provided) => (
              <table
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-w-full border-collapse text-sm text-left"
              >
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3 w-10"></th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Due Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(providedDraggable) => (
                        <tr
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          style={providedDraggable.draggableProps.style}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3 text-gray-400 text-lg cursor-grab">⋮</td>

                          <td className="px-4 py-3 font-medium">
                            {task.status === "Completed" ? (
                              <span className="line-through text-gray-400">{task.title}</span>
                            ) : (
                              task.title
                            )}
                          </td>

                          <td className="px-4 py-3 text-gray-600">{task.description}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                task.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{task.dueDate}</td>

                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center gap-3 justify-end">

                              <Link
                                to={`/tasks/${task.id}`}
                                className="text-indigo-600 text-sm hover:underline"
                              >
                                Edit
                              </Link>

                              <button
                                className="text-red-600 text-sm hover:underline"
                                onClick={() => {
                                  if (!window.confirm("Delete this task?")) return;
                                  dispatch(deleteTaskAsync(task.id));
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
