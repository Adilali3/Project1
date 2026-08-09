/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CATEGORIES, STATUSES } from "../../utils/constants";

function SkillForm({ onSubmit, onCancel, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
  const [status, setStatus] = useState(initialData?.status || STATUSES[0]);
  const [link, setLink] = useState(initialData?.link || "");
  const [fetchingTitle, setFetchingTitle] = useState(false);

  async function handleLinkBlur() {
    if (!link || name) return;

    setFetchingTitle(true);
    try {
      const res = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(link)}`
      );
      const result = await res.json();
      if (result.status === "success" && result.data.title) {
        setName(result.data.title);
      }
    } catch (err) {
      console.log("Could not fetch title, user can type manually");
    } finally {
      setFetchingTitle(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, category, status, link });
  }

  const inputClasses =
    "w-full p-2 rounded bg-transparent border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm text-slate-300 mb-1 block">Resource link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onBlur={handleLinkBlur}
          className={inputClasses}
          placeholder="https://..."
          required
        />
      </div>

      <div>
        <label className="text-sm text-slate-300 mb-1 block">
          Skill name {fetchingTitle && <span className="text-slate-500">(fetching...)</span>}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          placeholder="e.g. React custom hooks"
          required
        />
      </div>

      <div>
        <label className="text-sm text-slate-300 mb-1 block">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${inputClasses} bg-zinc-900`}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-slate-300 mb-1 block">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`${inputClasses} bg-zinc-900`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded text-slate-300 hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-white/5 text-white hover:border-white/20"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default SkillForm;