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

const pythonDefault = ``;

const JUDGE0_LANGUAGE_ID_PYTHON = 71; // Python 3

const CodeEditorComponent: React.FC<CodeEditorComponentProps> = ({ initialCode = pythonDefault, onCodeChange }) => {
  const [code, setCode] = useState(initialCode);
  const [outputDetails, setOutputDetails] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [processing, setProcessing] = useState<null | boolean>(null);

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
    setProcessing(true);
    setOutputDetails(null);

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
      checkStatus(data.token);
    } catch (err) {
      setProcessing(false);
      alert("Error al enviar el código a Judge0");
      console.error(err);
    }
  };

  const checkStatus = async (token: string) => {
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
      if (data.status?.id <= 2) {
        // In Queue or Processing
        setTimeout(() => checkStatus(token), 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(data);
      }
    } catch (err) {
      setProcessing(false);
      alert("Error al obtener el resultado de Judge0");
      console.error(err);
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
    <>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            // theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
};

export default CodeEditorComponent;
