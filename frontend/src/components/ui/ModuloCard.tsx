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
      className={`bg-neo-lavender rounded-xl hover:bg-neo-periwinkle transition-all duration-200 transform hover:scale-105 cursor-pointer`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-black text-white rounded-lg px-4 py-2">
            <span className="font-brutal text-lg">#{index + 1}</span>
          </div>
          <span className="font-brutal text-2xl">📚</span>
        </div>

        <h3 className="font-brutal text-xl mb-3 text-neo-cream">
          {modulo.titulo_modulo.toUpperCase()}
        </h3>
        <p className="text-neo-mint mb-6 font-medium">
          {modulo.descripcion_modulo}
        </p>

        <button
          onClick={handleEntrarModulo}
          className="bg-neo-peach rounded-lg px-6 py-3 font-brutal text-neo-cream hover:bg-neo-lime hover:text-neo-cream transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
        >
          ENTRAR AL MÓDULO
        </button>
      </div>
    </div>
  );
};

export default ModuloCard;
