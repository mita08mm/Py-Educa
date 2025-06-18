import { Editor } from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";

/**
 * TemplateEditorWindow
 * 
 * Editor específico para docentes que crean plantillas de código.
 * Las líneas que terminan con "//STATIC" serán protegidas para los estudiantes.
 *
 * Props:
 * - value: string (código actual, controlado)
 * - defaultValue: string (código inicial, no controlado)
 * - onChange: (value: string) => void (callback cuando cambia el código)
 * - height: string (por defecto '85vh')
 * - width: string (por defecto '100%')
 * - theme: string (por defecto 'vs-dark')
 */
interface TemplateEditorWindowProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  height?: string;
  width?: string;
  theme?: string;
}

const TemplateEditorWindow: React.FC<TemplateEditorWindowProps> = ({
  value,
  defaultValue = '',
  onChange,
  height = '85vh',
  width = '100%',
  theme = 'vs-dark'
}) => {
  const [internalValue, setInternalValue] = useState<string>(value ?? defaultValue);
  const editorRef = useRef<any>(null);

  // Inicializar con el valor por defecto
  useEffect(() => {
    if (defaultValue) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    updateStaticLineHighlights(editor, monaco);
    
    editor.onDidChangeModelContent(() => {
      const currentValue = editor.getValue();
      setInternalValue(currentValue);
      
      // Actualizar los highlights de las líneas estáticas
      updateStaticLineHighlights(editor, monaco);
      
      if (onChange) {
        onChange(currentValue);
      }
    });
  };

  const updateStaticLineHighlights = (editor: any, monaco: any) => {
    const model = editor.getModel();
    const fullText = model.getValue();
    const lines = fullText.split('\n');
    
    const staticRanges = [];
    
    lines.forEach((line, index) => {
      if (line.trim().endsWith('# STATIC')) {
        const lineNumber = index + 1;
        staticRanges.push({
          range: new monaco.Range(lineNumber, 1, lineNumber, line.length + 1),
          options: {
            className: 'staticLine',
            hoverMessage: { 
              value: 'Esta línea será protegida para los estudiantes (# STATIC)' 
            },
            marginClassName: 'staticLineMargin'
          }
        });
      }
    });
    
    editor.createDecorationsCollection(staticRanges);
  };

  const handleEditorChange = (val: string | undefined) => {
    const newValue = val || '';
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Función para generar la plantilla final para estudiantes
  const generateStudentTemplate = (): string => {
    return internalValue;
  };

  // Función para obtener estadísticas de la plantilla
  const getTemplateStats = () => {
    const lines = internalValue.split('\n');
    const staticLines = lines.filter(line => line.trim().endsWith('# STATIC')).length;
    const editableLines = lines.length - staticLines;
    
    return {
      totalLines: lines.length,
      staticLines,
      editableLines
    };
  };

  const addStaticComment = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const model = editor.getModel();
      
      if (selection && !selection.isEmpty()) {
        // Si hay texto seleccionado, agregar # STATIC a cada línea seleccionada
        const startLine = selection.startLineNumber;
        const endLine = selection.endLineNumber;
        
        for (let lineNumber = startLine; lineNumber <= endLine; lineNumber++) {
          const lineContent = model.getLineContent(lineNumber);
          if (!lineContent.trim().endsWith('# STATIC')) {
            const newContent = lineContent + ' # STATIC';
            const range = new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1);
            editor.executeEdits('add-static', [{
              range: range,
              text: newContent
            }]);
          }
        }
      } else {
        // Si no hay selección, agregar # STATIC a la línea actual
        const position = editor.getPosition();
        const lineContent = model.getLineContent(position.lineNumber);
        
        if (!lineContent.trim().endsWith('# STATIC')) {
          const newContent = lineContent + ' # STATIC';
          const range = new monaco.Range(position.lineNumber, 1, position.lineNumber, lineContent.length + 1);
          editor.executeEdits('add-static', [{
            range: range,
            text: newContent
          }]);
        }
      }
    }
  };

  const removeStaticComment = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const model = editor.getModel();
      
      if (selection && !selection.isEmpty()) {
        // Si hay texto seleccionado, remover //STATIC de cada línea seleccionada
        const startLine = selection.startLineNumber;
        const endLine = selection.endLineNumber;
        
        for (let lineNumber = startLine; lineNumber <= endLine; lineNumber++) {
          const lineContent = model.getLineContent(lineNumber);
          if (lineContent.trim().endsWith('# STATIC')) {
            const newContent = lineContent.replace(/\s*\/\/STATIC\s*$/, '');
            const range = new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1);
            editor.executeEdits('remove-static', [{
              range: range,
              text: newContent
            }]);
          }
        }
      } else {
        // Si no hay selección, remover //STATIC de la línea actual
        const position = editor.getPosition();
        const lineContent = model.getLineContent(position.lineNumber);
        
        if (lineContent.trim().endsWith('# STATIC')) {
            const newContent = lineContent.replace(/\s*#\s*STATIC\s*$/, '');
            const range = new monaco.Range(position.lineNumber, 1, position.lineNumber, lineContent.length + 1);
            editor.executeEdits('remove-static', [{
                range: range,
                text: newContent
            }]); 
        }
      }
    }
  };

  const stats = getTemplateStats();

  return (
    <div className="template-editor-container">
      {/* Barra de herramientas para el docente */}
      <div className="toolbar" style={{
        backgroundColor: '#1E293B',
        padding: '8px 16px',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        color: '#E2E8F0'
      }}>
        <span style={{ fontWeight: 'bold', color: '#60A5FA' }}>
          Editor de Plantillas
        </span>
        <button
          onClick={addStaticComment}
          style={{
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Marcar como Estático
        </button>
        <button
          onClick={removeStaticComment}
          style={{
            backgroundColor: '#DC2626',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Desmarcar Estático
        </button>
        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#94A3B8' }}>
          Total: {stats.totalLines} | Estáticas: {stats.staticLines} | Editables: {stats.editableLines}
        </div>
      </div>

      {/* Editor */}
      <div className="editor-wrapper" style={{
        backgroundColor: '#0F172A',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
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
            .toolbar button:hover {
              opacity: 0.8;
            }
          `}
        </style>
        
        <Editor
          height={height}
          width={width}
          language="python"
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
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            folding: true,
            showFoldingControls: 'always',
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            selectOnLineNumbers: true
          }}
        />
      </div>
    </div>
  );
};

export default TemplateEditorWindow;