import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const postApplication = createAsyncThunk(
  "application/postApp",
  async (theApplication) => {
    console.log(theApplication);
    // const response = await fetch("url", {
    //   method: "POST",
    //   body: JSON.stringify(theApplication),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // if (!response.ok) {
    //   console.log("error handle");
    // } else {
    //   return data;
    // }
    return theApplication;
  }
);

export const fetchApplication = createAsyncThunk(
  "application/fetchApp",
  async () => {
    // const response = await fetch("url");
    // const data = await response.json();
    // return data;
    return {
      userId: "662aa98ddcb7046f12c52e6b",
      status: "rejected",
      firstName: "king",
      lastName: "First",
      middleName: "mid",
      preferedName: "king1",
      picture: "",
      address: {
        buildingAptNum: 123,
        street: "street 1",
        city: "New York",
        state: "New York",
        zip: "12345",
      },
      cellPhone: "1234567890",
      workPhone: "9876543210",
      car: {
        make: "Honda",
        model: "Hr-v",
        color: "silver",
      },
      email: "mail@email.com",
      SSN: "12345",
      DOB: "2022-04-29",
      gender: "male",
      citizenship: "non-citizen",
      workAuthorization: {
        type: "f1opt",
        document: "sample",
        startDate: "2022-04-29T12:00:00Z",
        endDate: "2022-04-29T12:00:00Z",
      },
      driverLicense: {
        number: "123",
        expirationDate: "123",
        document: "sample",
      },
      reference: {
        firstName: "ref1",
        lastName: "refL",
        phone: "123",
        email: "email",
        relationship: "sample",
      },
      emergency: [
        {
          firstName: "em1",
          lastName: "emL",
          phone: "123",
          email: "email",
          relationship: "sample",
        },
      ],
      feedback: "feedback",
    };
  }
);

const applicationAdapter = createEntityAdapter({
  selectId: (application) => application.userId,
});

const applicationSlice = createSlice({
  name: "application",
  initialState: applicationAdapter.getInitialState(),
  reducers: {
    setApplication: applicationAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApplication.fulfilled, (state, action) => {
      applicationAdapter.setOne(state, action.payload);
    });
    builder.addCase(postApplication.fulfilled, (state, action) => {
      applicationAdapter.setOne(state, action.payload);
    });
  },
});

export const getApplication = applicationAdapter.getSelectors(
  (state) => state.application
);

export const { setApplication } = applicationSlice.actions;

const applicationReducer = applicationSlice.reducer;
export default applicationReducer;
