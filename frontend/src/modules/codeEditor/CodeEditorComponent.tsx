import React, { useEffect, useState } from "react";
import OutputWindow from "./components/OutputWindow";
import CodeEditorWindow from "./components/CodeEditorWindow";
import { classnames } from "./utils/general";
import CustomInput from "./components/CustomInput";
import axios from "axios";
import OutputDetails from "./components/OutputDetails";

interface CodeEditorComponentProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
}

const pythonDefault = `# Escribe tu código aquí

`;

const JUDGE0_LANGUAGE_ID_PYTHON = 71; // Python 3

const CodeEditorComponent: React.FC<CodeEditorComponentProps> = ({ 
  initialCode = pythonDefault, 
  onCodeChange 
}) => {
  const [code, setCode] = useState(initialCode);
  const [outputDetails, setOutputDetails] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [processing, setProcessing] = useState(false);

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
    console.log("Compilar presionado", code);

    const formData = {
      language_id: JUDGE0_LANGUAGE_ID_PYTHON,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_RAPID_API_URL,
        formData,
        {
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        }
      );
      if (!data.token) {
        setProcessing(false);
        alert("No se recibió token de Judge0");
        console.error("Respuesta Judge0 sin token:", data);
        return;
      }
      console.log("Token recibido de Judge0:", data.token);
      checkStatus(data.token, 0);
    } catch (err) {
      setProcessing(false);
      alert("Error al enviar el código a Judge0");
      console.error("Error en handleCompile:", err);
    }
  };

  const checkStatus = async (token: string, attempt: number) => {
    if (attempt > 15) {
      setProcessing(false);
      alert("Timeout esperando respuesta de Judge0");
      return;
    }
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_RAPID_API_URL}/${token}`,
        {
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        }
      );
      console.log("Respuesta polling Judge0:", data);
      if (data.status?.id <= 2) {
        // In Queue or Processing
        setTimeout(() => checkStatus(token, attempt + 1), 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(data);
      }
    } catch (err) {
      setProcessing(false);
      alert("Error al obtener el resultado de Judge0");
      console.error("Error en checkStatus:", err);
    }
  };

  const testJudge0Connection = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_RAPID_API_URL.replace('/submissions', '/config_info'),
        {
          headers: {
            "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
            "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
          },
        }
      );
      alert("Conexión exitosa a Judge0. Revisa la consola para ver la respuesta.");
      console.log("Judge0 config:", response.data);
    } catch (error) {
      alert("Error conectando a Judge0. Revisa la consola.");
      console.error("Error connecting to Judge0:", error);
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
            onChange={onChange}
            height="400px"
            theme="vs-dark"
            language="python"
          />
        </div>

        {/* Panel de salida - PRIMERO */}
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
        </div>

        {/* Panel de entrada personalizada y controles - SEGUNDO */}
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
                  <span>Probar código</span>
                </>
              )}
            </button>

            <button
              onClick={testJudge0Connection}
              className="w-full px-4 py-2 bg-brand-600 hover:bg-brand-500 text-gray-300 hover:text-white rounded-lg text-sm transition-colors duration-200"
            >
              <i className="fas fa-wifi mr-2"></i>
              Probar conexión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorComponent;