import {} from "react";

/* eslint-disable react/prop-types */
const FormField = ({ fieldName, type, changeFn, value, isRequire }) => {
  return (
    <div className="form_field">
      <label>{fieldName}</label>
      {isRequire && <span>*: </span>}
      <input
        type={type}
        onChange={(e) => changeFn(e)}
        value={value ? value : ""}
        required={isRequire}
      ></input>
    </div>
  );
};

export default FormField;
