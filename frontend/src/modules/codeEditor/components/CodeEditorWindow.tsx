import { Editor } from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";

/**
 * CodeEditorWindow
 *
 * Props:
 * - value: string (código actual, controlado)
 * - defaultValue: string (código inicial, no controlado)
 * - onChange: (value: string) => void (callback cuando cambia el código)
 * - language: string (por defecto 'python')
 * - theme: string (por defecto 'vs-dark')
 * - height: string (por defecto '85vh')
 * - width: string (por defecto '100%')
 */
interface CodeEditorWindowProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: string;
  height?: string;
  width?: string;
  protectedPatterns?: {
    start: string;
    end: string;
  };
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({
  value,
  defaultValue = '',
  onChange,
  language = 'python',
  theme = 'vs-dark',
  height = '85vh',
  width = '100%',
  protectedPatterns = {
    start: "{{PROTECTED_START}}",
    end: "{{PROTECTED_END}}"
  }
}) => {
  const [internalValue, setInternalValue] = useState<string>(value ?? defaultValue);
  const editorRef = useRef<any>(null);
  const originalValue = useRef<string>(defaultValue || value || "");

  // Inicializar con el valor por defecto
  useEffect(() => {
    if (defaultValue) {
      setInternalValue(defaultValue);
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
      setInternalValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
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
    return internalValue.replace(regex, '').replace(/\n\s*\n/g, '\n');
  };

  const handleEditorChange = (val: string | undefined) => {
    const newValue = val || '';
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
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
        height={height}
        width={width}
        language={language}
        value={value !== undefined ? value : internalValue}
        theme={theme}
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