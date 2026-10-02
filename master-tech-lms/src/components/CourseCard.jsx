
// Full class names are written out in full (not built from pieces)
// so Tailwind can find them when it scans your files.
const statusStyles = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Upcoming: "bg-amber-500/15 text-amber-400",
  Draft: "bg-slate-500/20 text-slate-300",
};

function CourseCard({ title, instructor, duration, enrolled, status }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      <dl className="space-y-1 text-sm text-slate-400">
        <div className="flex justify-between">
          <dt>Instructor</dt>
          <dd className="text-slate-200">{instructor}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Duration</dt>
          <dd className="text-slate-200">{duration}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Enrolled</dt>
          <dd className="text-slate-200">{enrolled} students</dd>
        </div>
      </dl>
    </article>
  );
}

export default CourseCard;