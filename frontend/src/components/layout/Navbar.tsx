const Navbar = () => {
  return (
    <header className="bg-neo-periwinkle border-b-5 border-black shadow-brutal-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 ">
            <h1 className="font-brutal text-3xl text-neo-cyan ">
              PY<span className="text-neo-yellow">EDUCA</span>
            </h1>
            <a
              href="/sandbox"
              className="ml-6 bg-neo-peach border-3 border-black rounded-lg px-4 py-2 font-brutal text-lg text-neo-cream hover:bg-neo-lime hover:text-neo-cream transition-all duration-100"
            >
              Editor Python
            </a>
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
