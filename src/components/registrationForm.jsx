// import React from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword, setEmail } from "../store/slices/user.slice";

// function to sanitize the input fields
function sanitizeInput(input) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return input.replace(reg, (match) => map[match]);
}

function RegistrationForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    switch (name) {
      case "username": {
        dispatch(setUsername(sanitizedValue));
        break;
      }
      case "password": {
        dispatch(setPassword(sanitizedValue));
        break;
      }
      case "email": {
        dispatch(setEmail(sanitizedValue));
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: user.username,
      password: user.password,
      email: user.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        userData
      );
      if (response.status === 201) {
        // if register successfully will redirect to login page
        console.log(response.data);
        const userInfo = response.data;
        console.log(userInfo);
        // const token = response.data.token;
        // localStorage.setItem('token', token);
        // window.location.href = 'http://localhost:3000/auth/login';
      } else {
        console.log("Failed to register:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <br></br>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <br></br>
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <br></br>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
