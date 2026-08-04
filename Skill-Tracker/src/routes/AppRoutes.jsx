import { Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<h1 className="text-black p-10">Home Page</h1>} />
            <Route path="/login" element={<h1 className="text-black p-10">Login Page</h1>} />
            <Route path="/dashboard" element={<h1 className="text-black p-10">Dashboard Page</h1>} />
        </Routes>
    )
}

export default AppRoutes;