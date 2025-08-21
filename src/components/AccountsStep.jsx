import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAccounts,
  setSelectedAccount,
  setLoading,
  setError,
  clearError,
} from "../store/accountsSlice";
import { addLog } from "../store/logsSlice";

const AccountsStep = () => {
  const dispatch = useDispatch();
  const { selectedProvider } = useSelector((state) => state.providers);
  const { accounts, selectedAccount, loading, error } = useSelector(
    (state) => state.accounts
  );

  const isGlobalLoading = useSelector(
    (state) =>
      state.providers.loading ||
      state.accounts.loading ||
      state.delegation.loading ||
      state.neurons.loading
  );

  const requestAccounts = async () => {
    if (!selectedProvider) {
      dispatch(setError("Please select a provider first"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());
    dispatch(addLog("Requesting accounts..."));

    try {
      const response = await selectedProvider.sendMessage({
        id: selectedProvider.uuid,
        jsonrpc: "2.0",
        method: "icrc27_accounts",
      });

      if (response.result) {
        console.log(response);
        dispatch(setAccounts(response.result.accounts));
        dispatch(addLog(`Retrieved ${response.result.length} accounts`));
      } else {
        throw new Error(response.error?.message || "Failed to get accounts");
      }
    } catch (err) {
      dispatch(setError(`Failed to get accounts: ${err.message}`));
      dispatch(addLog(`Error: ${err.message}`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAccountSelect = (account) => {
    dispatch(setSelectedAccount(account));
    dispatch(addLog(`Selected account: ${account.owner.substring(0, 20)}...`));
  };

  return (
    <div className={`step-card ${!selectedProvider ? "disabled" : ""}`}>
      <h3 data-step="2">Request Accounts</h3>
      <p className="step-description">
        Retrieve account information from the selected wallet provider.
      </p>

      <div className="step-actions">
        <button
          onClick={requestAccounts}
          disabled={isGlobalLoading || !selectedProvider}
        >
          {loading ? "Loading..." : "Request Accounts"}
        </button>
      </div>

      {error && (
        <div className="alert error">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {accounts.length > 0 && (
        <div className="accounts-list">
          <h4>Available Accounts ({accounts.length}):</h4>
          {accounts.map((account, index) => (
            <div className="account-item">
              <div className="account-owner">
                {account.owner || `Account ${index + 1}`}
              </div>
              {account.subaccount && (
                <div className="account-subaccount">
                  Subaccount: {account.subaccount}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsStep;
