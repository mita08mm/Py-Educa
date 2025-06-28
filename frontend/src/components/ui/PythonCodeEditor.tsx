import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import { codeExecutionService } from "../../services/codeExecutionService";

// Estilos personalizados para Prism.js
const customPrismStyles = `
  /* Override todos los estilos de Prism.js */
  .token.operator,
  .token.punctuation,
  .token.operator + .token.punctuation,
  .token.punctuation + .token.operator {
    color: #e5e7eb !important;
    background: transparent !important;
  }
  
  /* Específicamente para el operador de asignación */
  .token.operator[data-operator="="],
  .token.operator:contains("="),
  .token.operator {
    color: #e5e7eb !important;
    background: transparent !important;
  }
  
  /* Override para cualquier estilo que pueda estar interfiriendo */
  .token.keyword {
    color: #fbbf24 !important;
    background: transparent !important;
  }
  
  .token.string {
    color: #34d399 !important;
    background: transparent !important;
  }
  
  .token.comment {
    color: #6b7280 !important;
    background: transparent !important;
  }
  
  .token.number {
    color: #f87171 !important;
    background: transparent !important;
  }
  
  .token.function {
    color: #60a5fa !important;
    background: transparent !important;
  }
  
  .token.class-name {
    color: #a78bfa !important;
    background: transparent !important;
  }
  
  /* Forzar que todos los tokens tengan fondo transparente */
  .token {
    background: transparent !important;
  }
  
  /* Override específico para el editor */
  .react-simple-code-editor .token.operator {
    color: #e5e7eb !important;
    background: transparent !important;
  }
`;

interface PythonCodeEditorProps {
  initialCode?: string;
  problemTitle?: string;
  onCodeChange?: (code: string) => void;
}

const PythonCodeEditor: React.FC<PythonCodeEditorProps> = ({ 
  initialCode = `# Escribe tu código Python aquí
print("Hola, mundo!")`,
  problemTitle,
  onCodeChange
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const highlight = (code: string) =>
    Prism.highlight(code, Prism.languages.python, "python");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleRun = async () => {
    setLoading(true);
    setError("");
    setOutput("");
    
    try {
      const res = await codeExecutionService.execute(code, input);
      if (res.stderr) {
        setError(res.stderr);
      } else {
        setOutput(res.stdout);
      }
    } catch (e: any) {
      setError(e.message || "Error de red o del servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode(initialCode);
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <>
      <style>{customPrismStyles}</style>
      <div className="h-full flex flex-col">
        {/* Header simple */}
        <div className="flex justify-between items-center mb-4 p-4">
          <div>
            <h1 className="text-white font-bold text-xl">🐍 Python Editor</h1>
            {problemTitle && (
              <p className="text-gray-400 text-sm mt-1">
                Problema: {problemTitle}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleClear}
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Reset
            </button>
            <button
              onClick={handleRun}
              disabled={loading}
              className={`px-4 py-2 rounded font-bold text-sm ${
                loading
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 p-4">
          {/* Editor de código */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded border border-gray-700 h-full">
              <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                <span className="text-gray-300 text-sm font-mono">main.py</span>
              </div>
              <div className="h-full">
                <Editor
                  value={code}
                  onValueChange={handleCodeChange}
                  highlight={highlight}
                  padding={16}
                  className="font-mono text-sm text-gray-200 h-full focus:outline-none"
                  style={{ height: 'calc(100% - 40px)' }}
                />
              </div>
            </div>
          </div>

          {/* Panel derecho - Input y Output */}
          <div className="space-y-4">
            {/* Input */}
            <div className="bg-gray-800 rounded border border-gray-700">
              <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                <span className="text-gray-300 text-sm font-mono">Input</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here..."
                className="w-full p-4 font-mono text-sm bg-gray-800 text-gray-200 placeholder:text-gray-500 focus:outline-none min-h-[200px] resize-none"
              />
            </div>

            {/* Output */}
            <div className="bg-gray-800 rounded border border-gray-700">
              <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                <span className="text-gray-300 text-sm font-mono">Output</span>
              </div>
              <div className="p-4 min-h-[200px]">
                {output ? (
                  <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                    {output}
                  </pre>
                ) : error ? (
                  <pre className="font-mono text-sm text-red-400 whitespace-pre-wrap">
                    {error}
                  </pre>
                ) : (
                  <p className="font-mono text-sm text-gray-500">
                    Output will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PythonCodeEditor; 