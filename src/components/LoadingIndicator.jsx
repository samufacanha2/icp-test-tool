import React from "react";
import { useSelector } from "react-redux";

const LoadingIndicator = () => {
  const isLoading = useSelector(
    (state) =>
      state.providers.loading ||
      state.accounts.loading ||
      state.delegation.loading ||
      state.neurons.loading
  );

  if (!isLoading) return null;

  return <div className="loading global-loading">Processing request...</div>;
};

export default LoadingIndicator;
