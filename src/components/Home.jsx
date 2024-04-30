import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <h1>HR project</h1>
      {isLoggedIn ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Link underline="none" href="/login">
          Login
        </Link>
      )}
    </div>
  );
}

export default Home;
