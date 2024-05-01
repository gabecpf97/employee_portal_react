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
        value={type !== "file" ? (value ? value : "") : ""}
        required={isRequire}
      ></input>
      {type === "file" && <p>selected file: {value ? value.name : ""}</p>}
    </div>
  );
};

export default FormField;
