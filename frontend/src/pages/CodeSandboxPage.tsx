import React from "react";
import { useSearchParams } from "react-router-dom";
import PythonCodeEditor from "../components/ui/PythonCodeEditor";

const CodeSandboxPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  const problemTitle = searchParams.get("title") || "";

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <PythonCodeEditor 
          initialCode={initialCode} 
          problemTitle={problemTitle}
        />
      </div>
    </div>
  );
};

export default CodeSandboxPage; 