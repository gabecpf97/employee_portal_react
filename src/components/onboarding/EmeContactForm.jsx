/* eslint-disable react/prop-types */
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
        changeFn={(e) => onChangeToField(e, "fname")}
        value={contact.fname}
        isRequire={false}
      />
      <FormField
        fieldName="Last Name"
        type="text"
        changeFn={(e) => onChangeToField(e, "lname")}
        value={contact.lname}
        isRequire={false}
      />
      <FormField
        fieldName="Middle Name"
        type="text"
        changeFn={(e) => onChangeToField(e, "mname")}
        value={contact.mname}
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
        changeFn={(e) => onChangeToField(e, "rel")}
        value={contact.rel}
        isRequire={false}
      />
      {i > 0 && (
        <button type="button" onClick={() => onRemoveContact(i)}>
          Remove Contact
        </button>
      )}
      <hr></hr>
    </div>
  );
};

export default EmeContactForm;
