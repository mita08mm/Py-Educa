import { useNavigate } from "react-router-dom";
import { Layout } from '../../layout';
import { useState, useEffect } from "react";
import { cursoService, Curso} from "../../../services/api";

export const MyLearning = () => {
  const [myCourses, setMyCourses] = useState<Curso[]>([]);
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
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
  

  const handleCourseClick = (courseId: number) => {
    setActiveCourseId(courseId);
    navigate(`/my-learning/${courseId}`); 
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
              <div
              key={c.cod_curso}
              onClick={() => handleCourseClick(c.cod_curso!)}
              className={`cursor-pointer group flex flex-col overflow-hidden rounded-lg transition-transform transform
                ${
                  activeCourseId === c.cod_curso
                    ? 'border-2 border-[#334155] bg-[#1E293B] scale-105 shadow-lg'
                    : 'border border-[#1E293B] hover:border-[#334155] bg-[#0F172A] hover:scale-105 shadow-md hover:shadow-lg'
                }`}
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

                <div className="flex-1 bg-[#334155] p-4">
                  <h3 className="font-semibold text-[#E2E8F0] mb-1">
                    {c.titulo_curso} 
                  </h3>
                  <p className="text-sm text-[#FFFFFF]  line-clamp-3">
                    {c.descripcion_curso}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        
      </main>
    </Layout>
  );
};
