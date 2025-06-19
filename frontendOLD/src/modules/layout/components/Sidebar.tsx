import { useState, useEffect } from "react";
import { NavLink, useLocation, Link, useSearchParams } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDoubleRightIcon,
  HomeIcon,
  BookOpenIcon,
  PlusCircleIcon,
  BookmarkIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { moduloService, seccionService, subseccionService, cursoService, Modulo, Seccion, Subseccion, Curso } from "../../../services/api";

// Menú principal para estudiantes
const studentMenu = [
  { label: "Inicio", path: "/", icon: HomeIcon },
  { label: "Mi Aprendizaje", path: "/my-learning", icon: AcademicCapIcon },
  { label: "Ejemplo de evaluacion", path: "/evaluation-example", icon: AcademicCapIcon },
  { label: "Calificaciones", path: "/grades", icon: ChartBarIcon}
];

// Menú para profesores
const teacherMenu = [
  { label: "Gestión de Cursos", path: "/courses/management", icon: BookOpenIcon },
  { label: "Estadísticas", path: "/courses/stats", icon: ChartBarIcon },
  { label: "Estudiantes", path: "/students", icon: UserGroupIcon },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [modules, setModules] = useState<Modulo[]>([]);
  const [sections, setSections] = useState<Seccion[]>([]);
  const [subsections, setSubsections] = useState<Subseccion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModules, setOpenModules] = useState<number[]>([]);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedSubsection, setSelectedSubsection] = useState<number | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (location.pathname.startsWith('/my-learning') || location.pathname === '/contenido') {
      cargarCursos();
    }
  }, [location.pathname]);

  useEffect(() => {
    // Actualizar selecciones basadas en los parámetros de URL
    const cursoId = searchParams.get('curso');
    const moduloId = searchParams.get('modulo');
    const seccionId = searchParams.get('seccion');
    const subseccionId = searchParams.get('subseccion');

    if (cursoId) {
      setSelectedCourse(Number(cursoId));
      cargarModulos(Number(cursoId));
    }
    if (moduloId) {
      setSelectedModule(Number(moduloId));
      setOpenModules(prev => [...new Set([...prev, Number(moduloId)])]);
      cargarSecciones(Number(moduloId));
    }
    if (seccionId) {
      setSelectedSection(Number(seccionId));
      setOpenSections(prev => [...new Set([...prev, Number(seccionId)])]);
      cargarSubsecciones(Number(seccionId));
    }
    if (subseccionId) {
      setSelectedSubsection(Number(subseccionId));
    }
  }, [searchParams]);

  const cargarCursos = async () => {
    try {
      setLoading(true);
      const data = await cursoService.getAll();
      setCursos(data);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarModulos = async (cursoId: number) => {
    try {
      setSelectedCourse(cursoId);
      const data = await moduloService.getAll();
      const modulosFiltrados = data.filter(mod => mod.cod_curso === cursoId);
      setModules(modulosFiltrados);
      setOpenModules(prev => [...new Set([...prev, ...modulosFiltrados.map(m => m.cod_modulo!)])]);
    } catch (error) {
      console.error('Error al cargar módulos:', error);
    }
  };

  const cargarSecciones = async (moduloId: number) => {
    try {
      setSelectedModule(moduloId);
      const data = await seccionService.getAll();
      const seccionesFiltradas = data.filter(sec => sec.cod_modulo === moduloId);
      setSections(seccionesFiltradas);
      setOpenSections(prev => [...new Set([...prev, ...seccionesFiltradas.map(s => s.cod_seccion!)])]);
    } catch (error) {
      console.error('Error al cargar secciones:', error);
    }
  };

  const cargarSubsecciones = async (seccionId: number) => {
    try {
      setSelectedSection(seccionId);
      const data = await subseccionService.getAll();
      const subseccionesFiltradas = data.filter(sub => sub.cod_seccion === seccionId);
      setSubsections(subseccionesFiltradas);
    } catch (error) {
      console.error('Error al cargar subsecciones:', error);
    }
  };

  const handleSubsectionClick = (subseccionId: number, seccionId: number, moduloId: number, cursoId: number) => {
    setSelectedSubsection(subseccionId);
    setSelectedCourse(cursoId);
    setSelectedModule(moduloId);
    setSelectedSection(seccionId);
    setOpenModules(prev => [...new Set([...prev, moduloId])]);
    setOpenSections(prev => [...new Set([...prev, seccionId])]);
  };

  const toggleModule = (moduleId: number) => {
    setOpenModules((prev) => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId) 
        : [...prev, sectionId]
    );
  };

  const renderNavLink = ({ label, path, icon: Icon }: { label: string; path: string; icon: any }) => {
    const active = location.pathname === path;
    return (
      <NavLink
        key={path}
        to={path}
        onClick={() => setCollapsed(false)}
        className={`
          group flex items-center
          ${collapsed ? "justify-center" : "gap-3"}
          rounded-md px-3 py-2 text-sm font-medium
          transition-colors
          ${active
            ? "bg-accent/30 text-white"
            : "text-brand-100 hover:bg-accent/20 hover:text-brand-50"}
        `}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {active && !collapsed && (
          <span className="absolute -left-3 h-6 w-1 rounded-r bg-accent" />
        )}
        {!collapsed && (
          <span className="whitespace-nowrap select-none">{label}</span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className={`
        bg-brand-700 min-h-screen
        ${collapsed ? "w-16 overflow-x-hidden" : "w-72"}
        transition-all duration-300 ease-in-out
        flex flex-col shadow-lg shadow-black/30
      `}
      aria-expanded={!collapsed}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-14 w-full hover:bg-accent/20"
        aria-label={collapsed ? "Abrir menú" : "Cerrar menú"}
      >
        {collapsed
          ? <Bars3Icon className="h-6 w-6 text-brand-50" />
          : <ChevronDoubleRightIcon className="h-6 w-6 text-brand-50 rotate-180" />
        }
      </button>

      <nav className="flex-1 overflow-y-auto px-2 mt-2 space-y-1">
        {/* Menú principal según el rol */}
        {(isTeacher ? teacherMenu : studentMenu).map(renderNavLink)}

        {/* Lista de cursos en Mi Aprendizaje */}
        {(location.pathname.startsWith('/my-learning') || location.pathname === '/contenido') && !collapsed && (
          <div className="mt-6">
            <div className="text-xs uppercase text-brand-300 px-3 mb-2">
              Mis Cursos
            </div>
            {loading ? (
              <div className="w-full px-3 py-2 text-[#E2E8F0]">Cargando...</div>
            ) : (
              cursos.map((curso) => (
                <div key={curso.cod_curso} className="mb-4">
                  <button
                    onClick={() => cargarModulos(curso.cod_curso!)}
                    className={`w-full flex justify-between items-center px-3 py-2 ${
                      selectedCourse === curso.cod_curso 
                        ? 'bg-[#334155]' 
                        : 'bg-[#0F172A]'
                    } text-left font-medium rounded hover:bg-[#334155]`}
                  >
                    <div className="flex items-center space-x-2">
                      <BookOpenIcon className="w-5 h-5 text-[#46838C]" />
                      <span className="text-[#E2E8F0]">{curso.titulo_curso}</span>
                    </div>
                    <ChevronDownIcon className="h-5 w-5 text-[#46838C]" />
                  </button>

                  {/* Módulos del curso seleccionado */}
                  {selectedCourse === curso.cod_curso && modules
                    .filter(mod => mod.cod_curso === curso.cod_curso)
                    .map((mod) => (
                      <div key={mod.cod_modulo} className="ml-4 mt-2">
                        <button
                          onClick={() => {
                            toggleModule(mod.cod_modulo!);
                            cargarSecciones(mod.cod_modulo!);
                          }}
                          className={`w-full flex justify-between items-center px-3 py-2 ${
                            selectedModule === mod.cod_modulo
                              ? 'bg-[#334155]'
                              : 'bg-[#1E293B]'
                          } text-left font-medium rounded hover:bg-[#334155]`}
                        >
                          <div className="flex items-center space-x-2">
                            <DocumentTextIcon className="w-4 h-4 text-[#46838C]" />
                            <span className="text-[#E2E8F0] text-sm">{mod.titulo_modulo}</span>
                          </div>
                          {openModules.includes(mod.cod_modulo!) ? (
                            <ChevronUpIcon className="h-4 w-4 text-[#46838C]" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 text-[#46838C]" />
                          )}
                        </button>

                        {/* Secciones del módulo */}
                        {openModules.includes(mod.cod_modulo!) && (
                          <div className="ml-4 mt-2 space-y-2">
                            {sections
                              .filter(sec => sec.cod_modulo === mod.cod_modulo)
                              .map((sec) => (
                                <div key={sec.cod_seccion}>
                                  <button
                                    onClick={() => {
                                      toggleSection(sec.cod_seccion!);
                                      cargarSubsecciones(sec.cod_seccion!);
                                    }}
                                    className={`w-full flex justify-between items-center px-3 py-2 ${
                                      selectedSection === sec.cod_seccion
                                        ? 'bg-[#334155]'
                                        : 'bg-[#0F172A]'
                                    } text-left font-medium rounded hover:bg-[#334155]`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <CodeBracketIcon className="w-4 h-4 text-[#46838C]" />
                                      <span className="text-[#E2E8F0] text-sm">{sec.titulo_seccion}</span>
                                    </div>
                                    {openSections.includes(sec.cod_seccion!) ? (
                                      <ChevronUpIcon className="h-4 w-4 text-[#46838C]" />
                                    ) : (
                                      <ChevronDownIcon className="h-4 w-4 text-[#46838C]" />
                                    )}
                                  </button>

                                  {/* Subsecciones de la sección */}
                                  {openSections.includes(sec.cod_seccion!) && (
                                    <div className="ml-4 mt-2 space-y-2">
                                      {subsections
                                        .filter(sub => sub.cod_seccion === sec.cod_seccion)
                                        .map((sub) => (
                                          <Link
                                            key={sub.cod_subseccion}
                                            to={`/contenido?subseccion=${sub.cod_subseccion}&seccion=${sec.cod_seccion}&modulo=${mod.cod_modulo}&curso=${curso.cod_curso}`}
                                            onClick={() => handleSubsectionClick(
                                              sub.cod_subseccion!,
                                              sec.cod_seccion!,
                                              mod.cod_modulo!,
                                              curso.cod_curso!
                                            )}
                                            className={`flex items-center space-x-2 px-3 py-2 text-sm rounded ${
                                              selectedSubsection === sub.cod_subseccion
                                                ? 'bg-[#334155] text-[#E2E8F0]'
                                                : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#1E293B]'
                                            }`}
                                          >
                                            <LightBulbIcon className="w-4 h-4" />
                                            <span>{sub.titulo_subseccion}</span>
                                          </Link>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))
            )}
          </div>
        )}

        {/* Opciones de administración solo para profesores */}
        {isTeacher && !collapsed && (
          <div className="border-t border-brand-600 pt-4 mt-4">
            <div className="text-xs uppercase text-brand-300 px-3 mb-2">
              Administración
            </div>
            <Link
              to="/courses/create"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent/30 text-white hover:bg-accent/50 transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap select-none">Crear Curso</span>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};
