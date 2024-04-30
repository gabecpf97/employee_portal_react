/* eslint-disable react/prop-types */
import FormField from "./FormField";

const ReferenceForm = (props) => {
  const {
    onRefFnameChange,
    onRefLnameChange,
    onRefMnameChange,
    onRefPhoneChange,
    onRefEmailChange,
    onRefrelChange,
    refFname,
    refLname,
    refMname,
    refPhone,
    refEmail,
    refRel,
  } = props;
  return (
    <div className="reference_field">
      <h3>Reference</h3>
      <FormField
        fieldName="First Name"
        type="text"
        changeFn={(e) => onRefFnameChange(e)}
        value={refFname}
        isRequire={false}
      />
      <FormField
        fieldName="Last Name"
        type="text"
        changeFn={(e) => onRefLnameChange(e)}
        value={refLname}
        isRequire={false}
      />
      <FormField
        fieldName="Middle Name"
        type="text"
        changeFn={(e) => onRefMnameChange(e)}
        value={refMname}
        isRequire={false}
      />
      <FormField
        fieldName="phone"
        type="text"
        changeFn={(e) => onRefPhoneChange(e)}
        value={refPhone}
        isRequire={false}
      />
      <FormField
        fieldName="email"
        type="email"
        changeFn={(e) => onRefEmailChange(e)}
        value={refEmail}
        isRequire={false}
      />
      <FormField
        fieldName="relationship"
        type="text"
        changeFn={(e) => onRefrelChange(e)}
        value={refRel}
        isRequire={false}
      />
    </div>
  );
};

export default ReferenceForm;
