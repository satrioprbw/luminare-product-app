import { useEffect, useState } from "react";
import useAuthStore from "./store/useAuthStore";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

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
  }

  if (user) {
    return (
      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>
    );
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
