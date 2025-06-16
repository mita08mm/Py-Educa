import React from "react";
import { CodeExecutionResult } from "../services/codeExecutionService";

interface OutputDetailsProps {
  outputDetails: CodeExecutionResult;
}

const OutputDetails: React.FC<OutputDetailsProps> = ({ outputDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Estado:{" "}
        <span className={`font-semibold px-2 py-1 rounded-md ${getStatusColor(outputDetails.status.description)}`}>
          {outputDetails.status.description}
        </span>
      </p>
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Memoria:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {outputDetails.memory} bytes
        </span>
      </p>
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Tiempo:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {outputDetails.time} ms
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;