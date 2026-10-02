import { useState } from "react";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";
import EmptyState from "../components/EmptyState";
import { useCourseStore } from "../store/courseStore";
import { useToastStore } from "../store/toastStore";

function Courses() {
  const courses = useCourseStore((state) => state.courses);
  const addCourse = useCourseStore((state) => state.addCourse);
  const showToast = useToastStore((state) => state.showToast);

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Called by the form. Returns the result so the form can show an error.
  function handleSubmit(course) {
    const result = addCourse(course);
    if (result.success) {
      showToast("Course added");
      setFormOpen(false);
    }
    return result;
  }

  const term = search.trim().toLowerCase();
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term)
  );

  let content;
  if (courses.length === 0) {
    content = (
      <EmptyState
        title="No courses available."
        message="Create your first course."
        actionLabel="Create Course"
        onAction={() => setFormOpen(true)}
      />
    );
  } else if (filteredCourses.length === 0) {
    content = (
      <EmptyState title="No matching courses." message={`Nothing found for "${search}".`} />
    );
  } else {
    content = (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            instructor={course.instructor}
            duration={course.duration}
            enrolled={course.enrolled}
            status={course.status}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Courses</h2>

        <div className="flex items-center gap-3">
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <input
            id="course-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-48 rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => setFormOpen(true)}
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            + New Course
          </button>
        </div>
      </div>

      {formOpen && <CourseForm onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />}

      {content}
    </div>
  );
}

export default Courses;