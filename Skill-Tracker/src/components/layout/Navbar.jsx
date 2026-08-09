import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex justify-between items-center">
      <span className="text-white font-semibold">SkillTrack</span>
      <button
        onClick={handleLogout}
        className="text-slate-300 hover:text-white text-sm"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;