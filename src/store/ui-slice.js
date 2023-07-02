import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { showNotification: null },
    reducers: {
        showNotification(state, action) {
            state.showNotification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        },
        hideNotification: (state, action) => {
            state.showNotification = null
        }
    }
})

export const uiSliceActions = uiSlice.actions;

export default uiSlice.reducer;