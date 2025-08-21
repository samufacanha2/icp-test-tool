import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionKey: null,
  delegationChain: null,
  delegationIdentity: null,
  loading: false,
  error: null,
  isCreated: false,
};

export const delegationSlice = createSlice({
  name: "delegation",
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
    setSessionKey: (state, action) => {
      state.sessionKey = action.payload;
    },
    setDelegationChain: (state, action) => {
      state.delegationChain = action.payload;
    },
    setDelegationIdentity: (state, action) => {
      state.delegationIdentity = action.payload;
      state.isCreated = true;
    },
    clearDelegation: (state) => {
      state.sessionKey = null;
      state.delegationChain = null;
      state.delegationIdentity = null;
      state.isCreated = false;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSessionKey,
  setDelegationChain,
  setDelegationIdentity,
  clearDelegation,
} = delegationSlice.actions;

export default delegationSlice.reducer;
