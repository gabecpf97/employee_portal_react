/* eslint-disable react/prop-types */
import FormField from "./FormField";

const PhoneForm = (props) => {
  const { onCellPhoneChange, onWorkPhoneChange, cellphone, workphone } = props;
  return (
    <div className="phone_info">
      <h3>Contact information</h3>
      <FormField
        fieldName="Cell Phone number"
        type="text"
        changeFn={(e) => onCellPhoneChange(e)}
        value={cellphone}
        isRequire={true}
      />
      <FormField
        fieldName="Work Phone number"
        type="text"
        changeFn={(e) => onWorkPhoneChange(e)}
        value={workphone}
        isRequire={false}
      />
    </div>
  );
};

export default PhoneForm;
