import React, { useState } from "react";
import OutputWindow from "./components/OutputWindow";
import CodeEditorWindow from "./components/CodeEditorWindow";
import { classnames } from "./utils/general";
import CustomInput from "./components/CustomInput";
import OutputDetails from "./components/OutputDetails";
import {
  executeCode,
  CodeExecutionResult,
} from "./services/codeExecutionService";

interface CodeEditorComponentProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
}

const pythonDefault = `# Escribe tu código aquí
print("¡Hola Mundo!")
`;

const CodeEditorComponent: React.FC<CodeEditorComponentProps> = ({
  initialCode = pythonDefault,
  onCodeChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [outputDetails, setOutputDetails] =
    useState<CodeExecutionResult | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        if (onCodeChange) onCodeChange(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    if (!code) return;
    setProcessing(true);
    setOutputDetails(null);
    setError(null);
    console.log("Ejecutando código:", code);

    try {
      const result = await executeCode(code);
      setOutputDetails(result);
    } catch (err) {
      console.error("Error al ejecutar el código:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      setOutputDetails({
        status: { id: 4, description: "Error" },
        stdout: "",
        stderr: err instanceof Error ? err.message : "Error desconocido",
        memory: "0",
        time: "0",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mt-6">
      {/* Título del editor */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
          <i className="fas fa-code mr-2 text-blue-400"></i>
          Editor de Código
        </h3>
      </div>

      {/* Container principal con diseño mejorado */}
      <div className="bg-surface-2 rounded-lg p-4 space-y-4">
        {/* Editor de código */}
        <div className="bg-[#0F172A] rounded-lg overflow-hidden border border-brand-700">
          <div className="bg-brand-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm font-medium">main.py</span>
            </div>
            <div className="text-gray-300 text-xs">Python 3</div>
          </div>

          <CodeEditorWindow
            value={code}
            onChange={(newCode) => {
              setCode(newCode);
              if (onCodeChange) onCodeChange(newCode);
            }}
            height="400px"
            theme="vs-dark"
            language="python"
            defaultValue={initialCode}
          />
        </div>

        {/* Panel de salida */}
        <div className="space-y-4">
          {/* Ventana de salida */}
          <div className="space-y-2">
            <div className="bg-[#0F172A] rounded-lg border border-brand-700">
              <OutputWindow
                outputDetails={outputDetails}
                processing={processing}
              />
            </div>
          </div>

          {/* Detalles de salida */}
          {outputDetails && (
            <div className="bg-surface-2 rounded-lg border border-brand-700 overflow-hidden">
              <div className="bg-brand-700 px-4 py-2">
                <span className="text-white text-sm font-medium">
                  <i className="fas fa-info-circle mr-2 text-blue-400"></i>
                  Detalles de ejecución
                </span>
              </div>
              <div className="p-4">
                <OutputDetails outputDetails={outputDetails} />
              </div>
            </div>
          )}

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Panel de entrada personalizada y controles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Entrada personalizada */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              <i className="fas fa-keyboard mr-2 text-yellow-400"></i>
              Entrada personalizada (opcional)
            </label>
            <div className="bg-[#0F172A] rounded-lg border border-brand-700">
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col justify-end space-y-2">
            <button
              onClick={handleCompile}
              disabled={!code || processing}
              className={classnames(
                "w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2",
                processing
                  ? "bg-brand-600 text-gray-300 cursor-not-allowed"
                  : !code
                  ? "bg-brand-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transform hover:scale-105"
              )}
            >
              {processing ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Ejecutando...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-play"></i>
                  <span>Ejecutar código</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorComponent;
