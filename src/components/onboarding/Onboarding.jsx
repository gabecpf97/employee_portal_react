import { useEffect } from "react";
import OnboardingForm from "./OnboardingForm";
import FileSummary from "./FileSummary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchApplication,
  getApplication,
} from "../../store/slices/application.slice";

const Onboarding = () => {
  const application = useSelector(getApplication.selectAll)[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchApplication());
  }, [dispatch]);

  useEffect(() => {
    if (application && application.status === "approved") {
      navigate("/");
    }
  }, [application, navigate]);

  return (
    <div className="onboarding">
      {application && (
        <>
          <h2>Application status: {application.status}</h2>
          {application.status === "pending" && (
            <div className="application_pending">
              <h3>Pending Please wait for HR to review your application.</h3>
            </div>
          )}
          {application.status !== "not start" && (
            <div className="application_feedback">
              {application.status === "rejected" && (
                <>
                  <h3>Feedback: </h3>
                  <p>{application.feedback}</p>
                </>
              )}
              <FileSummary />
            </div>
          )}
        </>
      )}
      <OnboardingForm />
    </div>
  );
};

export default Onboarding;
