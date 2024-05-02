import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useSelector, useDispatch } from 'react-redux';
import Button from "@mui/material/Button";
import axios from 'axios';

function Profile() {
    const navigate = useNavigate();
    //const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [userEdit, setUserEdit] = useState(false);
    const [appEdit, setAppEdit] = useState(false);

    
    const token = localStorage.getItem("authToken");
    // const user = useSelector(state => state.user);
    // const { userId, userStatus } = user;
    const userId = localStorage.getItem("userId");
    const userStatus = localStorage.getItem("userStatus");

    
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userStatus");
        localStorage.setItem("isLoggedIn",false)
        navigate("/login");
    };

    useEffect(() => {
        // Redirect if not authenticated
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
        <p>status is {userStatus}, userId is {userId}, token is {token}</p>
        <h1>Personal Profile</h1>
        <Button onClick={handleLogout}>Logout</Button>
        {userData && (
                <div>
                    <div>
                        <h3>Account Information</h3>
                        <label>Username:</label>
                        <input 
                            type="text" 
                            value={userData.user.username} 
                            name="username"
                            disabled={!userEdit}
                            onChange={handleValueChange}>
                        </input><br></br>
                        <label>Email:</label>
                        <input 
                            type="text" 
                            value={userData.user.email}
                            name="email" 
                            disabled={!userEdit}
                            onChange={handleValueChange}>
                        </input><br></br>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={userData.user.password}
                            name="password" 
                            disabled={!userEdit}
                            onChange={handleValueChange}>
                        </input><br></br>
                        <Button 
                            onClick={handleUserEdit}
                            style={{ display: userEdit ? 'none' : 'inline-flex' }}
                        >Edit</Button>
                        <Button 
                            onClick={handleUserEditSave} 
                            style={{ display: userEdit ? 'inline-flex':'none' }}
                        >Save</Button>
                        <Button 
                            onClick={handleUserEditCancel} 
                            style={{ display: userEdit ? 'inline-flex':'none' }}
                        >Cancel</Button>

                    </div>
                    <div>
                        <h3>Personal Information</h3>
                        <h5>Basic Information</h5>
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            value={userData.application.firstName} 
                            name="firstName"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>Last Name:</label>
                        <input 
                            type="text" 
                            value={userData.application.lastName} 
                            name="lastName"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>Middle Name:</label>
                        <input 
                            type="text" 
                            value={userData.application.middleName} 
                            name="middleName"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>Preffered Name:</label>
                        <input 
                            type="text" 
                            value={userData.application.preferredName} 
                            name="preferredName"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>Profile Image:</label>
                        <p>{userData.application.picture}</p>
                        <img src={userData.application.picture} width="200px" height="200px"></img><br></br>

                        <label>Email:</label>
                        <input 
                            type="text" 
                            value={userData.application.email} 
                            name="email"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>SSN:</label>
                        <input 
                            type="text" 
                            value={userData.application.SSN} 
                            name="SSN"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>Date of Birth:</label>
                        <input 
                            type="text" 
                            value={userData.application.DOB} 
                            name="DOB"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>Gender:</label>
                        <input 
                            type="text" 
                            value={userData.application.gender} 
                            name="gender"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <h5>Address</h5>
                        <label>Building/Apt Number:</label>
                        <input 
                            type="text" 
                            value={userData.application.address.buildingAptNum} 
                            name="buildingAptNum"
                            disabled={!appEdit}
                            onChange={handleAddressChange}>
                        </input><br></br>

                        <label>Street Name:</label>
                        <input 
                            type="text" 
                            value={userData.application.address.street} 
                            name="street"
                            disabled={!appEdit}
                            onChange={handleAddressChange}>
                        </input><br></br>

                        <label>City:</label>
                        <input 
                            type="text" 
                            value={userData.application.address.city} 
                            name="city"
                            disabled={!appEdit}
                            onChange={handleAddressChange}>
                        </input><br></br>

                        <label>State:</label>
                        <input 
                            type="text" 
                            value={userData.application.address.state} 
                            name="state"
                            disabled={!appEdit}
                            onChange={handleAddressChange}>
                        </input><br></br>

                        <label>Zip Code:</label>
                        <input 
                            type="text" 
                            value={userData.application.address.zip} 
                            name="zip"
                            disabled={!appEdit}
                            onChange={handleAddressChange}>
                        </input><br></br>

                        <h5>Contact Information</h5>
                        <label>Cell Phone:</label>
                        <input 
                            type="text" 
                            value={userData.application.cellPhone} 
                            name="cellPhone"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <label>Work Phone:</label>
                        <input 
                            type="text" 
                            value={userData.application.workPhone} 
                            name="workPhone"
                            disabled={!appEdit}
                            onChange={handleAppValueChange}>
                        </input><br></br>

                        <h5>Employment</h5>
                        <label>Visa Type:</label>
                        <input 
                            type="text" 
                            value={userData.application.workAuthorization.type} 
                            name="type"
                            disabled={!appEdit}
                            onChange={handleWorkChange}>
                        </input><br></br>

                        <label>Start Date:</label>
                        <input 
                            type="text" 
                            value={userData.application.workAuthorization.startDate} 
                            name="startDate"
                            disabled={!appEdit}
                            onChange={handleWorkChange}>
                        </input><br></br>

                        <label>End Date:</label>
                        <input 
                            type="text" 
                            value={userData.application.workAuthorization.endDate} 
                            name="endDate"
                            disabled={!appEdit}
                            onChange={handleWorkChange}>
                        </input><br></br>

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
                        <input type="file" id="fileInput"></input>


                        <Button 
                            onClick={handleAppEdit}
                            style={{ display: appEdit ? 'none' : 'inline-flex' }}
                        >Edit</Button>
                        <Button 
                            onClick={handleAppEditSave} 
                            style={{ display: appEdit ? 'inline-flex':'none' }}
                        >Save</Button>
                        <Button 
                            onClick={handleAppEditCancel} 
                            style={{ display: appEdit ? 'inline-flex':'none' }}
                        >Cancel</Button>
                    
                    </div>
                </div>
            )}
    </>
  );
}

export default Profile;