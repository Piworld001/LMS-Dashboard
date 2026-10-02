import { useToastStore } from "../store/toastStore";

function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-lg border border-emerald-500/40 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-lg"
        >
          ✓ {toast.message}
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;