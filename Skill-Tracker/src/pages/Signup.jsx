import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-950 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl p-8 rounded-lg w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white">Sign Up</h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-transparent border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-transparent border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-white/5 text-white p-2 rounded hover:border-white/20"
        >
          Sign Up
        </button>

        <p className="text-slate-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;