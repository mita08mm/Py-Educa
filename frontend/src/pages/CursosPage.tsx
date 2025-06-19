import { useCursos } from "../hooks/useCursos";
import CursoCard from "../components/ui/CursoCard";

const CursosPage = () => {
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
      {/* Título */}
      <div className="bg-neo-magenta border-5 border-black shadow-brutal-xl p-8 mb-8">
        <h1 className="font-brutal text-4xl text-white mb-2">MIS CURSOS</h1>
        <p className="text-xl font-bold text-black">
          Explora todos los cursos disponibles
        </p>
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
          <div className="bg-neo-orange border-4 border-black shadow-brutal p-8 inline-block">
            <span className="font-brutal text-2xl">
              NO HAY CURSOS DISPONIBLES
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CursosPage;
