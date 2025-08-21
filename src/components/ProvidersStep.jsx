import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedProvider,
  clearProviders,
  addProvider,
} from "../store/providersSlice";
import { addLog } from "../store/logsSlice";
import { clearAccounts } from "../store/accountsSlice";
import { clearDelegation } from "../store/delegationSlice";

const ProvidersStep = () => {
  const dispatch = useDispatch();
  const { providers, selectedProvider, loading } = useSelector(
    (state) => state.providers
  );
  const isGlobalLoading = useSelector(
    (state) =>
      state.providers.loading ||
      state.accounts.loading ||
      state.delegation.loading ||
      state.neurons.loading
  );

  const requestProviders = () => {
    dispatch(clearProviders());
    dispatch(clearAccounts());
    dispatch(clearDelegation());
    dispatch(addLog("Requesting providers..."));

    const onAnnounceIcrc94Provider = (event) => {
      const providerData = event.detail;
      dispatch(addLog(`Provider announced: ${providerData.name || "Unknown"}`));
      dispatch(addProvider(providerData));
    };

    window.addEventListener(
      "icrc94:announceProvider",
      onAnnounceIcrc94Provider
    );
    window.dispatchEvent(new CustomEvent("icrc94:requestProvider"));

    // Cleanup listener after a timeout
    setTimeout(() => {
      window.removeEventListener(
        "icrc94:announceProvider",
        onAnnounceIcrc94Provider
      );
    }, 5000);
  };

  const handleProviderSelect = (provider) => {
    dispatch(setSelectedProvider(provider));
    dispatch(clearAccounts());
    dispatch(clearDelegation());
    dispatch(addLog(`Selected provider: ${provider.name || provider.uuid}`));
  };

  return (
    <div className="step-card">
      <h3 data-step="1">Request Providers</h3>
      <p className="step-description">
        Discover and connect to available ICP wallet providers in your browser.
      </p>

      <button onClick={requestProviders} disabled={isGlobalLoading}>
        {isGlobalLoading ? "Requesting..." : "Request Providers"}
      </button>

      {providers.length > 0 && (
        <div className="providers-list">
          <h4>Available Providers ({providers.length}):</h4>
          {providers.map((provider, index) => (
            <label
              key={provider.uuid || index}
              className={`provider-item ${
                selectedProvider?.uuid === provider.uuid ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="provider"
                onChange={() => handleProviderSelect(provider)}
                checked={selectedProvider?.uuid === provider.uuid}
              />
              <div className="provider-content">
                {provider.icon && (
                  <img
                    src={provider.icon}
                    alt={`${provider.name} logo`}
                    className="provider-logo"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="provider-info">
                  <div className="provider-name">
                    {provider.name || provider.uuid || `Provider ${index + 1}`}
                  </div>
                  {provider.description && (
                    <div className="provider-description">
                      {provider.description}
                    </div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProvidersStep;
