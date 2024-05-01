import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchApplication = createAsyncThunk(
  "application/fetchApp",
  async (applicationId) => {
    // const response = await fetch(
    //   `http://localhost:3000/application/${applicationId}`
    // );
    // const data = await response.json();
    // if (!response.ok) {
    //   console.log("handle error in fetchApplication");
    // } else {
    //   return data;
    // }
    return {};
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
  },
});

export const getApplication = applicationAdapter.getSelectors(
  (state) => state.application
);

export const { setApplication } = applicationSlice.actions;

const applicationReducer = applicationSlice.reducer;
export default applicationReducer;
