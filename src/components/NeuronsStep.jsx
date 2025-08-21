import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HttpAgent } from "@dfinity/agent";
import { GovernanceCanister, NeuronState } from "@dfinity/nns";
import {
  setNeurons,
  setLoading,
  setError,
  clearError,
} from "../store/neuronsSlice";
import { addLog } from "../store/logsSlice";

const NeuronsStep = () => {
  const dispatch = useDispatch();
  const { delegationIdentity } = useSelector((state) => state.delegation);
  const { neurons, loading, error } = useSelector((state) => state.neurons);

  const isGlobalLoading = useSelector(
    (state) =>
      state.providers.loading ||
      state.accounts.loading ||
      state.delegation.loading ||
      state.neurons.loading
  );

  const makeCanisterCall = async () => {
    if (!delegationIdentity) {
      dispatch(setError("Please create delegation first"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());
    dispatch(addLog("Making canister call to get neuron info..."));

    try {
      const agent = new HttpAgent({
        identity: delegationIdentity,
        host: "https://ic0.app",
      });

      const nns = GovernanceCanister.create({
        agent: agent,
      });

      dispatch(addLog("Fetching neurons..."));
      const neuronsResult = await nns.listNeurons({
        certified: false,
        includeEmptyNeurons: true,
        includePublicNeurons: true,
      });

      dispatch(setNeurons(neuronsResult));
      dispatch(addLog(`Retrieved ${neuronsResult.length} neurons`));
    } catch (err) {
      dispatch(setError(`Failed to make canister call: ${err.message}`));
      dispatch(addLog(`Error: ${err.message}`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={`step-card ${!delegationIdentity ? "disabled" : ""}`}>
      <h3 data-step="4">Make Canister Call</h3>
      <p className="step-description">
        Query the NNS governance canister to retrieve neuron information.
      </p>

      <button
        onClick={makeCanisterCall}
        disabled={isGlobalLoading || !delegationIdentity}
      >
        {loading ? "Fetching..." : "Get Neuron Info"}
      </button>

      {error && (
        <div className="alert error">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {neurons.length > 0 && (
        <div className="neurons-container">
          <div className="neurons-summary">Neurons Found: {neurons.length}</div>
          <div className="neurons-list">
            {neurons.slice(0, 5).map((neuron, index) => (
              <div key={neuron.neuronId || index} className="neuron-item">
                <div className="neuron-header">
                  <span className="neuron-id">
                    Neuron ID: {neuron.neuronId?.toString() || "N/A"}
                  </span>
                  {neuron.dissolveDelaySeconds && (
                    <span className="neuron-delay">
                      Dissolve Delay:{" "}
                      {Math.round(
                        Number(neuron.dissolveDelaySeconds) / (24 * 60 * 60)
                      )}{" "}
                      days
                    </span>
                  )}
                </div>
                {neuron.cachedNeuronStakeE8s && (
                  <div className="neuron-stake">
                    Stake:{" "}
                    {(Number(neuron.cachedNeuronStakeE8s) / 100000000).toFixed(
                      2
                    )}{" "}
                    ICP
                  </div>
                )}
                {neuron.state && (
                  <div className={`neuron-state state-${neuron.state}`}>
                    {NeuronState[neuron?.state]}
                  </div>
                )}
              </div>
            ))}
            {neurons.length > 5 && (
              <div className="neurons-more">
                ... and {neurons.length - 5} more neurons
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuronsStep;
