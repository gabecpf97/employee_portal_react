import { useSelector } from "react-redux";
import { getApplication } from "../../store/slices/application.slice";
import { useState } from "react";
import { Button } from "@mui/material";

const FileSummary = () => {
  const application = useSelector(getApplication.selectAll)[0];
  const [toogle, setToogle] = useState(false);

  return (
    <div className="file_summary">
      <h3>Files uploaded: </h3>
      <Button variant="contained" onClick={() => setToogle((prev) => !prev)}>
        {toogle ? "collapse" : "show"}
      </Button>
      {toogle && (
        <>
          <h4>Profile Picture: </h4>
          <img src={application.picture} />
          <h4>Driver Licence: </h4>
          <img src={application.driverLicense.document} />
          <h4>Work Authorization: </h4>
          <img src={application.workAuthorization.document} />
        </>
      )}
    </div>
  );
};

export default FileSummary;
