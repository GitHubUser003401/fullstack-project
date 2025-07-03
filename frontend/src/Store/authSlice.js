import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        },
        logOut: (state) => {
            state.user = null;
            state.loading = false;
            state.isAuthenticated = false;
            state.error = null;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        clearAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export default authSlice.reducer;