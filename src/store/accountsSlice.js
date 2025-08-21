import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  selectedAccount: null,
  loading: false,
  error: null,
};

export const accountsSlice = createSlice({
  name: "accounts",
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
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    clearAccounts: (state) => {
      state.accounts = [];
      state.selectedAccount = null;
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setAccounts,
  clearAccounts,
  setSelectedAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;
