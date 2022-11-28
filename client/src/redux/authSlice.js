import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        access_token: ''
    },
    reducers: {
        setAuth: (state, payload) => {
            state.access_token = payload.payload.access_token;
            state.user = payload.payload.user;
        }
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;