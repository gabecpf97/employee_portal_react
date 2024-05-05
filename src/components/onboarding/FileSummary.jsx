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
          <Button
            component="a"
            variant="contained"
            rel="noopener"
            target="_blank"
            href={application.picture}
          >
            Open document
          </Button>
          <h4>Driver Licence: </h4>
          <Button
            component="a"
            variant="contained"
            rel="noopener"
            target="_blank"
            href={application.driverLicense.document}
          >
            Open document
          </Button>
          <h4>Work Authorization: </h4>
          <Button
            component="a"
            variant="contained"
            rel="noopener"
            target="_blank"
            href={application.workAuthorization.document}
          >
            Open document
          </Button>
        </>
      )}
    </div>
  );
};

export default FileSummary;
