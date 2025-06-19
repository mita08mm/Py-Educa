import type { Curso } from "../../types/curso";

interface CursoCardProps {
  curso: Curso;
}

const CursoCard = ({ curso }: CursoCardProps) => {
  return (
    <div className="bg-neo-mint border-4 border-black shadow-brutal-lg hover:shadow-brutal-xl transition-shadow duration-100">
      <div className="h-48 bg-neo-yellow border-b-4 border-black flex items-center justify-center">
        {curso.imagen_curso ? (
          <img
            src={curso.imagen_curso}
            alt={curso.titulo_curso}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-brutal text-4xl">📚</span>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-brutal text-xl mb-3 text-black">
          {curso.titulo_curso.toUpperCase()}
        </h3>
        <p className="text-gray-800 mb-4 font-medium">
          {curso.descripcion_curso}
        </p>
        <button className="bg-neo-red border-3 border-black shadow-brutal px-6 py-2 font-brutal hover:shadow-brutal-lg transition-shadow duration-100">
          VER CURSO
        </button>
      </div>
    </div>
  );
};

export default CursoCard;
