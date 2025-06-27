import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
import { codeExecutionService } from "../../services/codeExecutionService";

const PythonCodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("print('Hola, Py-Educa!')\n");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const highlight = (code: string) =>
    Prism.highlight(code, Prism.languages.python, "python");

  const handleRun = async () => {
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await codeExecutionService.execute(code);
      if (res.stderr) {
        setError(res.stderr);
      }
      setOutput(res.stdout);
    } catch (e: any) {
      setError(e.message || "Error de red o del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-4 border-black shadow-brutal-lg rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="font-brutal text-2xl mb-4 text-neo-magenta">Editor de Código Python</h2>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlight}
        padding={16}
        className="font-mono text-base min-h-[180px] border-3 border-black rounded bg-neo-cream focus:outline-none focus:ring-2 focus:ring-neo-magenta"
        style={{ minHeight: 180 }}
      />
      <button
        onClick={handleRun}
        disabled={loading}
        className="mt-4 bg-neo-cyan border-3 border-black shadow-brutal px-6 py-2 font-brutal text-lg rounded hover:bg-neo-yellow transition-all duration-100 disabled:opacity-60"
      >
        {loading ? "Ejecutando..." : "Ejecutar"}
      </button>
      <div className="mt-6">
        {output && (
          <div className="bg-neo-lime border-3 border-black shadow-brutal p-4 rounded mb-2">
            <span className="font-bold text-black">Salida:</span>
            <pre className="whitespace-pre-wrap text-black">{output}</pre>
          </div>
        )}
        {error && (
          <div className="bg-neo-red border-3 border-black shadow-brutal p-4 rounded">
            <span className="font-bold text-white">Error:</span>
            <pre className="whitespace-pre-wrap text-white">{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PythonCodeEditor; 