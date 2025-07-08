import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problems",
    initialState: {
        problems: [],
    },
    reducers: {
        setProblems(state, action) {
            state.problems = action.payload;
        },
        clearProblems(state) {
            state.problems = [];
        },
    }
})

export default problemSlice.reducer;