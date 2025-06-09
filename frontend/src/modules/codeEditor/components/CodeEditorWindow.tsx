import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";

interface CodeEditorWindowProps {
  onChange: (key: string, value: string) => void;
  code?: string;
  defaultValue?: string;
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ onChange, code, defaultValue }) => {
  const [value, setValue] = useState<string>(code || "");

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || "";
    setValue(newValue);
    onChange("code", newValue);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={"100%"}
        language={"python"}
        value={value}
        theme={"vs-dark"}
        defaultValue={defaultValue || '// some comment'}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;