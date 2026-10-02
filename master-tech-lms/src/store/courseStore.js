import { create } from "zustand";
import { persist } from "zustand/middleware";

const starterCourses = [
  { id: 1, title: "Python", instructor: "Dr. Amara Okoye", duration: "8 weeks", enrolled: 320, status: "Active" },
  { id: 2, title: "React", instructor: "Daniel Reyes", duration: "6 weeks", enrolled: 280, status: "Active" },
  { id: 3, title: "Django", instructor: "Hana Sato", duration: "10 weeks", enrolled: 190, status: "Upcoming" },
  { id: 4, title: "PostgreSQL", instructor: "Tobias Lindqvist", duration: "4 weeks", enrolled: 120, status: "Draft" },
];

export const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: starterCourses,

      addCourse: (course) => {
        const title = course.title.trim();

        if (get().courses.some((c) => c.title.toLowerCase() === title.toLowerCase())) {
          return { success: false, message: "A course with this title already exists." };
        }

        const nextId = Math.max(0, ...get().courses.map((c) => c.id)) + 1;
        set((state) => ({
          courses: [...state.courses, { ...course, title, id: nextId }],
        }));
        return { success: true };
      },
    }),
    { name: "lms_courses" } // localStorage key
  )
);