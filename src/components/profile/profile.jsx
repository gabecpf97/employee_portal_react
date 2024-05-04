import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useSelector, useDispatch } from 'react-redux';
import Button from "@mui/material/Button";
import { TextField, Box, Typography } from '@mui/material';
import { Input, InputLabel} from '@mui/material';

import axios from 'axios';

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [userEdit, setUserEdit] = useState(false);
    const [appEdit, setAppEdit] = useState(false);

    
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
                    const response = await axios.get(`http://localhost:3000/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log(response.data);
                    setUserData(response.data);
                    setOriginalData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchData();
        }
    }, [navigate, token, userId]); 

    const handleUserEdit = () => {
        setUserEdit(true)
        setUserData(prevUserData => ({
            ...prevUserData,
            user: {
                ...prevUserData.user,
                password: '' 
            }
        }));

    };

    const handleAppEdit = () => {
        setAppEdit(true)

    };

    const handleUserEditSave = async () => {
        try {
            const update_body = {
                new_username:userData.user.username,
                new_email:userData.user.email,
                new_password:userData.user.password
            }
            const response = await axios.put(`http://localhost:3000/users/${userId}`, update_body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            location.reload()
        } catch (error) {
            console.error('Error changing user profile:', error);
            setUserData(originalData);
        }
        setUserEdit(false)
    };

    const handleAppEditSave = async () => {
        try {
            console.log(userData)
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append("userId",userId)
            formData.append("status",userStatus)
            formData.append("email",userData.application.email)
            formData.append("firstName",userData.application.firstName)
            formData.append("lastname",userData.application.lastName)
            formData.append("middleName",userData.application.middleName)
            formData.append("preferredName",userData.application.preferredName)
            formData.append("picture", file)
            //const address_blob = new Blob([JSON.stringify(userData.application.address)],{ type: 'application/json' })
            formData.append("address", JSON.stringify(userData.application.address))
            formData.append("cellPhone",userData.application.cellPhone)
            formData.append("workPhone",userData.application.workPhone)
            //const car_blob = new Blob([JSON.stringify(userData.application.car)], { type: 'application/json' })
            formData.append("car",JSON.stringify(userData.application.car))
            formData.append("SSN",userData.application.SSN)
            formData.append("DOB",userData.application.DOB)
            formData.append("gender",userData.application.gender)
            formData.append("citizenship",userData.application.citizenship)
            formData.append("workAuthorization_type",userData.application.workAuthorization.type)
            formData.append("workAuthorization_document", file)
            formData.append("workAuthorization_startDate",userData.application.workAuthorization.startDate)
            formData.append("workAuthorization_endDate",userData.application.workAuthorization.endDate)
            formData.append("driverLicense_number",userData.application.driverLicense.number)
            formData.append("driverLicense_expirationDate",userData.application.driverLicense.expirationDate)
            formData.append("driverLicense_document", file)
            //const reference_blob = new Blob([JSON.stringify(userData.application.reference)],{ type: 'application/json'})
            formData.append("reference", JSON.stringify(userData.application.reference))
            //const emergency_blob = new Blob([JSON.stringify(userData.application.emergency)],{ type: 'application/json'})
            formData.append("emergency", JSON.stringify(userData.application.emergency))


            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }

            const response = await axios.put(`http://localhost:3000/application/update/${userData.application._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            location.reload()

        } catch (error) {
            console.error('Error changing user profile:', error);
            setUserData(originalData);
        }
        setAppEdit(false)
    };

    const handleUserEditCancel = () => {
        if (window.confirm("Are you sure you want to discard all changes?")) {
            setUserData(originalData);
            setUserEdit(false);
        }
    };
    const handleAppEditCancel = () => {
        if (window.confirm("Are you sure you want to discard all changes?")) {
            setUserData(originalData);
            setAppEdit(false);
        }
    };

    const handleValueChange = (e) => {
        const { name, value } = e.target;  
        setUserData(prevUserData => ({
            ...prevUserData,
            user: {
                ...prevUserData.user,
                [name]: value  
            }
        }));
    };

    const handleAppValueChange = (e) => {
        const { name, value } = e.target;  
        setUserData(prevUserData => ({
            ...prevUserData,
            application: {
                ...prevUserData.application,
                [name]: value  
            }
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;  
        setUserData(prevUserData => ({
            ...prevUserData,
            application: {
                ...prevUserData.application,
                address: {
                    ...prevUserData.application.address,
                    [name]:value
                } 
            }
        }));
    };

    const handleWorkChange = (e) => {
        const { name, value } = e.target;  
        setUserData(prevUserData => ({
            ...prevUserData,
            application: {
                ...prevUserData.application,
                workAuthorization: {
                    ...prevUserData.application.workAuthorization,
                    [name]:value
                } 
            }
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
                        disabled={!userEdit}
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
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button variant="contained" onClick={handleUserEdit} sx={{ display: userEdit ? 'none' : 'flex' }}>Edit</Button>
                        <Button variant="contained" color="primary" onClick={handleUserEditSave} sx={{ display: userEdit ? 'flex' : 'none' }}>Save</Button>
                        <Button variant="contained" color="secondary" onClick={handleUserEditCancel} sx={{ display: userEdit ? 'flex' : 'none' }}>Cancel</Button>
                        </Box>
                    </Box>
                    </Box>
                    
                    <div>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h6">Personal Information</Typography>
                            <Typography variant="subtitle1" sx={{ mt: 2 }}>Basic Information</Typography>
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Profile Image</Typography>
                            <img src={userData.application.picture} alt="Profile" style={{ width: 200, height: 200, marginBottom: 16 }} />
                            <InputLabel htmlFor="fileInput">Upload File</InputLabel>
                                    <Input
                                        type="file"
                                        id="fileInput"
                                        disabled={!appEdit}
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
                                disabled={!appEdit}
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
                                type="date"
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

                        <Box sx={{ padding: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Address</Typography>
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

                        <Box sx={{ padding: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Contact Information</Typography>
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

                        <Box sx={{ padding: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Employment</Typography>
                            <TextField
                                label="Visa Type"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={userData.application.workAuthorization.type}
                                name="type"
                                disabled={!appEdit}
                                onChange={handleWorkChange}
                            />
                            <TextField
                                label="Start Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                value={userData.application.workAuthorization.startDate}
                                name="startDate"
                                disabled={!appEdit}
                                onChange={handleWorkChange}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                value={userData.application.workAuthorization.endDate}
                                name="endDate"
                                disabled={!appEdit}
                                onChange={handleWorkChange}
                            />
                        </Box>

                        
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Emergency Contact:</Typography>
                            {userData.application.emergency.map((contact, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mt: 2 }}>Contact {index+1}</Typography>
                                    <TextField
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={contact.firstName}
                                        disabled
                                    />
                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={contact.lastName}
                                        disabled
                                    />
                                    <TextField
                                        label="Middle Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={contact.middleName}
                                        disabled
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={contact.email}
                                        disabled
                                    />
                                    <TextField
                                        label="Phone"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={contact.phone}
                                        disabled
                                    />
                                    <TextField
                                        label="Relationship"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={contact.relationship}
                                        disabled
                                    />
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ padding: 2, marginTop: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Documents</Typography>
                                    <InputLabel shrink>Driver License</InputLabel>
                                    <Input
                                        fullWidth
                                        value={userData.application.driverLicense.document}
                                        disabled
                                        readOnly
                                    />
                                    <InputLabel shrink>Work Authorization</InputLabel>
                                    <Input
                                        fullWidth
                                        value={userData.application.workAuthorization.document}
                                        disabled
                                        readOnly
                                    />
                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                <Button variant="contained" onClick={handleAppEdit} sx={{ display: appEdit ? 'none' : 'flex' }}>Edit</Button>
                                <Button variant="contained" color="primary" onClick={handleAppEditSave} sx={{ display: appEdit ? 'flex' : 'none' }}>Save</Button>
                                <Button variant="contained" color="secondary" onClick={handleAppEditCancel} sx={{ display: appEdit ? 'flex' : 'none' }}>Cancel</Button>
                            </Box>
                        </Box>
                    
                    </div>
                </div>
            )}
    </>
  );
}

export default Profile;