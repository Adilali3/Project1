import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import ProgressChart from "../components/charts/ProgressChart";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const { data: skills, loading } = useFirestoreCollection("skills");

  const total = skills.length;
  const completed = skills.filter((s) => s.status === "Completed").length;
  const inProgress = skills.filter((s) => s.status === "In progress").length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-950 to-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-950 to-black">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <Link
            to="/skills"
            className="text-white text-sm hover:underline"
          >
            Go to Skills Board →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-4">
            <p className="text-slate-400 text-sm">In progress</p>
            <p className="text-white text-2xl font-bold">{inProgress}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-4">
            <p className="text-slate-400 text-sm">Completed</p>
            <p className="text-white text-2xl font-bold">{completed}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-4">
            <p className="text-slate-400 text-sm">Completion rate</p>
            <p className="text-white text-2xl font-bold">{rate}%</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-4">
          <ProgressChart skills={skills} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;