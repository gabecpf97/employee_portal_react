import { TextField } from "@mui/material";

/* eslint-disable react/prop-types */
const FormField = ({ fieldName, type, changeFn, value, isRequire }) => {
  return (
    <div className="form_field">
      <TextField
        variant="standard"
        type={type}
        label={fieldName}
        onChange={(e) => changeFn(e)}
        value={value ? value : ""}
        required={isRequire}
      />
    </div>
  );
};

export default FormField;
