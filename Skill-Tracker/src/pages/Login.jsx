import {useState} from 'react';
import {signInWithEmailPassword} from "firebase/auth";
import {auth} from "../firebase/config";
import {useNavigate, Link} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try{
            await signInWithEmailPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    }
    return(
        <div className='min-h-screen bg-slate-900 flex items-center justify-center'>
            <form 
            onSubmit={handleSubmit}
            className='bg-slate-800 p-8 rounded-lg w-80 flex flex-col gap-4'
            >
                <h1 className='text-2xl font-bold text-white'>Login</h1>
                {error && <p className="text-red-400 text-sm">{error}</p>}

                 <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded bg-slate-700 text-white"
                required
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded bg-slate-700 text-white"
                required
                />

                <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                Login
                </button>

                <p className="text-slate-400 text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-400">
                    Sign Up
                   </Link>
                </p>   
            </form>
        </div>
    )
}

export default Login;