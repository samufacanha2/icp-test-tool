import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logs: [],
};

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addLog: (state, action) => {
      const timestamp = new Date().toLocaleTimeString();
      state.logs.push(`${timestamp}: ${action.payload}`);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
  },
});

export const { addLog, clearLogs } = logsSlice.actions;

export default logsSlice.reducer;
