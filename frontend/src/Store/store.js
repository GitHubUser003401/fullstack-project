import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice'; // Assuming you have an authSlice.js file
import problemReducer from './problemSlice'; // Assuming you have a problemSlice.js file
import submissionReducer from './SubmissionSlice'; // Assuming you have a SubmissionSlice.js file

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'isAuthenticated']
}
const problemPersistConfig = {
    key: 'problem',
    storage,
    whitelist: ['currentProblem']
}
const submissionPersistConfig = {
    key: 'submission',
    storage,
    whitelist: ['submissions', 'bestSubmission', 'lastSubmission']
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProblemReducer = persistReducer(problemPersistConfig, problemReducer);
const persistedSubmissionReducer = persistReducer(submissionPersistConfig, submissionReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        problem: persistedProblemReducer, // add this line
        submission: persistedSubmissionReducer, // add this line
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store);
