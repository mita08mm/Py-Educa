import React from 'react';
import { CodeExecutionResult as Result } from '../services/codeExecutionService';

interface CodeExecutionResultProps {
  result: Result | null;
  isLoading?: boolean;
}

const CodeExecutionResult: React.FC<CodeExecutionResultProps> = ({ result, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <p className="text-gray-600 dark:text-gray-300">Ejecutando código...</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Estado:</span>
        <span className={`px-2 py-1 rounded-md text-sm ${
          result.status.id === 3 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {result.status.description}
        </span>
      </div>

      {result.stdout && (
        <div>
          <h4 className="text-sm font-medium mb-2">Salida:</h4>
          <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md text-sm overflow-x-auto">
            {result.stdout}
          </pre>
        </div>
      )}

      {result.stderr && (
        <div>
          <h4 className="text-sm font-medium mb-2 text-red-600 dark:text-red-400">Errores:</h4>
          <pre className="bg-red-50 dark:bg-red-900/50 p-3 rounded-md text-sm overflow-x-auto text-red-600 dark:text-red-400">
            {result.stderr}
          </pre>
        </div>
      )}

      <div className="flex space-x-4 text-sm">
        <div>
          <span className="font-medium">Memoria:</span>
          <span className="ml-2">{result.memory}</span>
        </div>
        <div>
          <span className="font-medium">Tiempo:</span>
          <span className="ml-2">{result.time}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeExecutionResult; 