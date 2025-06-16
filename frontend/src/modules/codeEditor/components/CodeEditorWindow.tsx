import { Editor } from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";

interface CodeEditorWindowProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: string;
  height?: string;
  width?: string;
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({
  value,
  defaultValue = "",
  onChange,
  language = "python",
  theme = "vs-dark",
  height = "85vh",
  width = "100%",
}) => {
  const [internalValue, setInternalValue] = useState<string>(
    value ?? defaultValue
  );
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const staticLinesContent = useRef<Set<string>>(new Set());
  const staticLineNumbers = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (defaultValue) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    extractStaticLines(defaultValue || "");
    applyDecorations(editor, monaco);

    editor.onDidChangeModelContent(() => {
      const model = editor.getModel();
      const currentLines = model.getLinesContent();
      const edits: any[] = [];

      const updatedLines = currentLines.map((line, index) => {
        if (isStaticLine(line)) {
          const matchedOriginal = Array.from(staticLinesContent.current).find(
            (original) => {
              return original.trimEnd() === line.trimEnd();
            }
          );

          if (!matchedOriginal) {
            const originalLine = findOriginalStaticLineBySuffix(line);
            if (originalLine) {
              edits.push({
                range: new monaco.Range(
                  index + 1,
                  1,
                  index + 1,
                  line.length + 1
                ),
                text: originalLine,
              });
              return originalLine;
            }
          }
        }
        return line;
      });

      if (edits.length > 0) {
        setTimeout(() => {
          editor.executeEdits("restore-static", edits);
        }, 0);
      }

      const newValue = editor.getValue();
      setInternalValue(newValue);
      if (onChange) onChange(newValue);

      applyDecorations(editor, monaco); // re-aplica decoraciones actualizadas
    });
    editor.onKeyDown((e: any) => {
  const position = editor.getPosition();
  const line = position.lineNumber;

  if (staticLineNumbers.current.has(line)) {
    e.preventDefault();
    e.stopPropagation();
  }
});

  };

  const isStaticLine = (line: string) => line.trim().endsWith("# STATIC");

  const extractStaticLines = (code: string) => {
    const lines = code.split("\n");
    staticLinesContent.current.clear();
    lines.forEach((line) => {
      if (isStaticLine(line)) {
        staticLinesContent.current.add(line);
      }
    });
  };

  const findOriginalStaticLineBySuffix = (
    modifiedLine: string
  ): string | null => {
    const suffix = "# STATIC";
    const base = modifiedLine.split(suffix)[0].trim();
    for (const original of staticLinesContent.current) {
      const originalBase = original.split(suffix)[0].trim();
      if (originalBase === base) {
        return original;
      }
    }
    return null;
  };

  const applyDecorations = (editor: any, monaco: any) => {
  const model = editor.getModel();
  const lines = model.getLinesContent();
  const decorations = [];
  const staticLineNums = new Set<number>();

  lines.forEach((line: string, index: number) => {
    if (isStaticLine(line)) {
      staticLineNums.add(index + 1);
      decorations.push({
        range: new monaco.Range(index + 1, 1, index + 1, line.length + 1),
        options: {
          className: "staticLine",
          hoverMessage: {
            value: "Esta línea no se puede modificar (# STATIC)",
          },
          marginClassName: "staticLineMargin",
        },
      });
    }
  });

  staticLineNumbers.current = staticLineNums;
  editor.createDecorationsCollection(decorations);
};


  const handleEditorChange = (val: string | undefined) => {
    const newValue = val || "";
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div
      className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl"
      style={{ backgroundColor: "#0F172A" }}
    >
      <style>
        {`
          .staticLine {
            background-color: rgba(34, 197, 94, 0.1) !important;
            border-left: 3px solid #22C55E;
          }
          .staticLineMargin {
            background-color: rgba(34, 197, 94, 0.2) !important;
          }
          .monaco-editor, .monaco-editor-background, .monaco-editor .margin, .monaco-editor .inputarea.ime-input {
            background-color: #0F172A !important;
          }
          .monaco-editor .view-overlays .current-line {
            border: none;
          }
          .monaco-editor .line-numbers {
            color: #64748B !important;
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
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          folding: true,
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          selectOnLineNumbers: true,
        }}
      />
    </div>
  );
};

export default CodeEditorWindow;
