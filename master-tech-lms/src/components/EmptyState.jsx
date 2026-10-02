function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-700 px-6 py-16 text-center">
      <p className="text-4xl" aria-hidden="true">📭</p>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-1 text-slate-400">{message}</p>

      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-6 rounded bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;