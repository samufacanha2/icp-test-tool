import React from "react";
import { useSelector } from "react-redux";

const ErrorDisplay = () => {
  const providersError = useSelector((state) => state.providers.error);
  const accountsError = useSelector((state) => state.accounts.error);
  const delegationError = useSelector((state) => state.delegation.error);
  const neuronsError = useSelector((state) => state.neurons.error);

  const error =
    providersError || accountsError || delegationError || neuronsError;

  if (!error) return null;

  return (
    <div className="alert error global-error">
      <span>⚠️</span>
      {error}
    </div>
  );
};

export default ErrorDisplay;
