import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearLogs } from "../store/logsSlice";

const LogsStep = () => {
  const dispatch = useDispatch();
  const { logs } = useSelector((state) => state.logs);

  return (
    <div className="step-card logs-step">
      <h3>Activity Logs</h3>
      <p className="step-description">
        Real-time activity and debugging information.
      </p>

      <div className="logs-container">
        {logs.length === 0 ? (
          <div className="logs-empty">
            No activity yet. Start by requesting providers.
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="log-entry">
              {log}
            </div>
          ))
        )}
      </div>

      {logs.length > 0 && (
        <button
          onClick={() => dispatch(clearLogs())}
          className="secondary small"
          style={{ marginTop: "1rem" }}
        >
          Clear Logs
        </button>
      )}
    </div>
  );
};

export default LogsStep;
