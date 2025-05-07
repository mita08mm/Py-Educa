// components/Navbar.tsx
import { Link } from 'react-router-dom';

export const Navbar = () => (
  <header className="flex items-center justify-between h-14 px-6 bg-brand-700 text-brand-50">
    <div className="font-bold">PyEduca</div>

    <nav className="space-x-6 hidden sm:block">
      <Link to="/"         className="hover:text-brand-200">Inicio</Link>
      <Link to="/comunidad" className="hover:text-brand-200">Comunidad</Link>
    </nav>

    <button className="rounded bg-brand-400 px-4 py-1 text-brand-50 hover:bg-brand-300">
      Iniciar Sesión
    </button>
  </header>
);
