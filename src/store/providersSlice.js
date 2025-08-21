import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  providers: [],
  selectedProvider: null,
  loading: false,
  error: null,
};

export const providersSlice = createSlice({
  name: "providers",
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
    addProvider: (state, action) => {
      const exists = state.providers.find(
        (p) => p.uuid === action.payload.uuid
      );
      if (!exists) {
        state.providers.push(action.payload);
      }
    },
    clearProviders: (state) => {
      state.providers = [];
      state.selectedProvider = null;
    },
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  addProvider,
  clearProviders,
  setSelectedProvider,
} = providersSlice.actions;

export default providersSlice.reducer;
