import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!res.ok) {
      setError("Failed to Login");
      return;
    }
    const data = await res.json();
    login(data);
    navigate("/");
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-accent">
        <div className="bg-white rounded-2xl p-10 w-96">
          <h1 className="text-2xl font-bold text-center text-primary">
            Login to Account
          </h1>
          <p className="text-sm text-gray-400 text-center mt-2 mb-8">
            Please enter your username and password to continue
          </p>

          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full border rounded-lg px-4 py-3 text-sm mb-6 outline-none bg-gray-50"
            />

            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full border rounded-lg px-4 py-3 text-sm mb-6 outline-none bg-gray-50"
            />

            <button
              type="submit"
              className="w-full bg-accent text-white py-3 rounded-lg font-semibold cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
