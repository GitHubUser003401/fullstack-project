import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setloading: (state) => {
            state.loading = true;
        },
        clearLoading: (state) => {
            state.loading = false;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        }
    }
}
)

export default authSlice.reducer;