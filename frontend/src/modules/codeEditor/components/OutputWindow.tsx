import React from "react";
import { CodeExecutionResult } from "../services/codeExecutionService";

interface OutputWindowProps {
  outputDetails: CodeExecutionResult | null;
  processing: boolean;
}

const OutputWindow: React.FC<OutputWindowProps> = ({ outputDetails, processing }) => {
  let color = "text-green-500";
  let message = "";

  if (processing) {
    color = "text-blue-500";
    message = "Procesando...";
  } else if (!outputDetails) {
    message = "Sin salida";
  } else {
    const status = outputDetails.status?.description || "";
    const stdout = outputDetails.stdout;
    const stderr = outputDetails.stderr;

    if (stderr && stderr.trim()) {
      color = "text-red-500";
      message = stderr;
    } else if (stdout && stdout.trim()) {
      message = stdout;
    } else {
      message = status || "Sin salida";
    }
  }

  return (
    <>
      <h1 className="ml-2 font-bold text-xl bg-clip-text bg-gradient-to-r mb-2 text-gray-100">
        Salida
      </h1>
      <div className="w-full h-56 rounded-md bg-brand-800 dark:bg-surface text-gray-100 font-normal text-sm overflow-y-auto">
        <pre className={`px-2 py-1 font-normal text-xs text-gray-100 ${color}`}>{message}</pre>
      </div>
    </>
  );
};

export default OutputWindow;