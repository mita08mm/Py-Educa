import { useNavigate } from "react-router-dom";
import type { Curso } from "../../types/curso";

interface CursoCardProps {
  curso: Curso;
}

const CursoCard = ({ curso }: CursoCardProps) => {
  const navigate = useNavigate();

  const handleVerCurso = () => {
    navigate(`/curso/${curso.cod_curso}`);
  };

  return (
    <div className="bg-neo-lavender rounded-xl hover:bg-neo-periwinkle transition-all duration-200 transform hover:scale-105 cursor-pointer">
      <div className="h-48 bg-neo-yellow flex items-center justify-center rounded-t-xl">
        {curso.imagen_curso ? (
          <img
            src={curso.imagen_curso}
            alt={curso.titulo_curso}
            className="w-full h-full object-cover rounded-t-xl"
          />
        ) : (
          <span className="font-brutal text-4xl">📚</span>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-brutal text-xl mb-3 text-neo-cream">
          {curso.titulo_curso.toUpperCase()}
        </h3>
        <p className="text-neo-mint mb-4 font-medium">
          {curso.descripcion_curso}
        </p>
        <button
          onClick={handleVerCurso}
          className="bg-neo-peach rounded-lg px-6 py-2 font-brutal text-neo-cream hover:bg-neo-lime hover:text-neo-cream transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
        >
          VER CURSO
        </button>
      </div>
    </div>
  );
};

export default CursoCard;
