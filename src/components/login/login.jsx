import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername, setUser } from "../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
import {
  Input,
  Button,
  List,
  ListItem,
  Typography,
  Alert,
} from "@mui/material";
import "./login.css";

function Login() {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [alert, updateAlert] = useState("");
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
        dispatch(setUser(data));
        localStorage.setItem("authToken", data.token);

        //for testing profile
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userStatus", data.userStatus);
        localStorage.setItem("housingId", data.housingId);
        if (data.userStatus === "approved") {
          navigate("/profile");
        } else {
          navigate("/onboarding");
        }
      } else {
        updateAlert(data.message);
      }
    } catch (error) {
      console.error("Error", error.message);
      updateAlert("Server is down, please try again later.");
    }
  }

  return (
    <List className="container" style={{ margin: "0 auto" }}>
      <Typography variant="h5" style={{ margin: "0 70px" }}>
        Log in to your account
      </Typography>
      {alert ? <Alert severity="error">{alert}</Alert> : <></>}
      <form onSubmit={handleSubmit}>
        <ListItem>
          <label>Username:</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => updateUsername(e.target.value)}
            required
          />
        </ListItem>
        <ListItem>
          <label>Password:</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            required
          />
        </ListItem>

        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </List>
  );
}

export default Login;
