import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchVisa = createAsyncThunk("visa/fetchVisa", async () => {
  // const idResponse = await fetch(`http://localhost:3000/visa/getRequestId`, {
  //   headers: {
  //     authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //   },
  // });
  // const idData = await idResponse.json();
  // if (!idResponse.ok) {
  //   console.log("handle error in fetchVisa");
  // } else {
  //   console.log(idData);
  //   const visaResponse = await fetch(`http://localhost:3000/visa/${idData}`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //     },
  //   });
  //   const data = await visaResponse.json();
  //   if (!visaResponse.ok) {
  //     console.log("error handle in fetchvisa visaresponse");
  //   } else {
  //     console.log(data);
  //     // return data;
  //   }
  // }
  return {
    appId: "123",
    step: "OPTReceipt",
    OPTReceipt: {
      status: "unuploaded",
    },
    OPTEAD: {
      status: "unuploaded",
    },
    I983: {
      status: "unuploaded",
    },
    I20: {
      status: "unuploaded",
    },
  };
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
