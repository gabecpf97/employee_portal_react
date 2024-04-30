/* eslint-disable react/prop-types */
const FormField = ({ fieldName, type, changeFn, value, isRequire }) => {
  return (
    <div className="form_field">
      <label>{fieldName}</label>
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
