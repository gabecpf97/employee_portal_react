// import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userData = useSelector((state) => state.user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
          >
            Personal Information
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/visa"
            style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
          >
            Visa Status Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/housing/${userData.housingId}`}
            style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
          >
            Housing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/housing/reports"
            style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
          >
            Facility Reports
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
