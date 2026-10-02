import { useState } from "react";
import { useUserStore } from "../store/userStore";
import { useToastStore } from "../store/toastStore";

function Profile() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const showToast = useToastStore((state) => state.showToast);

  // Local state holds what you're typing; the store only changes on Save
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    updateUser({ name, email });
    showToast("Profile updated");
    setSaved(true);
  }

  return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-2xl font-bold">Edit Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => { setName(e.target.value); setSaved(false); }}
            required
            className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setSaved(false); }}
            required
            className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-indigo-500"
          />
        </div>

        <p className="text-sm text-slate-400">Role: {user.role}</p>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500"
          >
            Save Changes
          </button>
          {saved && <span className="text-sm text-emerald-400">Profile updated ✓</span>}
        </div>
      </form>
    </div>
  );
}

export default Profile;