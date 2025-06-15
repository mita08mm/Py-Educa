import React from "react";

const OutputWindow = ({ outputDetails, processing }) => {
  let color = "text-green-500";
  let message = "";

  const decode = (val) => {
    if (!val) return "";
    try {
      return atob(val);
    } catch {
      return val;
    }
  };

  if (processing) {
    color = "text-blue-500";
    message = "Procesando...";
  } else if (!outputDetails) {
    message = "Sin salida";
  } else {
    // Judge0 puede devolver status como objeto o string
    const status = outputDetails.status?.description || outputDetails.status || "";
    const stdout = outputDetails.stdout;
    const stderr = outputDetails.stderr;
    const compileOutput = outputDetails.compile_output;

    if (stderr && decode(stderr).trim() && decode(stderr) !== "null") {
      color = "text-red-500";
      message = decode(stderr);
    } else if (compileOutput && decode(compileOutput).trim() && decode(compileOutput) !== "null") {
      color = "text-yellow-500";
      message = decode(compileOutput);
    } else if (stdout && decode(stdout).trim() && decode(stdout) !== "null") {
      message = decode(stdout);
    } else {
      message = status || "Sin salida";
    }
  }

  return (
    <>
      <h1 className="ml-2 font-bold text-xl bg-clip-text bg-gradient-to-r mb-2 text-gray-100">
        Output
      </h1>
      <div className="w-full h-56 rounded-md bg-brand-800 dark:bg-surface text-gray-100 font-normal text-sm overflow-y-auto">
        <pre className={`px-2 py-1 font-normal text-xs text-gray-100 ${color}`}>{message}</pre>
      </div>
    </>
  );
};

export default OutputWindow;