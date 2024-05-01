import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    housingInfo: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

// Async thunk to fetch housing data
export const fetchHousingById = createAsyncThunk(
    'housing/fetchHousingById', 
    async (housingId, thunkAPI) => {
        const token = localStorage.getItem('authToken');
        // console.log(token);
        try {
            const response = await axios.get(
                `http://localhost:3000/housing/${housingId}`,
                {headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
});

export const housingSlice = createSlice({
    name: 'housing',
    initialState,
    reducers: {
        updateHousingInfo: (state, action) => {
            // Updates the entire housingInfo object
            state.housingInfo = action.payload;
        },
        // updateAddress: (state, action) => {
        //     // Updates only the address part of housingInfo
        //     state.housingInfo.address = action.payload;
        // },
    },
    extraReducers(builder) {
    builder
        .addCase(fetchHousingById.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(fetchHousingById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.housingInfo = action.payload;
        })
        .addCase(fetchHousingById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        });
    }
});

export const { updateHousingInfo, updateAddress } = housingSlice.actions;

export default housingSlice.reducer;