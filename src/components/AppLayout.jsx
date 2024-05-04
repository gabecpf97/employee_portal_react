import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
