const Navbar = () => {
  return (
    <header className="bg-neo-magenta border-b-5 border-black shadow-brutal-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <h1 className="font-brutal text-3xl text-black">
              CURSO<span className="text-white">BRUTAL</span>
            </h1>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex items-center space-x-4">
            <button className="bg-neo-cyan border-3 border-black shadow-brutal px-6 py-2 font-brutal text-lg hover:shadow-brutal-lg transition-shadow duration-100">
              MIS CURSOS
            </button>
            <button className="bg-neo-lime border-3 border-black shadow-brutal px-6 py-2 font-brutal text-lg hover:shadow-brutal-lg transition-shadow duration-100">
              PROGRESO
            </button>
            <div className="bg-neo-orange border-3 border-black shadow-brutal px-4 py-2">
              <span className="font-brutal text-lg">👤 USUARIO</span>
            </div>
          </nav>

          {/* Menú móvil */}
          <button className="md:hidden bg-neo-red border-3 border-black shadow-brutal px-4 py-2 font-brutal text-lg">
            ⋮
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
