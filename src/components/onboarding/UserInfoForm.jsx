/* eslint-disable react/prop-types */
import FormField from "./FormField";
import { Select, MenuItem, Input, InputLabel, TextField } from "@mui/material";

const UserInfoForm = (props) => {
  const {
    onUserFirstNameChange,
    onUserLastNameChange,
    onUserMiddleNameChange,
    onUserPreferedNameChange,
    onProfilePicChange,
    onSsnChange,
    onDobChange,
    onGenderChange,
    userFirstName,
    userLastName,
    userMiddleName,
    userPreferedName,
    ssn,
    dob,
    gender,
  } = props;

  return (
    <div className="user_info">
      <h3>User Information</h3>
      <FormField
        fieldName="First Name"
        type="text"
        changeFn={(e) => onUserFirstNameChange(e)}
        value={userFirstName}
        isRequire={true}
      />
      <FormField
        fieldName="Last Name"
        type="text"
        changeFn={(e) => onUserLastNameChange(e)}
        value={userLastName}
        isRequire={true}
      />
      <FormField
        fieldName="Middle Name"
        type="text"
        changeFn={(e) => onUserMiddleNameChange(e)}
        value={userMiddleName}
        isRequire={false}
      />
      <FormField
        fieldName="Prefered Name"
        type="text"
        changeFn={(e) => onUserPreferedNameChange(e)}
        value={userPreferedName}
        isRequire={false}
      />
      <InputLabel>Profile Picture: </InputLabel>
      <Input
        type="file"
        variant="standard"
        onChange={(e) => onProfilePicChange(e)}
      />
      <FormField
        fieldName="SSN"
        type="text"
        changeFn={(e) => onSsnChange(e)}
        value={ssn}
        isRequire={true}
      />
      <InputLabel>Date of Birth</InputLabel>
      <TextField
        type="Date"
        variant="standard"
        onChange={(e) => onDobChange(e)}
        value={dob}
        required={true}
        inputProps={{ max: new Date().toISOString().split("T")[0] }}
      />
      <InputLabel>Gender</InputLabel>
      <Select
        variant="standard"
        value={gender}
        onChange={(e) => onGenderChange(e)}
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value="male">male</MenuItem>
        <MenuItem value="female">female</MenuItem>
        <MenuItem value="empty">I do not wish to answer</MenuItem>
      </Select>
    </div>
  );
};

export default UserInfoForm;
