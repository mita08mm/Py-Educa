import './index.css';
import { Layout } from './modules/layout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BookOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function App() {
  const [isTeacher] = useState<boolean>(false); // TODO: Implementar lógica de roles

  return (
    <Layout>
      <main className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#E2E8F0] mb-4">
            {isTeacher ? 'Panel de Docente' : 'Bienvenido a Py-Educa'}
          </h1>
          <p className="text-[#94A3B8] text-lg">
            {isTeacher 
              ? 'Gestiona tus cursos y contenido educativo'
              : 'Tu plataforma de aprendizaje de programación'
            }
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isTeacher ? (
            // Vista de Docente
            <>
              <Link
                to="/courses/create"
                className="bg-[#1E293B] p-6 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <BookOpenIcon className="h-12 w-12 text-[#46838C] mb-4" />
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-2">Crear Nuevo Curso</h2>
                <p className="text-[#94A3B8]">
                  Diseña y estructura un nuevo curso de programación
                </p>
              </Link>

              <Link
                to="/courses/management"
                className="bg-[#1E293B] p-6 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <BookOpenIcon className="h-12 w-12 text-[#46838C] mb-4" />
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-2">Gestionar Cursos</h2>
                <p className="text-[#94A3B8]">
                  Administra tus cursos existentes y su contenido
                </p>
              </Link>

              <Link
                to="/students"
                className="bg-[#1E293B] p-6 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <UserGroupIcon className="h-12 w-12 text-[#46838C] mb-4" />
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-2">Estudiantes</h2>
                <p className="text-[#94A3B8]">
                  Gestiona y monitorea el progreso de tus estudiantes
                </p>
              </Link>
            </>
          ) : (
            // Vista de Estudiante
            <>
              <Link
                to="/my-learning"
                className="bg-[#1E293B] p-6 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <AcademicCapIcon className="h-12 w-12 text-[#46838C] mb-4" />
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-2">Mi Aprendizaje</h2>
                <p className="text-[#94A3B8]">
                  Continúa con tus cursos y sigue tu progreso
                </p>
              </Link>

              <Link
                to="/courses"
                className="bg-[#1E293B] p-6 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <BookOpenIcon className="h-12 w-12 text-[#46838C] mb-4" />
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-2">Explorar Cursos</h2>
                <p className="text-[#94A3B8]">
                  Descubre nuevos cursos de programación
                </p>
              </Link>

              <Link
                to="/profile"
                className="bg-[#1E293B] p-6 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <UserGroupIcon className="h-12 w-12 text-[#46838C] mb-4" />
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-2">Mi Perfil</h2>
                <p className="text-[#94A3B8]">
                  Gestiona tu perfil y preferencias
                </p>
              </Link>
              <Link
                to="/evaluation-example"
                className="bg-[#1E293B] p-6 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <AcademicCapIcon className="h-12 w-12 text-[#46838C] mb-4" />
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-2">Ejemplo de evaluacion</h2>
                <p className="text-[#94A3B8]">
                  Realiza la evaluacion de una subseccion
                </p>
              </Link>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default App;
