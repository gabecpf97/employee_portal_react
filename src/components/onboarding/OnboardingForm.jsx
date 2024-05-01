import { useEffect, useState } from "react";
import UserInfoForm from "./UserInfoForm";
import AddressForm from "./AddressForm";
import PhoneForm from "./PhoneForm";
import CarForm from "./CarForm";
import AuthForm from "./AuthForm";
import ReferenceForm from "./ReferenceForm";
import EmeContactsDiv from "./EmeContacsList";
import {
  getApplication,
  setApplication,
} from "../../store/slices/application.slice";
import { useDispatch, useSelector } from "react-redux";

const defaultContact = {
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
  email: "",
  relationship: "",
};

const OnboardingForm = () => {
  const dispatch = useDispatch();
  const application = useSelector(getApplication.selectAll)[0];
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userPreferedName, setUserPreferedName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [ssn, setSsn] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cellphone, setCellPhone] = useState("");
  const [workphone, setWorkPhone] = useState("");
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [citiBool, setCitiBool] = useState(true);
  const [citiType, setCitiType] = useState("");
  const [formType, setFormType] = useState("");
  const [optReceipt, setOPTReceipt] = useState("");
  const [otherForm, setOtherForm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [driverBool, setDriverBool] = useState(true);
  const [driverNum, setDriverNum] = useState("");
  const [expDate, setExpDate] = useState("");
  const [driverFile, setDriverFile] = useState("");
  const [refFname, setRefFname] = useState("");
  const [refLname, setRefLname] = useState("");
  const [refMname, setRefMname] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [refRel, setRefRel] = useState("");
  const [contacts, setContacts] = useState([defaultContact]);
  const [error, setError] = useState("");

  useEffect(() => {
    // set form value when application is present and status is rejected
    if (application && application.status === "rejected") {
      setUserFirstName(application.firstName);
      setUserLastName(application.lastName);
      setUserMiddleName(application.middleName);
      setUserPreferedName(application.preferedName);
      setProfilePic(application.profilePic);
      setSsn(application.SSN);
      setDob(application.DOB);
      setGender(application.gender);
      setBuilding(application.address.buildingAptNum);
      setStreet(application.address.street);
      setCity(application.address.city);
      setState(application.address.state);
      setZip(application.address.zip);
      setCellPhone(application.cellPhone);
      setWorkPhone(application.workPhone);
      setMaker(application.car.make);
      setModel(application.car.model);
      setColor(application.car.color);
      setCitiBool(application.citizenship ? true : false);
      setCitiType(application.citizenship);
      setFormType(application.workAuthorization.type);
      setOPTReceipt(
        application.workAuthorization
          ? application.workAuthorization.document
          : ""
      );
      setOtherForm(
        application.workAuthorization.type == "other"
          ? application.workAuthorization.document
          : ""
      );
      setStartDate(application.workAuthorization.startDate);
      setEndDate(application.workAuthorization.endDate);
      setDriverBool(application.driverLicense ? true : false);
      setDriverNum(application.driverLicense.number);
      setExpDate(application.driverLicense.expirationDate);
      setDriverFile(application.driverLicense.document);
      setRefFname(application.reference.firstName);
      setRefLname(application.reference.lastName);
      setRefMname(application.reference.middleName);
      setRefPhone(application.reference.phone);
      setRefEmail(application.reference.email);
      setRefRel(application.reference.relationship);
      setContacts(application.emergency);
    }
  }, [application]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      const newApplication = {
        ...application,
        firstName: userFirstName,
        lastName: userLastName,
        middleName: userMiddleName,
        preferedName: userPreferedName,
        picture: profilePic,
        address: JSON.stringify({
          buildingAptNum: building,
          street: street,
          city: city,
          state: state,
          zip: zip,
        }),
        cellPhone: cellphone,
        workPhone: workphone,
        car: JSON.stringify({
          make: maker,
          model: model,
          color: color,
        }),
        email: "email@email.com", //get from token
        SSN: ssn,
        DOB: dob,
        gender: gender,
        citizenship: citiType ? citiType : "non-citizen",
        workAuthorization_type: formType,
        workAuthorization_document: optReceipt,
        workAuthorization_startDate: startDate,
        workAuthorization_endDate: endDate,
        driverLicense_number: driverNum,
        driverLicense_expirationDate: expDate,
        driverLicense_document: driverFile,
        reference: JSON.stringify({
          firstName: refFname,
          lastName: refLname,
          phone: refPhone,
          email: refEmail,
          relationship: refRel,
        }),
        emergency: contacts,
        feedback: "",
      };
      // if (localStorage.getItem("status") === "not start") {
      newApplication.userId = "662aab44ea0ffbbd333fae26"; // for testing
      newApplication.status = "not start"; // for testing
      // }
      const formData = new FormData();
      for (const key in newApplication) {
        if (key === "emergency") {
          contacts.forEach((value, idx) => {
            formData.append(`emergency[${idx}]`, JSON.stringify(value));
          });
        } else {
          formData.append(key, newApplication[key]);
        }
      }
      let url = "http://localhost:3000/application/create";
      let method = "POST";
      if (application.status === "rejected") {
        url = `http://localhost:3000/application/update/${application._id}`;
        method = "PUT";
      }
      const response = await fetch(url, {
        method: method,
        body: formData,
        headers: {
          authorization: `bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        console.log(data.application);
        dispatch(setApplication(data.application));
        localStorage.setItem("status", "pending");
      }
    }
  };

  const onUserFirstNameChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setUserFirstName(e.target.value);
    }
  };

  const onUserLastNameChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setUserLastName(e.target.value);
    }
  };

  const onUserMiddleNameChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setUserMiddleName(e.target.value);
    }
  };

  const onUserPreferedNameChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setUserPreferedName(e.target.value);
    }
  };

  const onProfilePicChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setProfilePic(e.target.files[0]);
    }
  };

  const onSsnChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setSsn(e.target.value);
    }
  };

  const onDobChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setDob(e.target.value);
    }
  };

  const onGenderChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setGender(e.target.value);
    }
  };

  const onBuildingChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setBuilding(e.target.value);
    }
  };

  const onStreetChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setStreet(e.target.value);
    }
  };

  const onCityChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setCity(e.target.value);
    }
  };

  const onStateChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setState(e.target.value);
    }
  };

  const onZipChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setZip(e.target.value);
    }
  };

  const onCellPhoneChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setCellPhone(e.target.value);
    }
  };

  const onWorkPhoneChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setWorkPhone(e.target.value);
    }
  };

  const onMakerChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setMaker(e.target.value);
    }
  };

  const onModelChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setModel(e.target.value);
    }
  };

  const onColorChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setColor(e.target.value);
    }
  };

  const onCitiBoolChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      if (e.target.value === "true") {
        setCitiBool(true);
      } else {
        setCitiBool(false);
      }
    }
  };

  const onCitiTypeChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setCitiType(e.target.value);
    }
  };

  const onFormTypeChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setFormType(e.target.value);
    }
  };

  const onOPtReceiptChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setOPTReceipt(e.target.files[0]);
    }
  };

  const onOtherFormChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setOtherForm(e.target.value);
    }
  };

  const onStartDateChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setStartDate(e.target.value);
    }
  };

  const onEndDateChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setEndDate(e.target.value);
    }
  };

  const onDriverBoolChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      if (e.target.value === "true") {
        setDriverBool(true);
      } else {
        setDriverBool(false);
      }
    }
  };

  const onDriverNumChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setDriverNum(e.target.value);
    }
  };

  const onExpDateChagne = (e) => {
    setExpDate(e.target.value);
  };

  const onDriverFileChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setDriverFile(e.target.files[0]);
    }
  };

  const onRefFnameChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setRefFname(e.target.value);
    }
  };

  const onRefLnameChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setRefLname(e.target.value);
    }
  };

  const onRefMnameChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setRefMname(e.target.value);
    }
  };

  const onRefPhoneChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setRefPhone(e.target.value);
    }
  };

  const onRefEmailChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setRefEmail(e.target.value);
    }
  };

  const onRefrelChange = (e) => {
    if (
      application &&
      application.status !== "pending" &&
      application.status !== "approved"
    ) {
      setRefRel(e.target.value);
    }
  };

  const onContentChange = (field, fieldValue, index) => {
    setContacts((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], [field]: fieldValue };
      return newList;
    });
  };

  const onAddContact = () => {
    setContacts((prevList) => [...prevList, defaultContact]);
  };

  const onRemoveContact = (idx) => {
    setContacts((prevList) => {
      return prevList.filter((_contact, index) => index !== idx);
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3>Onboarding Application</h3>
      {error && <h4>{error}</h4>}
      <UserInfoForm
        onUserFirstNameChange={onUserFirstNameChange}
        onUserLastNameChange={onUserLastNameChange}
        onUserMiddleNameChange={onUserMiddleNameChange}
        onUserPreferedNameChange={onUserPreferedNameChange}
        onProfilePicChange={onProfilePicChange}
        onSsnChange={onSsnChange}
        onDobChange={onDobChange}
        onGenderChange={onGenderChange}
        userFirstName={userFirstName}
        userLastName={userLastName}
        userMiddleName={userMiddleName}
        userPreferedName={userPreferedName}
        ssn={ssn}
        dob={dob}
        gender={gender}
        profilePic={profilePic}
      />
      <AddressForm
        onBuildingChange={onBuildingChange}
        onStreetChange={onStreetChange}
        onCityChange={onCityChange}
        onStateChange={onStateChange}
        onZipChange={onZipChange}
        building={building}
        street={street}
        city={city}
        state={state}
        zip={zip}
      />
      <PhoneForm
        onCellPhoneChange={onCellPhoneChange}
        onWorkPhoneChange={onWorkPhoneChange}
        cellphone={cellphone}
        workphone={workphone}
        email="empty@email.com"
      />
      <CarForm
        onMakerChange={onMakerChange}
        onModelChange={onModelChange}
        onColorChange={onColorChange}
        maker={maker}
        model={model}
        color={color}
      />
      <AuthForm
        onCitiBoolChange={onCitiBoolChange}
        onCitiTypeChange={onCitiTypeChange}
        onFormTypeChange={onFormTypeChange}
        onOPtReceiptChange={onOPtReceiptChange}
        onOtherFormChange={onOtherFormChange}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onDriverBoolChange={onDriverBoolChange}
        onDriverNumChange={onDriverNumChange}
        onExpDateChagne={onExpDateChagne}
        onDriverFileChange={onDriverFileChange}
        citiBool={citiBool}
        citiType={citiType}
        formType={formType}
        optReceipt={optReceipt}
        otherForm={otherForm}
        startDate={startDate}
        endate={endDate}
        driverBool={driverBool}
        driverNum={driverNum}
        expDate={expDate}
        driverFile={driverFile}
      />
      <ReferenceForm
        onRefFnameChange={onRefFnameChange}
        onRefLnameChange={onRefLnameChange}
        onRefMnameChange={onRefMnameChange}
        onRefPhoneChange={onRefPhoneChange}
        onRefEmailChange={onRefEmailChange}
        onRefrelChange={onRefrelChange}
        refFname={refFname}
        refLname={refLname}
        refMname={refMname}
        refPhone={refPhone}
        refEmail={refEmail}
        refRel={refRel}
      />
      <EmeContactsDiv
        contacts={contacts}
        onFieldChange={onContentChange}
        onAddContact={onAddContact}
        onRemoveContact={onRemoveContact}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default OnboardingForm;
