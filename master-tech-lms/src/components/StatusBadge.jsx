// Full class names, so Tailwind can find them
const styles = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Completed: "bg-indigo-500/15 text-indigo-400",
  Inactive: "bg-red-500/15 text-red-400",
  Upcoming: "bg-amber-500/15 text-amber-400",
  Draft: "bg-slate-500/20 text-slate-300",
};

function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

export default StatusBadge;