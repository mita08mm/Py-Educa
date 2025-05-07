<<<<<<< HEAD
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
=======
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDoubleRightIcon,
  HomeIcon,
  BookOpenIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const menu = [
  { label: "Introducción", path: "/",          icon: HomeIcon    },
  { label: "Variables",    path: "/variables", icon: BookOpenIcon},
  { label: "Control",      path: "/control",   icon: CpuChipIcon },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`
        bg-surface min-h-screen
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
      </nav>
    </aside>
  );
};
>>>>>>> feature/module-visualization
