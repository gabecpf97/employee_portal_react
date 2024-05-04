/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import FormField from "./FormField";

const EmeContactForm = (props) => {
  const { i, contact, onChange, onRemoveContact } = props;

  const onChangeToField = (e, field) => {
    onChange(field, e.target.value, i);
  };

  return (
    <div className="emergency_contact">
      <FormField
        fieldName="First Name"
        type="text"
        changeFn={(e) => onChangeToField(e, "firstName")}
        value={contact.firstName}
        isRequire={false}
      />
      <FormField
        fieldName="Last Name"
        type="text"
        changeFn={(e) => onChangeToField(e, "lastName")}
        value={contact.lastName}
        isRequire={false}
      />
      <FormField
        fieldName="Middle Name"
        type="text"
        changeFn={(e) => onChangeToField(e, "middleName")}
        value={contact.middleName}
        isRequire={false}
      />
      <FormField
        fieldName="phone"
        type="text"
        changeFn={(e) => onChangeToField(e, "phone")}
        value={contact.phone}
        isRequire={false}
      />
      <FormField
        fieldName="email"
        type="email"
        changeFn={(e) => onChangeToField(e, "email")}
        value={contact.email}
        isRequire={false}
      />
      <FormField
        fieldName="relationship"
        type="text"
        changeFn={(e) => onChangeToField(e, "relationship")}
        value={contact.relationship}
        isRequire={false}
      />
      {i > 0 && (
        <Button
          variant="contained"
          type="button"
          onClick={() => onRemoveContact(i)}
        >
          Remove Contact
        </Button>
      )}
    </div>
  );
};

export default EmeContactForm;
