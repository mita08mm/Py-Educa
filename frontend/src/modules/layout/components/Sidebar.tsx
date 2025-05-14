import { useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDoubleRightIcon,
  HomeIcon,
  BookOpenIcon,
  PlusCircleIcon,
  BookmarkIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const menu = [
  { label: "Inicio", path: "/", icon: HomeIcon },
  { label: "Cursos", path: "/courses/create", icon: BookOpenIcon },
  { label: "Módulos", path: "/modules/create", icon: BookmarkIcon },
  { label: "Secciones", path: "/sections/create", icon: DocumentTextIcon },
  { label: "Subsecciones", path: "/subsections/create", icon: DocumentDuplicateIcon },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

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
