// import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Button, Toolbar } from "@mui/material";
const Navbar = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div>
      <AppBar>
        <Toolbar position="static">
          <Button color="inherit">
            <NavLink
              to="/"
              style={({ isActive }) => ({ color: isActive ? "blue" : "white" })}
            >
              Home
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              to="/profile"
              style={({ isActive }) => ({ color: isActive ? "blue" : "white" })}
            >
              Personal Information
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              to="/visa"
              style={({ isActive }) => ({ color: isActive ? "blue" : "white" })}
            >
              Visa Status Management
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              to={`/housing/${userData.housingId}`}
              style={({ isActive }) => ({ color: isActive ? "blue" : "white" })}
            >
              Housing
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              to="/housing/reports"
              style={({ isActive }) => ({ color: isActive ? "blue" : "white" })}
            >
              Facility Reports
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
// <nav>
//   <ul>
//     <li>
//       <NavLink
//         to="/"
//         style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
//       >
//         Home
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/profile"
//         style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
//       >
//         Personal Information
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/visa"
//         style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
//       >
//         Visa Status Management
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to={`/housing/${userData.housingId}`}
//         style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
//       >
//         Housing
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/housing/reports"
//         style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
//       >
//         Facility Reports
//       </NavLink>
//     </li>
//   </ul>
// </nav>
