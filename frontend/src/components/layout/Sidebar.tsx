const Sidebar = () => {
  return (
    <aside className="w-80 bg-neo-periwinkle border-r-5 border-black shadow-brutal-lg">
      <div className="p-6 space-y-4">
        {/* Curso Actual */}
        <div className="bg-neo-yellow border-4 border-black shadow-brutal p-4">
          <h2 className="font-brutal text-xl mb-2">CURSO ACTUAL</h2>
          <h3 className="font-bold text-lg">React + TypeScript</h3>
          <div className="mt-3 bg-neo-green border-2 border-black h-3">
            <div className="bg-neo-red h-full w-3/4"></div>
          </div>
          <span className="text-sm font-bold">Progreso: 75%</span>
        </div>

        {/* Navegación de módulos */}
        <nav className="space-y-3">
          <div className="bg-neo-mint border-3 border-black shadow-brutal">
            <button className="w-full text-left p-4 font-brutal text-lg">
              📚 MÓDULO 1: FUNDAMENTOS
            </button>
          </div>

          <div className="bg-neo-sage border-3 border-black shadow-brutal">
            <button className="w-full text-left p-4 font-brutal text-lg">
              🔧 MÓDULO 2: PRÁCTICA
            </button>
          </div>

          <div className="bg-neo-lavender border-3 border-black shadow-brutal">
            <button className="w-full text-left p-4 font-brutal text-lg">
              🚀 MÓDULO 3: AVANZADO
            </button>
          </div>
        </nav>

        {/* Stats */}
        <div className="bg-neo-coral border-4 border-black shadow-brutal p-4">
          <h3 className="font-brutal text-lg mb-3">TUS STATS</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Cursos:</span>
              <span className="bg-neo-yellow border-2 border-black px-2 py-1 text-sm font-bold">
                3
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Tiempo:</span>
              <span className="bg-neo-cyan border-2 border-black px-2 py-1 text-sm font-bold">
                24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
