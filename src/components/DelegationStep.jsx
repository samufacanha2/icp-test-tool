import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Ed25519KeyIdentity,
  DelegationIdentity,
  DelegationChain,
} from "@dfinity/identity";
import {
  setSessionKey,
  setDelegationChain,
  setDelegationIdentity,
  setLoading,
  setError,
  clearError,
} from "../store/delegationSlice";
import { addLog } from "../store/logsSlice";

const DelegationStep = () => {
  const dispatch = useDispatch();
  const { selectedProvider } = useSelector((state) => state.providers);
  const { isCreated, loading, error } = useSelector(
    (state) => state.delegation
  );

  const isGlobalLoading = useSelector(
    (state) =>
      state.providers.loading ||
      state.accounts.loading ||
      state.delegation.loading ||
      state.neurons.loading
  );

  const createDelegation = async () => {
    if (!selectedProvider) {
      dispatch(setError("Please select a provider first"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());
    dispatch(addLog("Creating delegation..."));

    try {
      // Generate session key
      const newSessionKey = Ed25519KeyIdentity.generate();
      dispatch(setSessionKey(newSessionKey));

      const sessionPublicKey = newSessionKey.getPublicKey().toDer();
      const publicKeyBase64 = Buffer.from(sessionPublicKey).toString("base64");

      const delegationParams = {
        publicKey: publicKeyBase64,
        maxTimeToLive: BigInt(8 * 60 * 60 * 1000 * 1000 * 1000).toString(), // 8 hours in nanoseconds
        targets: ["rrkah-fqaaa-aaaaa-aaaaq-cai"],
      };

      dispatch(addLog("Sending delegation request..."));
      const response = await selectedProvider.sendMessage({
        id: crypto.randomUUID(),
        jsonrpc: "2.0",
        method: "icrc34_delegation",
        params: delegationParams,
      });

      if (!response.result) {
        throw new Error(
          "Failed to get delegation: " +
            (response.error?.message || "Unknown error")
        );
      }

      // Create delegation chain from response
      const delegationChainFromResponse = DelegationChain.fromJSON(
        response.result
      );
      dispatch(setDelegationChain(delegationChainFromResponse));

      // Create delegation identity
      const newDelegationIdentity = DelegationIdentity.fromDelegation(
        newSessionKey,
        delegationChainFromResponse
      );
      dispatch(setDelegationIdentity(newDelegationIdentity));

      dispatch(addLog("Delegation created successfully!"));
    } catch (err) {
      dispatch(setError(`Failed to create delegation: ${err.message}`));
      dispatch(addLog(`Error: ${err.message}`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={`step-card ${!selectedProvider ? "disabled" : ""}`}>
      <h3 data-step="3">Create Delegation</h3>
      <p className="step-description">
        Generate a delegation identity for secure canister interactions.
      </p>

      <button
        onClick={createDelegation}
        disabled={isGlobalLoading || !selectedProvider}
      >
        {loading ? "Creating..." : "Create Delegation"}
      </button>

      {error && (
        <div className="alert error">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {isCreated && (
        <div className="status-success">Delegation created successfully</div>
      )}

      {isCreated && (
        <div className="delegation-info">
          <h5>Delegation Details:</h5>
          <div className="delegation-details">
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value success">Active</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Valid for:</span>
              <span className="detail-value">8 hours</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Target canister:</span>
              <span className="detail-value">
                rrkah-fqaaa-aaaaa-aaaaq-cai (NNS Governance)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DelegationStep;
