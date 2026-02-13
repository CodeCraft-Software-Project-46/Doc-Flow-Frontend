import { useNavigate } from "react-router";
import { useState } from "react";

export default function SignInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // fake login check
        if (email === "admin@test.com" && password === "1234") {
            navigate("/dashboard"); // ✅ go to dashboard
        } else {
            alert("Invalid login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Sign In</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
                    Sign In
                </button>
            </form>
        </div>
    );
}
