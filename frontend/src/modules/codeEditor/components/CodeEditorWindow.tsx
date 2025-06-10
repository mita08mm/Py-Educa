import { Editor } from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";

interface CodeEditorWindowProps {
  onChange: (key: string, value: string) => void;
  code?: string;
  defaultValue?: string;
  protectedPatterns?: {
    start: string;
    end: string;
  };
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ 
  onChange, 
  code, 
  defaultValue,
  protectedPatterns = {
    start: "{{PROTECTED_START}}",
    end: "{{PROTECTED_END}}"
  }
}) => {
  const [value, setValue] = useState<string>(code || "");
  const editorRef = useRef<any>(null);
  const originalValue = useRef<string>(defaultValue || code || "");

  // Inicializar con el valor por defecto
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      originalValue.current = defaultValue;
    }
  }, [defaultValue]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    updateProtectedRanges(editor, monaco);
    
    editor.onDidChangeModelContent(() => {
      const currentValue = editor.getValue();
      const hasProtectedContent = originalValue.current.includes(protectedPatterns.start);
      
      if (hasProtectedContent) {
        // Verificar si se modificaron las partes protegidas
        const protectedSections = extractProtectedSections(originalValue.current);
        const currentProtectedSections = extractProtectedSections(currentValue);
        
        const isModified = protectedSections.some((section, i) => {
          return currentProtectedSections[i] !== section;
        });
        
        if (isModified) {
          // Restaurar el valor original si se modificó código protegido
          editor.setValue(originalValue.current);
          updateProtectedRanges(editor, monaco);
          return;
        }
      }
      
      const newValue = currentValue;
      setValue(newValue);
      onChange("code", newValue);
    });
  };

  const extractProtectedSections = (content: string): string[] => {
    const sections: string[] = [];
    const { start, end } = protectedPatterns;
    let currentIndex = 0;
    
    while (true) {
      const startIdx = content.indexOf(start, currentIndex);
      if (startIdx === -1) break;
      
      const endIdx = content.indexOf(end, startIdx);
      if (endIdx === -1) break;
      
      sections.push(content.substring(startIdx, endIdx + end.length));
      currentIndex = endIdx + end.length;
    }
    
    return sections;
  };

  const updateProtectedRanges = (editor: any, monaco: any) => {
    const model = editor.getModel();
    const fullText = model.getValue();
    const { start, end } = protectedPatterns;
    
    const protectedRanges = [];
    let currentIndex = 0;
    
    while (true) {
      const startIdx = fullText.indexOf(start, currentIndex);
      if (startIdx === -1) break;
      
      const endIdx = fullText.indexOf(end, startIdx);
      if (endIdx === -1) break;
      
      const startPos = model.getPositionAt(startIdx);
      const endPos = model.getPositionAt(endIdx + end.length);
      
      protectedRanges.push({
        range: new monaco.Range(
          startPos.lineNumber,
          startPos.column,
          endPos.lineNumber,
          endPos.column
        ),
        options: {
          className: 'protectedCode',
          hoverMessage: { value: 'Esta parte no se puede modificar' },
          inlineClassName: 'protectedInline'
        }
      });
      
      currentIndex = endIdx + end.length;
    }
    
    editor.createDecorationsCollection(protectedRanges);
  };

  const getCleanCode = (): string => {
    const { start, end } = protectedPatterns;
    const regex = new RegExp(`${start}[\\s\\S]*?${end}`, 'g');
    return value.replace(regex, '').replace(/\n\s*\n/g, '\n');
  };

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <style>
        {`
          .protectedCode {
            background-color: rgba(255, 165, 0, 0.1);
          }
          .protectedInline {
            color: #888 !important;
          }
          .monaco-editor .view-overlays .current-line {
            border: none;
          }
        `}
      </style>
      
      <Editor
        height="85vh"
        width={"100%"}
        language={"python"}
        value={value}
        theme={"vs-light"}
        defaultValue={defaultValue}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          lineNumbers: 'on',
          scrollBeyondLastLine: false
        }}
      />
    </div>
  );
};

export default CodeEditorWindow;