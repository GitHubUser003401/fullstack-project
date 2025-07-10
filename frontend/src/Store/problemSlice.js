import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problem",
    initialState: {
        problems: [],
        currentProblem: null,
    },
    reducers: {
        setProblems(state, action) {
            state.problems = action.payload;
        },
        clearProblems(state) {
            state.problems = [];
        },
        setCurrentProblem(state, action) {
            state.currentProblem = action.payload;
        },
        clearCurrentProblem(state) {
            state.currentProblem = null;
        },
    }
})

export default problemSlice.reducer;