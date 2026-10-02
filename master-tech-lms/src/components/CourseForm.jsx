import { useState } from "react";

const emptyForm = { title: "", instructor: "", duration: "", enrolled: 0, status: "Upcoming" };

const inputClass =
  "w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-indigo-500";

function CourseForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
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
      instructor: formData.instructor.trim(),
      duration: formData.duration.trim(),
      enrolled: Number(formData.enrolled),
    });
    if (!result.success) setError(result.message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-2"
    >
      <h3 className="text-lg font-bold md:col-span-2">New Course</h3>

      {error && (
        <p className="rounded bg-red-500/10 p-3 text-sm text-red-400 md:col-span-2" role="alert">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm text-slate-300">Title</label>
        <input id="title" name="title" required value={formData.title} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="instructor" className="mb-1 block text-sm text-slate-300">Instructor</label>
        <input id="instructor" name="instructor" required value={formData.instructor} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="duration" className="mb-1 block text-sm text-slate-300">Duration</label>
        <input id="duration" name="duration" required placeholder="e.g. 8 weeks" value={formData.duration} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="enrolled" className="mb-1 block text-sm text-slate-300">Enrolled students</label>
        <input id="enrolled" name="enrolled" type="number" min="0" required value={formData.enrolled} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="status" className="mb-1 block text-sm text-slate-300">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} className={inputClass}>
          <option value="Active">Active</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className="flex gap-3 md:col-span-2">
        <button type="submit" className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500">
          Add Course
        </button>
        <button type="button" onClick={onCancel} className="rounded border border-slate-700 px-4 py-2 transition hover:bg-slate-800">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CourseForm;