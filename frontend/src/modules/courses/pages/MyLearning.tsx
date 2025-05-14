import { Link, useNavigate } from "react-router-dom";
import { Layout } from '../../layout';
import { useState, useEffect } from "react";
import { cursoService, Curso, moduloService, Modulo, seccionService, Seccion, subseccionService, Subseccion } from "../../../services/api";

export const MyLearning = () => {
  const [myCourses, setMyCourses] = useState<Curso[]>([]);
  const [modules, setModules] = useState<Modulo[]>([]);
  const [sections, setSections] = useState<Seccion[]>([]);
  const [subsections, setSubsections] = useState<Subseccion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await cursoService.getAll(); 
        setMyCourses(courses); 
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };
    fetchCourses();
  }, []);

  const fetchModules = async (courseId: number) => {
    setLoading(true);
    try {
      const modulesData = await moduloService.getAll();
      setModules(modulesData.filter(mod => mod.cod_curso === courseId));
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async (moduleId: number) => {
    setLoading(true);
    try {
      const sectionsData = await seccionService.getAll();
      setSections(sectionsData.filter(sec => sec.cod_modulo === moduleId));
    } catch (error) {
      console.error("Error al obtener las secciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubsections = async (sectionId: number) => {
    setLoading(true);
    try {
      const subsectionsData = await subseccionService.getAll();
      setSubsections(subsectionsData.filter(sub => sub.cod_seccion === sectionId));
    } catch (error) {
      console.error("Error al obtener las subsecciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId: number) => {
    // Llamar a la función para cargar los módulos y luego redirigir a la página
    fetchModules(courseId);
    navigate(`/my-learning/${courseId}`); // Redirige a la ruta del curso
  };


  return (
    <Layout>
      <main className="p-6">
        <h1 className="text-3xl font-bold text-[#E2E8F0] mb-6">Mi Aprendizaje</h1>

        {myCourses.length === 0 ? (
          <p className="text-gray-400">
            Aún no tienes cursos. ¡Crea uno o inscríbete!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((c) => (
              <Link
                key={c.cod_curso}
                to={`/my-learning/${c.cod_curso}`} 
                onClick={() => handleCourseClick(c.cod_curso!)} 
                className="group flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="relative h-40 w-full">
                  <img
                    // src={c.image } 
                    src={"https://skoolofcode.us/wp-content/uploads/2022/09/artturi-jalli-g5_rxRjvKmg-unsplash-2048x1536.jpg"} 
                    alt={c.titulo_curso}
                    className="h-full w-full object-cover group-hover:scale-105 transition"
                  />
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    PRINCIPIANTE
                  </span>
                </div>

                <div className="flex-1 bg-[#f5f5f5] p-4">
                  <h3 className="font-semibold text-[#1E293B] mb-1">
                    {c.titulo_curso} 
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {c.descripcion_curso}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mostrar módulos, secciones y subsecciones al seleccionar un curso */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Módulos</h2>
            {modules.map(mod => (
              <div key={mod.cod_modulo}>
                <h3 className="text-xl">{mod.titulo_modulo}</h3>
                <p>{mod.descripcion_modulo}</p>

                {/* Secciones para cada módulo */}
                <div className="ml-4 mt-2">
                  <h4 className="font-semibold">Secciones:</h4>
                  {sections.filter(sec => sec.cod_modulo === mod.cod_modulo).map(sec => (
                    <div key={sec.cod_seccion}>
                      <h5>{sec.titulo_seccion}</h5>
                      <p>{sec.descripcion_seccion}</p>

                      {/* Subsecciones para cada sección */}
                      <div className="ml-4 mt-2">
                        <h6 className="font-semibold">Subsecciones:</h6>
                        {subsections.filter(sub => sub.cod_seccion === sec.cod_seccion).map(sub => (
                          <div key={sub.cod_subseccion}>
                            <h6>{sub.titulo_subseccion}</h6>
                            <p>{sub.descripcion_subseccion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};
