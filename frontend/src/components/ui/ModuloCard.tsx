import { useNavigate } from "react-router-dom";
import type { Modulo } from "../../types/modulo";

interface ModuloCardProps {
  modulo: Modulo;
  index: number;
}

const ModuloCard = ({ modulo, index }: ModuloCardProps) => {
  const navigate = useNavigate();

  const cardColors = [
    "bg-neo-mint",
    "bg-neo-sage",
    "bg-neo-lavender",
    "bg-neo-coral",
    "bg-neo-yellow",
    "bg-neo-aqua",
  ];

  const bgColor = cardColors[index % cardColors.length];

  const handleEntrarModulo = () => {
    navigate(`/modulo/${modulo.cod_modulo}`);
  };

  return (
    <div
      className={`${bgColor} border-4 border-black shadow-brutal-lg hover:shadow-brutal-xl transition-all duration-100 hover:translate-x-1 hover:translate-y-1`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-black text-white border-3 border-black shadow-brutal px-4 py-2">
            <span className="font-brutal text-lg">#{index + 1}</span>
          </div>
          <span className="font-brutal text-2xl">📚</span>
        </div>

        <h3 className="font-brutal text-xl mb-3 text-black">
          {modulo.titulo_modulo.toUpperCase()}
        </h3>
        <p className="text-gray-800 mb-6 font-medium">
          {modulo.descripcion_modulo}
        </p>

        <button
          onClick={handleEntrarModulo}
          className="bg-neo-red border-3 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
        >
          ENTRAR AL MÓDULO
        </button>
      </div>
    </div>
  );
};

export default ModuloCard;
