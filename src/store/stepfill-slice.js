import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    stepOneFillPercantage: 0,
    stepTwoFillPercantage: 0,
    stepThreeFillPercantage: 0,
}

const stepFillSlice = createSlice({
    name: 'stepFill',
    initialState,
    reducers: {
        fillStepOne: (state, action) => {
            state.stepOneFillPercantage = action.payload * 16
        },
        fillStepTwo: (state, action) => {
            state.stepTwoFillPercantage = action.payload * 20
        },
        fillStepThree: (state, action) => {
            state.stepThreeFillPercantage = action.payload * 26
        },
        resetAllStepsFill: (state) => {
            state.stepOneFillPercantage = 0;
            state.stepTwoFillPercantage = 0;
            state.stepThreeFillPercantage = 0;
        },
    }
})

export const stepFillActions = stepFillSlice.actions

export default stepFillSlice.reducer;