import {createSlice} from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problem",
    initialState: {
        problems: [],
        loading: false,
        error: null,
        currentProblem: null,

    },
    reducers: {
        fetchProblemStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProblemSuccess: (state, action) => {
            state.loading = false;
            state.problems = action.payload;
            state.error = null;
        },
        fetchProblemFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentProblem: (state, action) => {
            state.currentProblem = action.payload;
        },
        clearCurrentProblem: (state) => {
            state.currentProblem = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
})

export default problemSlice.reducer;