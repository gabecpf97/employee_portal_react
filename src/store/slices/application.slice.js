import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchApplication = createAsyncThunk(
  "application/fetchApp",
  async () => {
    const response = await fetch(`http://localhost:3000/application/getMy`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log("handle error in fetchApplication", data);
    } else {
      if (data.application._id) {
        return data.application;
      }
      return { status: "not start" };
    }
  }
);

const applicationAdapter = createEntityAdapter({
  selectId: (application) => application._id,
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
