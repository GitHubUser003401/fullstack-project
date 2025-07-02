import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Assuming you have an authSlice.js file

export const store = configureStore({
    reducer: {
        auth: authReducer, // This will manage authentication state
    },
})