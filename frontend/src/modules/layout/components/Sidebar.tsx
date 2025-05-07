import { Link } from "react-router-dom";

export const Sidebar = () => {
    const courseSections = [
      'Introducción a Python',
      'Variables y Tipos',
      'Estructuras de Control',
      'Progreso del curso'
    ];
  
    return (
      <aside className="bg-[#1E293B] shadow-md p-4">
        <h2 className="font-bold text-lg mb-4 text-[#E2E8F0]">Contenido del Curso</h2>
        <nav>
          <ul className="space-y-2">
            {courseSections.map((section, index) => (
              <li key={index}>
                <a href="#" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 text-[#E2E8F0]">
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to="/courses/create"
          className="block mt-4 px-3 py-2 rounded bg-[#46838C] text-white hover:bg-blue-600 text-center">
          Crear Curso
        </Link>
      </aside>
    );
  };