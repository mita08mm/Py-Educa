import { useModo } from "../../context/ModoContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isModoProfesor, toggleModo } = useModo();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-neo-periwinkle border-b-5 border-black shadow-brutal-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 ">
            <h1 
              className="font-brutal text-3xl text-neo-cyan cursor-pointer hover:scale-105 transition-transform duration-100"
              onClick={handleLogoClick}
            >
              PY<span className="text-neo-yellow">EDUCA</span>
            </h1>
            <a
              href="/sandbox"
              className="ml-6 bg-neo-peach border-3 border-black rounded-lg px-4 py-2 font-brutal text-lg text-neo-cream hover:bg-neo-lime hover:text-neo-cream transition-all duration-100"
            >
              Editor Python
            </a>
          </div>

          {/* Toggle Modo Profesor/Estudiante */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-neo-lavender rounded-lg px-4 py-2">
              <span className={`font-brutal text-sm ${isModoProfesor ? 'text-neo-lime' : 'text-neo-mint'}`}>
                👨‍🏫
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!isModoProfesor}
                  onChange={toggleModo}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neo-sage peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neo-lime"></div>
              </label>
              <span className={`font-brutal text-sm ${!isModoProfesor ? 'text-neo-lime' : 'text-neo-mint'}`}>
                👨‍🎓
              </span>
            </div>
            <span className="font-brutal text-sm text-neo-cream">
              {isModoProfesor ? 'MODO PROFESOR' : 'MODO ESTUDIANTE'}
            </span>
          </div>

          <button className="md:hidden bg-neo-red border-3 border-black shadow-brutal px-4 py-2 font-brutal text-lg">
            ⋮
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
