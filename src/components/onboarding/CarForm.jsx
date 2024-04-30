/* eslint-disable react/prop-types */
import FormField from "./FormField";

const CarForm = (props) => {
  const { onMakerChange, onModelChange, onColorChange, maker, model, color } =
    props;

  return (
    <div className="car_info_field">
      <h3>car information</h3>
      <FormField
        fieldName="maker"
        type="text"
        changeFn={(e) => onMakerChange(e)}
        value={maker}
        isRequire={false}
      />
      <FormField
        fieldName="model"
        type="text"
        changeFn={(e) => onModelChange(e)}
        value={model}
        isRequire={false}
      />
      <FormField
        fieldName="color"
        type="text"
        changeFn={(e) => onColorChange(e)}
        value={color}
        isRequire={false}
      />
    </div>
  );
};

export default CarForm;
