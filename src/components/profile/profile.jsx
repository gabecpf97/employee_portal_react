import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useSelector, useDispatch } from 'react-redux';
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Alert } from "@mui/material";
import { Input, InputLabel } from "@mui/material";
import validateFormData from "./validation";

import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [userEdit, setUserEdit] = useState(false);
  const [appEdit, setAppEdit] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const userStatus = localStorage.getItem("userStatus");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data if authenticated
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
          setOriginalData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error.data.message);
        }
      };
      fetchData();
    }
  }, [navigate, token, userId]);

  const handleUserEdit = () => {
    setUserEdit(true);
    setUserData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        password: "",
      },
    }));
  };

  const handleAppEdit = () => {
    setAppEdit(true);
  };

  const handleUserEditSave = async () => {
    try {
      const update_body = {
        new_username: userData.user.username,
        new_email: userData.user.email,
        new_password: userData.user.password,
      };
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        update_body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      location.reload();
    } catch (error) {
      setError(error.response.data.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.error(
        "Error changing user profile:",
        error.response.data.message
      );
    }
  };

  const handleAppEditSave = async () => {
    try {
      console.log(userData);
      const fileInput_picture = document.getElementById("fileInput_picture");
      const file_picture = fileInput_picture.files[0];

      const fileInput_driver = document.getElementById("fileInput_driver");
      const file_driver = fileInput_driver.files[0];

      const fileInput_work = document.getElementById("fileInput_work");
      const file_work = fileInput_work.files[0];

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("status", userStatus);
      formData.append("email", userData.application.email);
      formData.append("firstName", userData.application.firstName);
      formData.append("lastName", userData.application.lastName);
      formData.append("middleName", userData.application.middleName);
      formData.append("preferredName", userData.application.preferredName);
      formData.append("picture", file_picture);
      //const address_blob = new Blob([JSON.stringify(userData.application.address)],{ type: 'application/json' })
      formData.append("address", JSON.stringify(userData.application.address));
      formData.append("cellPhone", userData.application.cellPhone);
      formData.append("workPhone", userData.application.workPhone);
      //const car_blob = new Blob([JSON.stringify(userData.application.car)], { type: 'application/json' })
      formData.append("car", JSON.stringify(userData.application.car));
      formData.append("SSN", userData.application.SSN);
      formData.append("DOB", userData.application.DOB);
      formData.append("gender", userData.application.gender);
      formData.append("citizenship", userData.application.citizenship);
      formData.append(
        "workAuthorization_type",
        userData.application.workAuthorization.type
      );
      formData.append("workAuthorization_document", file_work);
      formData.append(
        "workAuthorization_startDate",
        userData.application.workAuthorization.startDate
      );
      formData.append(
        "workAuthorization_endDate",
        userData.application.workAuthorization.endDate
      );
      formData.append(
        "driverLicense_number",
        userData.application.driverLicense.number
      );
      formData.append(
        "driverLicense_expirationDate",
        userData.application.driverLicense.expirationDate
      );
      formData.append("driverLicense_document", file_driver);
      //const reference_blob = new Blob([JSON.stringify(userData.application.reference)],{ type: 'application/json'})
      formData.append(
        "reference",
        JSON.stringify(userData.application.reference)
      );
      //const emergency_blob = new Blob([JSON.stringify(userData.application.emergency)],{ type: 'application/json'})
      // formData.append(
      //   "emergency",
      //   JSON.stringify(userData.application.emergency)
      // );
      userData.application.emergency.forEach((value, idx) => {
        formData.append(`emergency[${idx}]`, JSON.stringify(value));
      });

      // for (let [key, value] of formData.entries()) {
      //     console.log(key, value);
      // }
      const errors = validateFormData(formData);
      if (errors) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setError(errors);
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/application/update/${userData.application._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      location.reload();
    } catch (error) {
      setError(error.response.data.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.error("Error changing user profile:", error.response.data);
      //setUserData(originalData);
    }
    setAppEdit(false);
  };

  const handleUserEditCancel = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      setUserData(originalData);
      setError("");
      setUserEdit(false);
    }
  };
  const handleAppEditCancel = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      setUserData(originalData);
      setError("");
      setAppEdit(false);
    }
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        [name]: value,
      },
    }));
  };

  const handleAppValueChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      application: {
        ...prevUserData.application,
        [name]: value,
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      application: {
        ...prevUserData.application,
        address: {
          ...prevUserData.application.address,
          [name]: value,
        },
      },
    }));
  };

  //   const handleWorkChange = (e) => {
  //     const { name, value } = e.target;
  //     setUserData((prevUserData) => ({
  //       ...prevUserData,
  //       application: {
  //         ...prevUserData.application,
  //         workAuthorization: {
  //           ...prevUserData.application.workAuthorization,
  //           [name]: value,
  //         },
  //       },
  //     }));
  //   };

  const handleEmergencyChange = (e, t_index) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      application: {
        ...prevUserData.application,
        emergency: prevUserData.application.emergency.map((contact, index) => {
          if (index === t_index) {
            return { ...contact, [name]: value };
          } else {
            return contact;
          }
        }),
      },
    }));
  };

  return (
    <>
      {/* <p>status is {userStatus}, userId is {userId}, token is {token}</p> */}
      <h1>Personal Profile</h1>
      {userData && (
        <div>
          <Box sx={{ margin: 2 }}>
            <Typography variant="h6">Account Information</Typography>
            {userEdit && error && <Alert severity="warning">{error}</Alert>}
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.user.username}
                name="username"
                disabled={!userEdit}
                onChange={handleValueChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.user.email}
                name="email"
                disabled
                onChange={handleValueChange}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.user.password}
                name="password"
                disabled={!userEdit}
                onChange={handleValueChange}
              />
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleUserEdit}
                  sx={{ display: userEdit ? "none" : "flex" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUserEditSave}
                  sx={{ display: userEdit ? "flex" : "none" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleUserEditCancel}
                  sx={{ display: userEdit ? "flex" : "none" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>

          <div>
            <Typography variant="h6">Personal Information</Typography>
            {appEdit && error && <Alert severity="warning">{error}</Alert>}
            <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 2, ml: 2 }}>
              <Button
                variant="contained"
                onClick={handleAppEdit}
                sx={{ display: appEdit ? "none" : "flex" }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAppEditSave}
                sx={{ display: appEdit ? "flex" : "none" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAppEditCancel}
                sx={{ display: appEdit ? "flex" : "none" }}
              >
                Cancel
              </Button>
            </Box>
            <Box sx={{ padding: 2, border: "1px solid #ccc" }}>
              <Typography variant="subtitle1" sx={{}}>
                Basic Information
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Profile Image
              </Typography>
              <img
                src={userData.application.picture}
                alt="Profile"
                style={{ width: 200, height: 200, marginBottom: 16 }}
              />
              <InputLabel
                htmlFor="fileInput"
                sx={{ display: appEdit ? "flex" : "none" }}
              >
                Upload File
              </InputLabel>
              <Input
                type="file"
                id="fileInput_picture"
                disabled={!appEdit}
                sx={{ display: appEdit ? "flex" : "none" }}
              />

              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.firstName}
                name="firstName"
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.lastName}
                name="lastName"
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
              <TextField
                label="Middle Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.middleName}
                name="middleName"
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
              <TextField
                label="Preferred Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.preferredName}
                name="preferredName"
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.email}
                name="email"
                disabled
                onChange={handleAppValueChange}
              />
              <TextField
                label="SSN"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.SSN}
                name="SSN"
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
              <TextField
                label="Date of Birth"
                type="Date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.DOB}
                name="DOB"
                InputLabelProps={{ shrink: true }}
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
              <TextField
                label="Gender"
                variant="outlined"
                select
                fullWidth
                margin="normal"
                value={userData.application.gender}
                name="gender"
                disabled={!appEdit}
                onChange={handleAppValueChange}
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
            </Box>

            <Box sx={{ padding: 2, border: "1px solid #ccc" }}>
              <Typography variant="subtitle1" gutterBottom>
                Address
              </Typography>
              <TextField
                label="Building/Apt Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.address.buildingAptNum}
                name="buildingAptNum"
                disabled={!appEdit}
                onChange={handleAddressChange}
              />
              <TextField
                label="Street Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.address.street}
                name="street"
                disabled={!appEdit}
                onChange={handleAddressChange}
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.address.city}
                name="city"
                disabled={!appEdit}
                onChange={handleAddressChange}
              />
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.address.state}
                name="state"
                disabled={!appEdit}
                onChange={handleAddressChange}
              />
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.address.zip}
                name="zip"
                disabled={!appEdit}
                onChange={handleAddressChange}
              />
            </Box>

            <Box sx={{ padding: 2, border: "1px solid #ccc" }}>
              <Typography variant="subtitle1" gutterBottom>
                Contact Information
              </Typography>
              <TextField
                label="Cell Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.cellPhone}
                name="cellPhone"
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
              <TextField
                label="Work Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.workPhone}
                name="workPhone"
                disabled={!appEdit}
                onChange={handleAppValueChange}
              />
            </Box>

            <Box sx={{ padding: 2, border: "1px solid #ccc" }}>
              <Typography variant="subtitle1" gutterBottom>
                Employment
              </Typography>
              <TextField
                label="Visa Type"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.application.workAuthorization.type}
                name="type"
                disabled
              />
              <TextField
                label="Start Date"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={userData.application.workAuthorization.startDate}
                name="startDate"
                disabled
              />
              <TextField
                label="End Date"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={userData.application.workAuthorization.endDate}
                name="endDate"
                disabled
              />
            </Box>

            <Box sx={{ padding: 2, border: "1px solid #ccc" }}>
              <Typography variant="subtitle1" gutterBottom>
                Emergency Contact:
              </Typography>
              {userData.application.emergency.map((contact, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    Contact {index + 1}
                  </Typography>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contact.firstName}
                    disabled={!appEdit}
                    name="firstName"
                    onChange={(e) => handleEmergencyChange(e, index)}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contact.lastName}
                    disabled={!appEdit}
                    name="lastName"
                    onChange={(e) => handleEmergencyChange(e, index)}
                  />
                  <TextField
                    label="Middle Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contact.middleName}
                    disabled={!appEdit}
                    name="middleName"
                    onChange={(e) => handleEmergencyChange(e, index)}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contact.email}
                    disabled={!appEdit}
                    name="email"
                    onChange={(e) => handleEmergencyChange(e, index)}
                  />
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contact.phone}
                    disabled={!appEdit}
                    name="phone"
                    onChange={(e) => handleEmergencyChange(e, index)}
                  />
                  <TextField
                    label="Relationship"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contact.relationship}
                    disabled={!appEdit}
                    name="relationship"
                    onChange={(e) => handleEmergencyChange(e, index)}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ padding: 2, border: "1px solid #ccc" }}>
              <Typography variant="h6" gutterBottom>
                Documents
              </Typography>

              <Typography variant="subtitle1">Driver License</Typography>
              <p>{userData.application.driverLicense.document}</p>
              <a
                href={userData.application.driverLicense.document}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Preview
                </Button>
              </a>
              <a
                href={userData.application.driverLicense.document}
                download="downloaded_filename.png"
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Button variant="contained" color="primary">
                  Download
                </Button>
              </a>

              <InputLabel
                htmlFor="fileInput"
                sx={{ display: appEdit ? "flex" : "none" }}
              >
                Upload File
              </InputLabel>
              <Input
                type="file"
                id="fileInput_driver"
                disabled={!appEdit}
                sx={{ display: appEdit ? "flex" : "none" }}
              />
              <br></br>
              <hr></hr>
              <br></br>
              <Typography variant="subtitle1">Work Authorization</Typography>
              <p>{userData.application.workAuthorization?.document}</p>
              <a
                href={userData.application.workAuthorization?.document}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Preview
                </Button>
              </a>
              <a
                href={userData.application.workAuthorization?.document}
                download
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Button variant="contained" color="primary">
                  Download
                </Button>
              </a>

              <InputLabel
                htmlFor="fileInput"
                sx={{ display: appEdit ? "flex" : "none" }}
              >
                Upload File
              </InputLabel>
              <Input
                type="file"
                id="fileInput_work"
                disabled={!appEdit}
                sx={{ display: appEdit ? "flex" : "none" }}
              />
              <hr></hr>
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 10 }}>
              <Button
                variant="contained"
                onClick={handleAppEdit}
                sx={{ display: appEdit ? "none" : "flex" }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAppEditSave}
                sx={{ display: appEdit ? "flex" : "none" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAppEditCancel}
                sx={{ display: appEdit ? "flex" : "none" }}
              >
                Cancel
              </Button>
            </Box>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
