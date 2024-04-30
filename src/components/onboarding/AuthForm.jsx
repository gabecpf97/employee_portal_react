import FormField from "./FormField";

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
    formType,
    optReceipt,
    otherForm,
    startDate,
    endate,
    driverBool,
    driverNum,
    expDate,
  } = props;
  return (
    <div className="work_authorization_field">
      <h3>Work Authorization</h3>
      <div className="form_field">
        <label>Are you a citizen or permanent resident of the U.S?</label>
        <select value={citiBool} onChange={(e) => onCitiBoolChange(e)}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      {citiBool === true && (
        <div className="citizen_yes">
          <div className="form_field">
            <select onChange={(e) => onCitiTypeChange(e)}>
              <option value="Green Card">Green Card</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>
        </div>
      )}
      {citiBool === false && (
        <div className="citizen_no">
          <h3>What is your work authorization?</h3>
          <div className="form_field">
            <select value={formType} onChange={(e) => onFormTypeChange(e)}>
              <option value="H1-B">H1-B</option>
              <option value="L2">L2</option>
              <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
              <option value="H4">H4</option>
              <option value="other">other</option>
            </select>
          </div>
          {formType === "F1(CPT/OPT)" && (
            <FormField
              fieldName="OPT Receipt"
              type="file"
              changeFn={(e) => onOPtReceiptChange(e)}
              value={optReceipt}
              isRequire={false}
            />
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
          <FormField
            fieldName="Start Date"
            type="Date"
            changeFn={(e) => onStartDateChange(e)}
            value={startDate}
            isRequire={false}
          />
          <FormField
            fieldName="End Date"
            type="Date"
            changeFn={(e) => onEndDateChange(e)}
            value={endate}
            isRequire={false}
          />
        </div>
      )}
      <div className="driver_licenece_field">
        <h3>Driver License</h3>
        <div className="form_field">
          <label>Do you have a driver licenece</label>
          <select onChange={(e) => onDriverBoolChange(e)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {driverBool && (
          <>
            <FormField
              fieldName="driver lincense number"
              type="text"
              changeFn={(e) => onDriverNumChange(e)}
              value={driverNum}
              isRequire={false}
            />
            <FormField
              fieldName="expiration date"
              type="Date"
              changeFn={(e) => onExpDateChagne(e)}
              value={expDate}
              isRequire={false}
            />
            <FormField
              fieldName="upload copy of license"
              type="file"
              changeFn={(e) => onDriverFileChange(e)}
              isRequire={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
