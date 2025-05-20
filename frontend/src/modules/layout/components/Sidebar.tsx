import { useState, useEffect } from "react";
import { NavLink, useLocation, Link, useParams } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDoubleRightIcon,
  HomeIcon,
  BookOpenIcon,
  PlusCircleIcon,
  BookmarkIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { moduloService, seccionService, subseccionService, Modulo, Seccion, Subseccion } from "../../../services/api";

const menu = [
  { label: "Inicio", path: "/", icon: HomeIcon },
  { label: "Cursos", path: "/courses/create", icon: BookOpenIcon },
  { label: "Módulos", path: "/modules/create", icon: BookmarkIcon },
  { label: "Secciones", path: "/sections/create", icon: DocumentTextIcon },
  { label: "Subsecciones", path: "/subsections/create", icon: DocumentDuplicateIcon },
  { label: "Mi Aprendizaje", path: "/my-learning", icon: AcademicCapIcon },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modules, setModules] = useState<Modulo[]>([]); 
  const [sections, setSections] = useState<Seccion[]>([]); 
  const [subsections, setSubsections] = useState<Subseccion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModules, setOpenModules] = useState<number[]>([]); 
  const location = useLocation();
  const { courseId, sectionId } = useParams<{ courseId: string, sectionId?: string }>(); 
  useEffect(() => {
    if (courseId) {
      const parsedCourseId = Number(courseId); 
      if (!isNaN(parsedCourseId)) {
        fetchModules(parsedCourseId);
      } else {
        console.error("courseId no es válido");
      }
    }
  }, [courseId]);

  const fetchModules = async (courseId: number) => {
    setLoading(true);
    try {
      const modulesData = await moduloService.getAll();
      const filteredModules = modulesData.filter(mod => mod.cod_curso === courseId);
      setModules(filteredModules); 
      const allSections: Seccion[] = [];
      for (const mod of filteredModules) {
        const sectionsData = await seccionService.getAll();
        const filteredSections = sectionsData.filter(sec => sec.cod_modulo === mod.cod_modulo);
        allSections.push(...filteredSections);
      }
      setSections(allSections);
      const allSubsections: Subseccion[] = [];
      for (const sec of allSections) {
        const subsectionsData = await subseccionService.getAll();
        const filteredSubsections = subsectionsData.filter(sub => sub.cod_seccion === sec.cod_seccion);
        allSubsections.push(...filteredSubsections);
      }
      setSubsections(allSubsections);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
    } finally {
      setLoading(false);
    }
  };
  const toggleModule = (moduleId: number) => {
    setOpenModules((prev) => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  return (
    <aside
      className={`
        bg-brand-700 min-h-screen
        ${collapsed ? "w-16 overflow-x-hidden" : "w-64"}
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
        {menu.map(({ label, path, icon: Icon }) => {
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
        })}

        {!collapsed && modules.map((mod) => (
          <div key={mod.cod_modulo} className="mb-6">
            <button
              onClick={() => toggleModule(mod.cod_modulo!)}  
              className="w-full flex justify-between items-center px-3 py-2 bg-[#0F172A] text-left font-medium rounded hover:bg-[#334155]"
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#46838C]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
                <span className="text-[#E2E8F0]">{mod.titulo_modulo}</span>
              </div>
              <span>
                {openModules.includes(mod.cod_modulo!) ? (
                  <ChevronUpIcon className="h-5 w-5 text-[#46838C]" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-[#46838C]" />
                )}
              </span>
            </button>

            {openModules.includes(mod.cod_modulo!) && (
              <div className="mt-2 ml-2 space-y-3">
                {sections
                  .filter((sec) => sec.cod_modulo === mod.cod_modulo)
                  .map((sec, secIndex) => (
                    <div key={sec.cod_seccion}>
                      <h4
                        className={`text-sm font-semibold ${
                          sec.cod_seccion === sectionId
                            ? 'text-[#334155] underline'
                            : 'text-[#E2E8F0]'
                        }`}
                      >
                        {`${secIndex + 1}. ${sec.titulo_seccion}`}
                        <span className=" ml-2 text-xs text-[#84CCD7]">
                          ({secIndex + 1}/{sections.filter(s => s.cod_modulo === mod.cod_modulo).length})
                        </span>
                      </h4>

                      <div className="ml-4 mt-2 space-y-3">
                        {subsections
                          .filter((sub) => sub.cod_seccion == sec.cod_seccion)
                          .map((sub, subIndex)=> (
                            <div key={sub.cod_subseccion}>
                              <h5 className="text-xs text-[#84CCD7]">
                              {`${secIndex + 1}.${subIndex + 1} ${sub.titulo_subseccion}`} 
                              </h5>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
        {!collapsed && (
          <div className="border-t border-brand-600 pt-4 mt-4">
            <div className="text-xs uppercase text-brand-300 px-3 mb-2">Administración</div>
            <Link
              to="/courses/create"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent/30 text-white hover:bg-accent/50 transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap select-none">Crear Curso</span>
            </Link>
          </div>
        )}
        
        {collapsed && (
          <div className="border-t border-brand-600 pt-4 mt-4">
            <Link
              to="/courses/create"
              className="flex justify-center items-center rounded-md px-3 py-2 text-sm font-medium bg-accent/30 text-white hover:bg-accent/50 transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5 shrink-0" />
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};
