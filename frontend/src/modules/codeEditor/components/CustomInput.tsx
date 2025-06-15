import React from "react";
import { classnames } from "../utils/general";

interface CustomInputProps {
  customInput: string;
  setCustomInput: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ customInput, setCustomInput }) => {
  return (
    <input
      type="text"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder="Ingresa los datos de entrada para tu programa..."
      className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 hover:border-gray-500 transition-all duration-200 font-mono text-sm shadow-lg"
    />
  );
};

export default CustomInput;