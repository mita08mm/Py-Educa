export const Sidebar = () => {
    const courseSections = [
      'Introducción a Python',
      'Variables y Tipos',
      'Estructuras de Control',
      'Progreso del curso'
    ];
  
    return (
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="font-bold text-lg mb-4 text-gray-700">Contenido del Curso</h2>
        <nav>
          <ul className="space-y-2">
            {courseSections.map((section, index) => (
              <li key={index}>
                <a href="#" className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-600 hover:text-blue-600">
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  };