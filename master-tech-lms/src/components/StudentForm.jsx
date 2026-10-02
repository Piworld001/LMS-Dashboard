import { useState } from "react";

const emptyForm = { name: "", email: "", course: "", progress: 0, status: "Active" };

const inputClass =
  "w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-indigo-500";

function StudentForm({ studentToEdit, onSubmit, onCancel }) {
  // Editing? Start from that student. Adding? Start empty.
  const [formData, setFormData] = useState(studentToEdit ?? emptyForm);
  const [error, setError] = useState("");

  // One handler for every field: the input's "name" says which value to change
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = onSubmit({
      ...formData,
      name: formData.name.trim(),
      progress: Number(formData.progress),
    });
    if (!result.success) setError(result.message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-2"
    >
      <h3 className="text-lg font-bold md:col-span-2">
        {studentToEdit ? "Edit Student" : "Add Student"}
      </h3>

      {error && (
        <p className="rounded bg-red-500/10 p-3 text-sm text-red-400 md:col-span-2" role="alert">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-slate-300">Name</label>
        <input id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-slate-300">Email</label>
        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="course" className="mb-1 block text-sm text-slate-300">Course</label>
        <select id="course" name="course" required value={formData.course} onChange={handleChange} className={inputClass}>
          <option value="">Select course</option>
          <option value="Python">Python</option>
          <option value="React">React</option>
          <option value="Django">Django</option>
          <option value="PostgreSQL">PostgreSQL</option>
        </select>
      </div>

      <div>
        <label htmlFor="progress" className="mb-1 block text-sm text-slate-300">Progress (%)</label>
        <input id="progress" name="progress" type="number" min="0" max="100" required value={formData.progress} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="status" className="mb-1 block text-sm text-slate-300">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} className={inputClass}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-3 md:col-span-2">
        <button type="submit" className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500">
          {studentToEdit ? "Save Changes" : "Add Student"}
        </button>
        <button type="button" onClick={onCancel} className="rounded border border-slate-700 px-4 py-2 transition hover:bg-slate-800">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default StudentForm;