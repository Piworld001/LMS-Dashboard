import { create } from "zustand";
import { persist } from "zustand/middleware";

// Starting data, used only the first time (before anything is saved)
const starterStudents = [
  { id: 1, name: "Amara Okoye", email: "amara@example.com", course: "Python", progress: 85, status: "Active" },
  { id: 2, name: "Daniel Reyes", email: "daniel@example.com", course: "React", progress: 60, status: "Active" },
  { id: 3, name: "Hana Sato", email: "hana@example.com", course: "Django", progress: 100, status: "Completed" },
  { id: 4, name: "Tobias Lindqvist", email: "tobias@example.com", course: "PostgreSQL", progress: 20, status: "Inactive" },
  { id: 5, name: "Ngozi Eze", email: "ngozi@example.com", course: "Python", progress: 45, status: "Active" },
  { id: 6, name: "Liam Carter", email: "liam@example.com", course: "React", progress: 10, status: "Inactive" },
];

export const useStudentStore = create(
  // persist() saves the store to localStorage automatically
  persist(
    (set, get) => ({
      students: starterStudents,

      addStudent: (student) => {
        const email = student.email.trim().toLowerCase();

        if (get().students.some((s) => s.email.toLowerCase() === email)) {
          return { success: false, message: "A student with this email already exists." };
        }

        // Next ID = highest existing ID + 1
        const nextId = Math.max(0, ...get().students.map((s) => s.id)) + 1;
        set((state) => ({
          students: [...state.students, { ...student, email, id: nextId }],
        }));
        return { success: true };
      },

      updateStudent: (updated) => {
        const email = updated.email.trim().toLowerCase();

        // Duplicate check ignores the student being edited
        if (get().students.some((s) => s.id !== updated.id && s.email.toLowerCase() === email)) {
          return { success: false, message: "A student with this email already exists." };
        }

        set((state) => ({
          students: state.students.map((s) =>
            s.id === updated.id ? { ...updated, email } : s
          ),
        }));
        return { success: true };
      },

      deleteStudent: (id) =>
        set((state) => ({ students: state.students.filter((s) => s.id !== id) })),
    }),
    { name: "lms_students" } // the localStorage key
  )
);