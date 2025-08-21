import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  neurons: [],
  loading: false,
  error: null,
};

export const neuronsSlice = createSlice({
  name: "neurons",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setNeurons: (state, action) => {
      state.neurons = action.payload;
    },
    clearNeurons: (state) => {
      state.neurons = [];
    },
  },
});

export const { setLoading, setError, clearError, setNeurons, clearNeurons } =
  neuronsSlice.actions;

export default neuronsSlice.reducer;
