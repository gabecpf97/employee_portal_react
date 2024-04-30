/* eslint-disable react/prop-types */
import FormField from "./FormField";

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
      <FormField
        fieldName="Profile Picture"
        type="file"
        changeFn={(e) => onProfilePicChange(e)}
        isRequire={false}
      />
      <FormField
        fieldName="SSN"
        type="text"
        changeFn={(e) => onSsnChange(e)}
        value={ssn}
        isRequire={true}
      />
      <FormField
        fieldName="Date of Birth"
        type="Date"
        changeFn={(e) => onDobChange(e)}
        value={dob}
        isRequire={false}
      />
      <label>Gender: </label>
      <div className="form_field">
        <select onChange={(e) => onGenderChange(e)}>
          <option value=""></option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="empty">I do not wish to answer</option>
        </select>
      </div>
    </div>
  );
};

export default UserInfoForm;
