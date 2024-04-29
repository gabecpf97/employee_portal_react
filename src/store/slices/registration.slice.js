import { createSlice } from '@reduxjs/toolkit';

export const registrationSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        password: '',
        email: ''
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { setUsername, setPassword, setEmail } = registrationSlice.actions;

export default registrationSlice.reducer;
