import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice'; // Assuming you have an authSlice.js file
import problemReducer from './problemSlice'; // Assuming you have a problemSlice.js file

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'isAuthenticated', 'error']
}
const problemPersistConfig = {
    key: 'problems',
    storage,
    whitelist: ['problems', 'currentProblem', 'error']
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProblemReducer = persistReducer(problemPersistConfig, problemReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        problems: persistedProblemReducer // This will manage authentication state
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})
export const persistor = persistStore(store);
