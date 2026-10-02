import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToastStore } from "../store/toastStore";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/courses", label: "Courses" },
  { to: "/students", label: "Students" },
  { to: "/profile", label: "Profile" },
];

function Sidebar({ open, onClose }) {
  const { logout } = useAuth();
  const showToast = useToastStore((state) => state.showToast);

  function handleLogout() {
    logout();
    showToast("Logged out");
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col gap-6 border-r border-slate-800 bg-slate-900 p-5 transition-transform md:static md:min-h-screen md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-lg font-extrabold tracking-wide text-indigo-400">
        MASTER-TECH LMS
      </h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;