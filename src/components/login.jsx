import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../store/slices/user.slice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect to home page if user is already login
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUsername(username));
        localStorage.setItem("authToken", data.token);
        navigate("/onboarding/create");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => updateUsername(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="text"
        value={password}
        onChange={(e) => updatePassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}

export default Login;
