import { useCursos } from "../hooks/useCursos";
import CursoCard from "../components/ui/CursoCard";
import { useNavigate } from "react-router-dom";

const CursosPage = () => {
  const navigate = useNavigate();
  const { cursos, loading, error } = useCursos();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-neo-yellow border-4 border-black shadow-brutal p-8">
          <span className="font-brutal text-2xl">CARGANDO CURSOS...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-neo-red border-4 border-black shadow-brutal p-8">
          <span className="font-brutal text-2xl text-white">
            ERROR: {error}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Título y botón crear */}
      <div className="bg-neo-periwinkle rounded-xl shadow-brutal-xl p-8 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-brutal text-4xl text-neo-cream mb-2">MIS CURSOS</h1>
            <p className="text-xl font-bold text-neo-mint">
              Explora todos los cursos disponibles
            </p>
          </div>
          <button
            onClick={() => navigate("/crear-curso")}
            className="bg-neo-peach rounded-lg shadow-brutal-lg px-6 py-4 font-brutal text-xl text-neo-cream hover:bg-neo-lime hover:text-neo-cream hover:shadow-brutal-xl transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 hover:translate-x-1"
          >
            ➕ CREAR CURSO
          </button>
        </div>
      </div>

      {/* Grid de cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso) => (
          <CursoCard key={curso.cod_curso} curso={curso} />
        ))}
      </div>

      {/* Mensaje si no hay cursos */}
      {cursos.length === 0 && (
        <div className="text-center mt-12">
          <div className="bg-neo-warning border-4 border-black shadow-brutal p-8 inline-block">
            <span className="font-brutal text-2xl text-neo-aqua">
              NO HAY CURSOS DISPONIBLES
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CursosPage;
