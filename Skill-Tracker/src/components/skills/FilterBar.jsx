import { STATUSES } from "../../utils/constants";

function FilterBar({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap items-center">
      <button
        onClick={() => setStatusFilter("All")}
        className={`text-sm px-3 py-1 rounded ${
          statusFilter === "All" ? "bg-white/5 text-white" : "bg-white/5 border border-white/10 text-slate-300"
        }`}
      >
        All
      </button>

      {STATUSES.map((status) => (
        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`text-sm px-3 py-1 rounded ${
            statusFilter === status ? "bg-white/5 text-white" : "bg-white/5 border border-white/10 text-slate-300"
          }`}
        >
          {status}
        </button>
      ))}

      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="ml-auto p-2 rounded bg-transparent border border-white/20 text-white placeholder-slate-400 text-sm w-48 focus:outline-none focus:border-blue-400"
      />
    </div>
  );
}

export default FilterBar;