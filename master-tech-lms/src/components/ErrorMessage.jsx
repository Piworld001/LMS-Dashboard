function ErrorMessage() {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/40 bg-red-500/10 px-6 py-10 text-center"
    >
      <p className="text-lg font-bold text-red-400">Something went wrong.</p>
      <p className="mt-1 text-slate-300">Please try again later.</p>
    </div>
  );
}

export default ErrorMessage;