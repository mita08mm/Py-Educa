// src/modules/courses/pages/MyLearning.tsx
import { Link } from "react-router-dom";
import { useMyCourses } from "../hooks/useMyCourses.tsx"; // tu hook de estado global

export const MyLearning = () => {
  const { myCourses } = useMyCourses();

  return (
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
              key={c.id}
              to={`/my-learning/${c.id}`} // lleva al visor
              className="group flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="relative h-40 w-full">
                <img
                  src={c.image || "/default-thumb.jpg"}
                  alt={c.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition"
                />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  PRINCIPIANTE
                </span>
              </div>

              <div className="flex-1 bg-white p-4">
                <h3 className="font-semibold text-[#1E293B] mb-1">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {c.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};
