import { useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useTheme } from "../hooks/useTheme";

const titles = {
  "/dashboard": "Dashboard",
  "/courses": "Courses",
  "/students": "Students",
  "/profile": "Profile",
};

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const user = useUserStore((state) => state.user);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/60 px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded border border-slate-700 px-2.5 py-1 text-lg md:hidden"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold">{titles[pathname]}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="rounded border border-slate-700 px-2.5 py-1 text-sm transition hover:bg-slate-800"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <p className="hidden text-sm text-slate-300 sm:block">{user.name}</p>
        <div
          className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 font-bold"
          aria-hidden="true"
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Navbar;