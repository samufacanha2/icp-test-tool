import { configureStore } from "@reduxjs/toolkit";
import providersReducer from "./providersSlice";
import accountsReducer from "./accountsSlice";
import delegationReducer from "./delegationSlice";
import neuronsReducer from "./neuronsSlice";
import logsReducer from "./logsSlice";

export const store = configureStore({
  reducer: {
    providers: providersReducer,
    accounts: accountsReducer,
    delegation: delegationReducer,
    neurons: neuronsReducer,
    logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionsPaths: [
          "payload.sessionKey",
          "payload.delegationChain",
          "payload.delegationIdentity",
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          "delegation.sessionKey",
          "delegation.delegationChain",
          "delegation.delegationIdentity",
        ],
      },
    }),
});
