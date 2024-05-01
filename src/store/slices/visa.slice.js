import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchVisa = createAsyncThunk("visa/fetchVisa", async () => {
  const idResponse = await fetch(`http://localhost:3000/visa/getRequestId`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  const idData = await idResponse.json();
  if (!idResponse.ok) {
    console.log("handle error in fetchVisa");
  } else {
    const visaResponse = await fetch(
      `http://localhost:3000/visa/${idData.requestId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    const data = await visaResponse.json();
    if (!visaResponse.ok) {
      console.log("error handle in fetchvisa visaresponse");
    } else {
      return data.request;
    }
  }
});

const visaAdapter = createEntityAdapter({ selectId: (visa) => visa.appId });

const visaSlice = createSlice({
  name: "visa",
  initialState: visaAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVisa.fulfilled, (state, action) => {
      visaAdapter.setOne(state, action.payload);
    });
  },
});

export const getVisa = visaAdapter.getSelectors((state) => state.visa);

const visaReducer = visaSlice.reducer;
export default visaReducer;
