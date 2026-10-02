// One card design, used four times. Each use passes in different props.
function Card({ title, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <span className="text-xl" aria-hidden="true">
          {icon}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default Card;