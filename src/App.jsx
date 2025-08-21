import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import ProvidersStep from "./components/ProvidersStep";
import AccountsStep from "./components/AccountsStep";
import DelegationStep from "./components/DelegationStep";
import NeuronsStep from "./components/NeuronsStep";
import LogsStep from "./components/LogsStep";
import ErrorDisplay from "./components/ErrorDisplay";
import LoadingIndicator from "./components/LoadingIndicator";
import "./App.css";

function AppContent() {
  return (
    <div className="app-container">
      <h1>ICP Web Extension Test dApp</h1>

      <ErrorDisplay />

      <ProvidersStep />
      <AccountsStep />
      <DelegationStep />
      <NeuronsStep />
      <LoadingIndicator />
      <LogsStep />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
