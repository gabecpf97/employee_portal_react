import { useSelector } from "react-redux";
import { getApplication } from "../../store/slices/application.slice";

const OnboardingDisplay = () => {
  const application = useSelector((state) =>
    getApplication.selectById(state, "application")
  );

  return (
    <div className="pending_onboarding">
      <h4>User information: </h4>
      <p>Firstname: {application.firstName}</p>
      <p>Lastname: {application.lastName}</p>
      <p>Middlename: {application.middleName}</p>
      <p>preferredName: {application.preferredName}</p>
      <p>
        picture: <img src={application.picture} />
      </p>
      <p>SSN: {application.SSN}</p>
      <p>DOB: {application.DOB}</p>
      <p>gender: {application.gender}</p>
      <h4>Address: </h4>
      <p>buildingAptNum: {application.address.buildingAptNum}</p>
      <p>street: {application.address.street}</p>
      <p>city: {application.address.city}</p>
      <p>state: {application.address.state}</p>
      <p>zip: {application.address.zip}</p>
      <h4>Contact</h4>
      <p>cellPhone: {application.cellPhone}</p>
      <p>workPhone: {application.workPhone}</p>
      <p>email: {application.email}</p>
      <h4>Car information</h4>
      <p>make: {application.car.make}</p>
      <p>model: {application.car.model}</p>
      <p>color: {application.car.color}</p>
      <h4>Citizenship</h4>
      <p>citizenship: {application.citizenship}</p>
      <p>type: {application.workAuthorization.type}</p>
      <p>
        document: <img src={application.workAuthorization.document} />
      </p>
      <p>startDate: {application.workAuthorization.startDate}</p>
      <p>endDate: {application.workAuthorization.endDate}</p>
      <h4>Driver License</h4>
      <p>number: {application.driverLicense.number}</p>
      <p>expirationDate: {application.driverLicense.expirationDate}</p>
      <p>
        document: <img src={application.driverLicense.document} />
      </p>
      <h4>Reference</h4>
      <p>firstName: {application.reference.firstName}</p>
      <p>lastName: {application.reference.lastName}</p>
      <p>middleName: {application.reference.middleName}</p>
      <p>phone: {application.reference.phone}</p>
      <p>email: {application.reference.email}</p>
      <p>relationship: {application.reference.relationship}</p>
      <h4>Emergency Contacts</h4>
      {application.emergency.map((contact, idx) => {
        return (
          <div key={idx}>
            <p>firstName: {contact.firstName}</p>
            <p>lastName: {contact.lastName}</p>
            <p>middleName: {contact.middleName}</p>
            <p>phone: {contact.phone}</p>
            <p>email: {contact.email}</p>
            <p>relationship: {contact.relationship}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingDisplay;