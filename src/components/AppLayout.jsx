import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { useEffect } from "react";

function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userStatus") !== "approved") {
      navigate("/onboarding");
    }
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
