import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: [
    { id: 1, title: 'Contact details', description: "Lorem ipsum dolar sit amet consetuter adipisic" },
    { id: 2, title: 'Basic details', description: "Lorem ipsum dolar sit amet consetuter adipisic" },
    { id: 3, title: 'Employement details', description: "Enter Employement details Lorem ipsum dolar sit" },
    { id: 4, title: 'Position & Experience', description: "Lorem ipsum dolar sit amet consetuter adipisic" },
  ],
  currentStep: 1,
  formData: {},
  records: [],
  changed: false
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    resetCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    submitForm: (state) => {
      state.records.push(state.formData);
      state.formData = {};
      state.currentStep = 1;
      state.changed = true
    },
    replaceData: (state,action) => {
      state.records = action.payload.records
    },
    resetChanged: (state) => {
      state.changed = false
    }
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
