import {createSlice} from '@reduxjs/toolkit';

const submissionSlice = createSlice({
    name: 'submission',
    initialState: {
        submissions: [],
        bestSubmission: null,
        lastSubmission: null,
    },
    reducers: {
        setSubmissions(state, action) {
            state.submissions = action.payload.submissions;
            state.bestSubmission = action.payload.bestSubmission;
            state.lastSubmission = action.payload.lastSubmission;
        },
        clearSubmissions(state) {
            state.submissions = [];
            state.bestSubmission = null;
            state.lastSubmission = null;
        }
    }
});
export default submissionSlice.reducer;