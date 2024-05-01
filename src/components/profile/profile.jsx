import { useEffect, useState } from "react";
import axios from 'axios';

// import { useDispatch } from "react-redux";
// import { setUsername } from "../store/slices/user.slice";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import { Input, Button } from "@mui/material";

function Profile() {
    const status = localStorage.getItem("status");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

  return (
    <>
        <p>status is {status}, userId is {userId}, token is {token}</p>
        <h1>Personal Profile</h1>
        {userData && (
                <div>
                    <div>
                        <h3>Account Information</h3>
                        <label>Username:</label>
                        <input type="text" value={userData.user.username} disabled></input><br></br>
                        <label>Email:</label>
                        <input type="text" value={userData.user.email} disabled></input><br></br>
                        <label>Password:</label>
                        <input type="password" value={userData.user.password} disabled></input><br></br>
                    </div>
                    <div>
                        <h3>Personal Information</h3>
                        <h5>Basic Information</h5>
                        <label>First Name:</label>
                        <input type="text" value={userData.application.firstName} disabled></input><br></br>
                        <label>Last Name:</label>
                        <input type="text" value={userData.application.lastName} disabled></input><br></br>
                        <label>Middle Name:</label>
                        <input type="text" value={userData.application.middleName} disabled></input><br></br>
                        <label>Preffered Name:</label>
                        <input type="text" value={userData.application.prefferedName} disabled></input><br></br>
                        <label>Profile Image:</label>
                        <p>{userData.application.picture}</p>
                        <label>Email:</label>
                        <input type="text" value={userData.application.email} disabled></input><br></br>
                        <label>SSN:</label>
                        <input type="text" value={userData.application.SSN} disabled></input><br></br>
                        <label>Date of Birth:</label>
                        <input type="text" value={userData.application.DOB} disabled></input><br></br>
                        <label>Gender:</label>
                        <input type="text" value={userData.application.gender} disabled></input><br></br>

                        <h5>Address</h5>
                        <label>Building/Apt Number:</label>
                        <input type="text" value={userData.application.address.buildingAptNum} disabled></input><br></br>
                        <label>Street Name:</label>
                        <input type="text" value={userData.application.address.street} disabled></input><br></br>
                        <label>City:</label>
                        <input type="text" value={userData.application.address.city} disabled></input><br></br>
                        <label>State:</label>
                        <input type="text" value={userData.application.address.state} disabled></input><br></br>
                        <label>Zip Code:</label>
                        <input type="text" value={userData.application.address.zip} disabled></input><br></br>

                        <h5>Contact Information</h5>
                        <label>Cell Phone:</label>
                        <input type="text" value={userData.application.cellPhone} disabled></input><br></br>
                        <label>Work Phone:</label>
                        <input type="text" value={userData.application.workPhone} disabled></input><br></br>

                        <h5>Employment</h5>
                        <label>Visa Type:</label>
                        <input type="text" value={userData.application.workAuthorization.type} disabled></input><br></br>
                        <label>Start Date:</label>
                        <input type="text" value={userData.application.workAuthorization.startDate} disabled></input><br></br>
                        <label>End Date:</label>
                        <input type="text" value={userData.application.workAuthorization.endDate} disabled></input><br></br>

                        <h5>Emergency Contact:</h5>
                        {userData.application.emergency.map(contact=>{
                            return (
                                <>
                                    <label>First Name:</label>
                                    <input type="text" value={contact.firstName} disabled></input><br></br>
                                    <label>Last Name:</label>
                                    <input type="text" value={contact.lastName} disabled></input><br></br>
                                    <label>Middle Name:</label>
                                    <input type="text" value={contact.middleName} disabled></input><br></br>
                                    <label>Email:</label>
                                    <input type="text" value={contact.email} disabled></input><br></br>
                                    <label>Phone:</label>
                                    <input type="text" value={contact.phone} disabled></input><br></br>
                                    <label>Relationship</label>
                                    <input type="text" value={contact.relationship} disabled></input><br></br>
                                </>
                            )
                        })}

                        <h5>Documents</h5>
                        <label>Driver License:</label>
                        <p>{userData.application.driverLicense.document}</p>
                        <label>Work Authorization:</label>
                        <p>{userData.application.workAuthorization.document}</p>
                    </div>
                </div>
            )}
    </>
  );
}

export default Profile;