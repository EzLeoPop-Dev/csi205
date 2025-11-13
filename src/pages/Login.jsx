import { useState } from "react";
import { useAuth } from "../components/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (!success) setError("Username หรือ Password ไม่ถูกต้อง");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/20 text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/20 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-pink-500 to-purple-600 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="detailUser text-center mt-4 text-gray-600">
                    <p>Username : user and admin</p>
                    <p>Password : 1234</p>
                </div>
            </div>
        </div>
    );
}
