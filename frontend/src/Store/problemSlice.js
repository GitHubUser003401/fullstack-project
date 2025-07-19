import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problem",
    initialState: {
        problems: [],
        currentProblem: null,
        tag: "",
        difficulty: "",
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
        setTags(state, action) {
            state.tag = action.payload;
        },
        setDifficulties(state, action) {
            state.difficulty = action.payload;
        }
    }
})

export default problemSlice.reducer;