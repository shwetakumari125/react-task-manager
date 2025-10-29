import React, { useState, useEffect } from "react";

export default function TaskForm({ initial, onSubmit, submitLabel = "Save", showStatus = true }) {
  const defaultInitial = { title: "", description: "", dueDate: "", status: "Pending" };
  const initialForm = initial ?? defaultInitial;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setForm(initialForm);
  }, [initialForm?.id]);

  function validate(){
    const err = {};
    if(!form.title?.trim()) err.title = "Title is required";
    if(!form.description?.trim()) err.description = "Description is required";
    if(!form.dueDate) err.dueDate = "Due date required";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!validate()) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="w-full border px-3 py-2 rounded" />
        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full border px-3 py-2 rounded" />
        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Due date</label>
          <input type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate: e.target.value})} className="w-full border px-3 py-2 rounded"/>
          {errors.dueDate && <div className="text-red-500 text-sm mt-1">{errors.dueDate}</div>}
        </div>

        {showStatus && (
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="w-full border px-3 py-2 rounded">
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">{submitLabel}</button>
      </div>
    </form>
  );
}
