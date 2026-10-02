import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToastStore } from "../store/toastStore";

function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const showToast = useToastStore((state) => state.showToast);

  // Already logged in? Skip the login page.
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function validate() {
    const newErrors = {};
    if (!email.includes("@")) newErrors.email = "Enter a valid email address.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser reloading the page
    const newErrors = validate();
    setErrors(newErrors);

    // No errors? Log in, show a toast, and go to the dashboard.
    if (Object.keys(newErrors).length === 0) {
      login();
      showToast("Welcome back!");
      navigate("/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-8"
      >
        <h1 className="text-2xl font-bold text-indigo-400">MASTER-TECH LMS</h1>
        <p className="text-sm text-slate-400">Sign in to continue</p>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-slate-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 py-2 font-semibold transition hover:bg-indigo-500"
        >
          Sign In
        </button>

        <p className="text-center text-xs text-slate-500">
          Demo login: any valid email and a password of 6+ characters.
        </p>
      </form>
    </main>
  );
}

export default Login;