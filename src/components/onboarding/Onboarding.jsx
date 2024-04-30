import { useEffect } from "react";
import OnboardingForm from "./OnboardingForm";
import FileSummary from "./FileSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplication,
  getApplication,
} from "../../store/slices/application.slice";

const Onboarding = () => {
  const application = useSelector(getApplication.selectAll)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApplication());
  }, [dispatch]);

  return (
    <div className="onboarding">
      {application && (
        <>
          {application.status === "rejected" && (
            <div className="application_feedback">
              <h3>Feedback: </h3>
              <p>Feedback here</p>
            </div>
          )}
          {application.status === "pending" && (
            <div className="application_pending">
              <h3>Pending Please wait for HR to review your application.</h3>
            </div>
          )}
          <OnboardingForm />
          <FileSummary />
        </>
      )}
    </div>
  );
};

export default Onboarding;
