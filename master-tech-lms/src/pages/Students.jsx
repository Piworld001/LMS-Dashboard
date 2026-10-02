import { useState } from "react";
import Table from "../components/Table";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import StudentForm from "../components/StudentForm";
import { useStudentStore } from "../store/studentStore";
import { useToastStore } from "../store/toastStore";

const PAGE_SIZE = 5;
const statusOptions = ["All", "Active", "Completed", "Inactive"];

function Students() {
  const students = useStudentStore((state) => state.students);
  const addStudent = useStudentStore((state) => state.addStudent);
  const updateStudent = useStudentStore((state) => state.updateStudent);
  const deleteStudent = useStudentStore((state) => state.deleteStudent);
  const showToast = useToastStore((state) => state.showToast);

  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  function openAddForm() {
    setStudentToEdit(null);
    setFormOpen(true);
  }

  function openEditForm(student) {
    setStudentToEdit(student);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setStudentToEdit(null);
  }

  // Called by the form. Returns the result so the form can show an error.
  function handleSubmit(student) {
    const result = studentToEdit ? updateStudent(student) : addStudent(student);
    if (result.success) {
      showToast(studentToEdit ? "Student updated" : "Student added");
      closeForm();
    }
    return result;
  }

  function handleDelete(student) {
    if (window.confirm(`Delete ${student.name}?`)) {
      deleteStudent(student.id);
      showToast("Student deleted");
    }
  }

  // Columns live inside the component because the buttons need our handlers
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "course", label: "Course" },
    {
      key: "progress",
      label: "Progress",
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 rounded-full bg-slate-800">
            <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${value}%` }} />
          </div>
          <span className="text-slate-400">{value}%</span>
        </div>
      ),
    },
    { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEditForm(row)}
            className="rounded border border-slate-700 px-3 py-1 text-xs transition hover:bg-slate-800"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="rounded bg-red-600 px-3 py-1 text-xs text-white transition hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Filter, then paginate (same as before)
  const filtered = status === "All" ? students : students.filter((s) => s.status === status);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // If you delete the last row of the last page, step back instead of showing an empty page
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleStatusChange(event) {
    setStatus(event.target.value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Students</h2>

        <div className="flex items-center gap-3">
          <label htmlFor="status-filter" className="text-sm text-slate-400">Status</label>
          <select
            id="status-filter"
            value={status}
            onChange={handleStatusChange}
            className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <button
            onClick={openAddForm}
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* The key makes React start a fresh form when you switch between students */}
      {formOpen && (
        <StudentForm
          key={studentToEdit?.id ?? "new"}
          studentToEdit={studentToEdit}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="No students found."
          message={
            students.length === 0
              ? "Click + Add Student to create one."
              : `There are no ${status.toLowerCase()} students.`
          }
        />
      ) : (
        <>
          <Table columns={columns} rows={visibleRows} />
          {totalPages > 1 && (
            <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </div>
  );
}

export default Students;