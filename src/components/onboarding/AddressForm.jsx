/* eslint-disable react/prop-types */
import FormField from "./FormField";

const AddressForm = (props) => {
  const {
    onBuildingChange,
    onStreetChange,
    onCityChange,
    onStateChange,
    onZipChange,
    building,
    street,
    city,
    state,
    zip,
  } = props;

  return (
    <div className="current_address_field">
      <h3>Current address</h3>
      <FormField
        fieldName="Building/apt #"
        type="text"
        changeFn={(e) => onBuildingChange(e)}
        value={building}
        isRequire={true}
      />
      <FormField
        fieldName="Street name"
        type="text"
        changeFn={(e) => onStreetChange(e)}
        value={street}
        isRequire={true}
      />
      <FormField
        fieldName="City"
        type="text"
        changeFn={(e) => onCityChange(e)}
        value={city}
        isRequire={true}
      />
      <FormField
        fieldName="State"
        type="text"
        changeFn={(e) => onStateChange(e)}
        value={state}
        isRequire={true}
      />
      <FormField
        fieldName="Zip"
        type="text"
        changeFn={(e) => onZipChange(e)}
        value={zip}
        isRequire={true}
      />
    </div>
  );
};

export default AddressForm;
