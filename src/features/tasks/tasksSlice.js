import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/tasksApi";

export const fetchTasksAsync = createAsyncThunk("tasks/fetchAll", async () => {
  console.log('Fetching tasks...');
  const tasks = await api.fetchTasks();
  console.log('Fetched tasks:', tasks);
  return tasks;
});

export const addTaskAsync = createAsyncThunk("tasks/add", async (task) => {
  return await api.createTask(task);
});

export const updateTaskAsync = createAsyncThunk("tasks/update", async ({ id, data }) => {
  console.log('Updating task:', { id, data });
  return await api.updateTask({ ...data, id }); // Ensure id is included in the task object
});

export const deleteTaskAsync = createAsyncThunk("tasks/delete", async (id) => {
  await api.deleteTask(id);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
   reorderLocal(state, action) {
  const updated = action.payload;
  updated.forEach(u => {
    const index = state.items.findIndex(t => t.id === u.id);
    if (index !== -1) {
      state.items[index].order = u.order;
    }
  });
  state.items.sort((a, b) => a.order - b.order);
}
,
    toggleStatusLocal(state, action) {
      const id = action.payload;
      const t = state.items.find((x) => x.id === id);
      if (t) t.status = t.status === "Pending" ? "Completed" : "Pending";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (s) => { s.status = "loading"; })
      .addCase(fetchTasksAsync.fulfilled, (s, a) => { s.status = "succeeded"; s.items = a.payload.sort((x,y)=>x.order - y.order); })
      .addCase(fetchTasksAsync.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })

      .addCase(addTaskAsync.fulfilled, (s, a) => {
        s.items.push(a.payload);
        s.items.sort((x,y)=>x.order - y.order);
      })
      .addCase(updateTaskAsync.fulfilled, (s, a) => {
        console.log('Update fulfilled:', a.payload);
        // Ensure we have a payload with an id before updating
        if (a.payload && a.payload.id) {
          s.items = s.items.map((t) => t.id === a.payload.id ? a.payload : t);
          s.items.sort((x,y)=>x.order - y.order);
        } else {
          console.error('Update response missing payload or id:', a.payload);
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (s, a) => {
        s.items = s.items.filter(t => t.id !== a.payload);
      });
  },
});

export const { reorderLocal, toggleStatusLocal } = tasksSlice.actions;
export default tasksSlice.reducer;
