import { useState } from "react";
import UserInfoForm from "./UserInfoForm";
import AddressForm from "./AddressForm";
import PhoneForm from "./PhoneForm";
import CarForm from "./CarForm";
import AuthForm from "./AuthForm";
import ReferenceForm from "./ReferenceForm";
import EmeContactsDiv from "./EmeContacsList";

const defaultContact = {
  fname: "",
  lname: "",
  mname: "",
  phone: "",
  email: "",
  rel: "",
};

const OnboardingForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const application = {
      firstName: userFirstName,
      lastName: userLastName,
      middleName: userMiddleName,
      preferedName: userPreferedName,
      picture: profilePic,
      address: {
        buildingAptNum: building,
        street: street,
        city: city,
        state: state,
        zip: zip,
      },
      cellPhone: cellphone,
      workPhone: workphone,
      car: {
        make: maker,
        model: model,
        color: color,
      },
      email: "email", //get from token
      SSN: ssn,
      DOB: dob,
      gender: gender,
      citizenship: citiType,
      workAuthorization: {
        type: formType,
        document: optReceipt,
        startDate: startDate,
        endDate: endDate,
      },
      driverLicense: {
        number: driverNum,
        expirationDate: expDate,
        document: driverFile,
      },
      reference: {
        firstName: refFname,
        lastName: refLname,
        phone: refPhone,
        email: refEmail,
        relationship: refRel,
      },
      emergency: contacts,
      feedback: "",
    };
    console.log(application);
    try {
      const response = await fetch("url", {
        method: "POST",
        body: JSON.stringify(application),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        // redirect to get application page
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
      // error handle
    }
  };

  const onUserFirstNameChange = (e) => {
    setUserFirstName(e.target.value);
  };

  const onUserLastNameChange = (e) => {
    setUserLastName(e.target.value);
  };

  const onUserMiddleNameChange = (e) => {
    setUserMiddleName(e.target.value);
  };

  const onUserPreferedNameChange = (e) => {
    setUserPreferedName(e.target.value);
  };

  const onProfilePicChange = (e) => {
    setProfilePic(e.target.value);
  };

  const onSsnChange = (e) => {
    setSsn(e.target.value);
  };

  const onDobChange = (e) => {
    setDob(e.target.value);
  };

  const onGenderChange = (e) => {
    setGender(e.target.value);
  };

  const onBuildingChange = (e) => {
    setBuilding(e.target.value);
  };

  const onStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onStateChange = (e) => {
    setState(e.target.value);
  };

  const onZipChange = (e) => {
    setZip(e.target.value);
  };

  const onCellPhoneChange = (e) => {
    setCellPhone(e.target.value);
  };

  const onWorkPhoneChange = (e) => {
    setWorkPhone(e.target.value);
  };

  const onMakerChange = (e) => {
    setMaker(e.target.value);
  };

  const onModelChange = (e) => {
    setModel(e.target.value);
  };

  const onColorChange = (e) => {
    setColor(e.target.value);
  };

  const onCitiBoolChange = (e) => {
    if (e.target.value === "true") {
      setCitiBool(true);
    } else {
      setCitiBool(false);
    }
  };

  const onCitiTypeChange = (e) => {
    setCitiType(e.target.value);
  };

  const onFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  const onOPtReceiptChange = (e) => {
    setOPTReceipt(e.target.value);
  };

  const onOtherFormChange = (e) => {
    setOtherForm(e.target.value);
  };

  const onStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const onEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const onDriverBoolChange = (e) => {
    if (e.target.value === "true") {
      setDriverBool(true);
    } else {
      setDriverBool(false);
    }
  };

  const onDriverNumChange = (e) => {
    setDriverNum(e.target.value);
  };

  const onExpDateChagne = (e) => {
    setExpDate(e.target.value);
  };

  const onDriverFileChange = (e) => {
    setDriverFile(e.target.value);
  };

  const onRefFnameChange = (e) => {
    setRefFname(e.target.value);
  };

  const onRefLnameChange = (e) => {
    setRefLname(e.target.value);
  };

  const onRefMnameChange = (e) => {
    setRefMname(e.target.value);
  };

  const onRefPhoneChange = (e) => {
    setRefPhone(e.target.value);
  };

  const onRefEmailChange = (e) => {
    setRefEmail(e.target.value);
  };

  const onRefrelChange = (e) => {
    setRefRel(e.target.value);
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
        email="empty"
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
        optReceipt={optReceipt}
        otherForm={otherForm}
        startDate={startDate}
        endate={endDate}
        driverBool={driverBool}
        driverNum={driverNum}
        expDate={expDate}
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
