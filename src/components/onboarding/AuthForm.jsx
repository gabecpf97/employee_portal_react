import FormField from "./FormField";
import { Select, MenuItem, Input, InputLabel, TextField } from "@mui/material";

/* eslint-disable react/prop-types */
const AuthForm = (props) => {
  const {
    onCitiBoolChange,
    onCitiTypeChange,
    onFormTypeChange,
    onOPtReceiptChange,
    onOtherFormChange,
    onStartDateChange,
    onEndDateChange,
    onDriverBoolChange,
    onDriverNumChange,
    onExpDateChagne,
    onDriverFileChange,
    citiBool,
    citiType,
    formType,
    otherForm,
    startDate,
    endate,
    driverBool,
    driverNum,
    expDate,
    status,
  } = props;
  return (
    <div className="work_authorization_field">
      <h3>Work Authorization</h3>
      <div className="form_field">
        <InputLabel>
          Are you a citizen or permanent resident of the U.S?
        </InputLabel>
        <Select
          variant="standard"
          value={citiBool}
          onChange={(e) => onCitiBoolChange(e)}
        >
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </div>
      {citiBool === true && (
        <div className="citizen_yes">
          <div className="form_field">
            <InputLabel>Citizenship Type</InputLabel>
            <Select
              variant="standard"
              value={citiType}
              onChange={(e) => onCitiTypeChange(e)}
            >
              <MenuItem value="green card">Green Card</MenuItem>
              <MenuItem value="citizen">Citizen</MenuItem>
            </Select>
          </div>
        </div>
      )}
      {citiBool === false && (
        <div className="citizen_no">
          <h3>What is your work authorization?</h3>
          <div className="form_field">
            <InputLabel>Form Type</InputLabel>
            <Select
              variant="standard"
              value={formType}
              onChange={(e) => onFormTypeChange(e)}
            >
              <MenuItem value="H1-B">H1-B</MenuItem>
              <MenuItem value="L2">L2</MenuItem>
              <MenuItem value="F1(CPT/OPT)">F1(CPT/OPT)</MenuItem>
              <MenuItem value="H4">H4</MenuItem>
              <MenuItem value="other">other</MenuItem>
            </Select>
          </div>
          {formType === "F1(CPT/OPT)" && (
            <>
              <InputLabel>OPT Receipt</InputLabel>
              <Input
                type="file"
                variant="standard"
                onChange={(e) => onOPtReceiptChange(e)}
                required={
                  status === "rejected" ? false : formType === "F1(CPT/OPT)"
                }
              />
            </>
          )}
          {formType === "other" && (
            <FormField
              fieldName="Please specific form type"
              type="text"
              changeFn={(e) => onOtherFormChange(e)}
              value={otherForm}
              isRequire={false}
            />
          )}
          <InputLabel>Start Date</InputLabel>
          <TextField
            type="Date"
            variant="standard"
            onChange={(e) => onStartDateChange(e)}
            value={startDate}
            required={false}
            inputProps={{ max: endate }}
          />
          <InputLabel>End Date</InputLabel>
          <TextField
            type="Date"
            variant="standard"
            onChange={(e) => onEndDateChange(e)}
            value={endate}
            required={false}
            inputProps={{ min: startDate }}
          />
        </div>
      )}
      <div className="driver_licenece_field">
        <h3>Driver License</h3>
        <div className="form_field">
          <InputLabel>Do you have a driver licenece</InputLabel>
          <Select
            value={driverBool}
            variant="standard"
            onChange={(e) => onDriverBoolChange(e)}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </div>
        {driverBool && (
          <>
            <FormField
              fieldName="driver lincense number"
              type="text"
              changeFn={(e) => onDriverNumChange(e)}
              value={driverNum}
              isRequire={driverBool}
            />
            <InputLabel>Expiration Date</InputLabel>
            <FormField
              type="Date"
              changeFn={(e) => onExpDateChagne(e)}
              value={expDate}
              isRequire={driverBool}
            />
            <Input
              label="Driver License document"
              type="file"
              onChange={(e) => onDriverFileChange(e)}
              required={status === "rejected" ? false : driverBool}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
