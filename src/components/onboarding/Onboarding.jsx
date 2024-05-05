import { useEffect } from "react";
import { Box, Alert } from "@mui/material";
import OnboardingForm from "./OnboardingForm";
import FileSummary from "./FileSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplication,
  getApplication,
} from "../../store/slices/application.slice";
import OnboardingDisplay from "./OnboardingDisplay";

const Onboarding = () => {
  const application = useSelector((state) =>
    getApplication.selectById(state, "application")
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApplication());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("userStatus", application?.status);
  }, [application]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "15px",
      }}
    >
      <div className="onboarding">
        {application && (
          <Box
            sx={{
              bgcolor: "#5da2e5",
              padding: "5px 10px",
              borderRadius: "5px",
              width: "80vw",
            }}
          >
            <h2>Application status: {application.status}</h2>
            {application.status === "pending" && (
              <div className="application_pending">
                <Alert security="info">
                  Please wait for HR to review your application.
                </Alert>
              </div>
            )}
            {application.status !== "not start" && (
              <div className="application_feedback">
                {application.status === "rejected" && (
                  <>
                    <h3>Feedback: </h3>
                    <Alert severity="info">{application.feedback}</Alert>
                  </>
                )}
                <FileSummary />
              </div>
            )}
          </Box>
        )}
        <div id="onboarding_detail">
          <Box
            sx={{
              bgcolor: "#85baee",
              padding: "5px 10px",
              borderRadius: "5px",
              width: "80vw",
              marginTop: "10px",
            }}
          >
            {application &&
              (application.status === "pending" ||
                application.status === "approved") && <OnboardingDisplay />}
            {application &&
              (application.status === "rejected" ||
                application.status === "not start") && <OnboardingForm />}
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Onboarding;
