import Card from "../components/Card";
import Table from "../components/Table";
import StatusBadge from "../components/StatusBadge";
import { useStudentStore } from "../store/studentStore";
import { useCourseStore } from "../store/courseStore";

const courseColumns = [
  { key: "title", label: "Course" },
  { key: "instructor", label: "Instructor" },
  { key: "enrolled", label: "Enrolled" },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value} />,
  },
];

const activities = [
  { id: 1, text: "Amara Okoye enrolled in Python Fundamentals", time: "2 hours ago" },
  { id: 2, text: "New assignment posted in React Essentials", time: "5 hours ago" },
  { id: 3, text: "Daniel Reyes completed Django Basics", time: "Yesterday" },
  { id: 4, text: "PostgreSQL course reached 100 students", time: "2 days ago" },
];

function Dashboard() {
  const totalStudents = useStudentStore((state) => state.students.length);
  const courses = useCourseStore((state) => state.courses);
  const activeCourses = courses.filter((course) => course.status === "Active").length;

  const stats = [
    { title: "Total Students", value: totalStudents.toLocaleString(), icon: "🎓" },
    { title: "Active Courses", value: String(activeCourses), icon: "📚" },
    { title: "Assignments", value: "86", icon: "📝" },
    { title: "Revenue", value: "$24,500", icon: "💰" },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Courses</h2>
        <Table columns={courseColumns} rows={courses} />
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-4 text-lg font-bold">Recent Activities</h2>
        <ul className="divide-y divide-slate-800">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>{activity.text}</span>
              <span className="text-sm text-slate-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;