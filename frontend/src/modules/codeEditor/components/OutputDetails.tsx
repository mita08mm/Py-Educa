import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;