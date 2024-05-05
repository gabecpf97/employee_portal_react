// import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setEmail,
} from "../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  Typography,
  Input,
  Button,
  Box,
  Alert,
} from "@mui/material";

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
  const navigate = useNavigate();
  // const location = useLocation();
  const [isValid, setIsValid] = useState(null);

  const [alert, setAlert] = useState("");

  //check if link is valid
  useEffect(() => {
    const link = window.location.href;
    const validateLink = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/registrationValidation",
          { link }
        );
        setIsValid(response.status === 200);
      } catch (error) {
        console.error("Registration validation failed:", error);
        setIsValid(false);
      }
    };
    validateLink();
  }, []);

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
        const userInfo = response.data;
        console.log(userInfo);
        navigate("/login");
      } else {
        console.log("Failed to register:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data.message);
      setAlert(error.response.data.message);
    }
  };
  // console.log(isValid);
  if (!isValid) {
    return <h1>Registration Link not Valid.</h1>;
  }
  return (
    <List className="container" style={{ margin: "0 auto", maxWidth: "400px" }}>
      <Typography variant="h5" style={{ margin: "0 70px" }}>
        Register for an Account
      </Typography>
      {alert ? <Alert severity="error">{alert}</Alert> : <></>}
      <form onSubmit={handleSubmit}>
        <ListItem>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
            fullWidth
          />
        </ListItem>
        <ListItem>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            fullWidth
          />
        </ListItem>
        <ListItem>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            fullWidth
          />
        </ListItem>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Box>
      </form>
    </List>
  );
}

export default RegistrationForm;
