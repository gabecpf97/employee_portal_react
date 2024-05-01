import { useSelector } from "react-redux";
import { getApplication } from "../../store/slices/application.slice";

const FileSummary = () => {
  const application = useSelector(getApplication.selectAll)[0];

  return (
    <div className="file_summary">
      <h3>Files uploaded: </h3>
      <h4>Profile Picture: {application.picture}</h4>
      <h4>Driver Licence: {application.driverLicense.document}</h4>
      <h4>Work Authorization: {application.workAuthorization.document}</h4>
    </div>
  );
};

export default FileSummary;
