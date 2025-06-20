import { useState } from "react";
import type { Seccion, Subseccion } from "../../types/seccion";
import CrearSubseccionModal from "./CrearSubseccionModal";

interface SeccionConSubsecciones extends Seccion {
  subsecciones: Subseccion[];
}

interface SeccionAccordionProps {
  seccion: SeccionConSubsecciones;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  moduloId: number;
  onContentCreated: () => void;
}

const SeccionAccordion = ({
  seccion,
  index,
  isOpen,
  onToggle,
  moduloId,
  onContentCreated,
}: SeccionAccordionProps) => {
  const [isSubseccionModalOpen, setIsSubseccionModalOpen] = useState(false);

  const sectionColors = [
    "bg-neo-mint",
    "bg-neo-coral",
    "bg-neo-lavender",
    "bg-neo-yellow",
    "bg-neo-aqua",
    "bg-neo-sage",
  ];

  const bgColor = sectionColors[index % sectionColors.length];

  return (
    <div className={`${bgColor} border-4 border-black shadow-brutal-lg`}>
      {/* Header de la sección */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-opacity-80 transition-all duration-100 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-black text-white border-3 border-black shadow-brutal px-4 py-2">
            <span className="font-brutal text-lg">{index + 1}</span>
          </div>
          <div>
            <h3 className="font-brutal text-xl text-black mb-1">
              {seccion.titulo_seccion.toUpperCase()}
            </h3>
            {seccion.descripcion_seccion && (
              <p className="text-gray-800 font-medium">
                {seccion.descripcion_seccion}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-neo-red border-2 border-black shadow-brutal px-3 py-1">
            <span className="font-brutal text-sm">
              {seccion.subsecciones.length} SUB-SECCIONES
            </span>
          </div>
          <span
            className={`font-brutal text-2xl transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Contenido expandible - Subsecciones */}
      {isOpen && (
        <div className="border-t-4 border-black bg-white">
          {seccion.subsecciones.length > 0 ? (
            <div className="p-4 space-y-3">
              {seccion.subsecciones.map((subseccion, subIndex) => (
                <div
                  key={subseccion.cod_subseccion}
                  className="bg-neo-cream border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-100 hover:translate-x-1"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-neo-orange border-2 border-black px-3 py-1">
                        <span className="font-brutal text-sm">
                          {index + 1}.{subIndex + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-black">
                          {subseccion.titulo_subseccion}
                        </h4>
                        {subseccion.descripcion_subseccion && (
                          <p className="text-gray-700 text-sm mt-1">
                            {subseccion.descripcion_subseccion}
                          </p>
                        )}
                      </div>
                    </div>

                    <button className="bg-neo-lime border-3 border-black shadow-brutal px-4 py-2 font-brutal text-sm hover:shadow-brutal-lg transition-shadow duration-100">
                      ESTUDIAR
                    </button>
                  </div>
                </div>
              ))}

              {/* Botón para agregar nuevo tema */}
              <div className="pt-3 border-t-2 border-gray-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSubseccionModalOpen(true);
                  }}
                  className="w-full bg-neo-cyan border-3 border-black shadow-brutal p-4 font-brutal hover:shadow-brutal-lg transition-all duration-100 hover:translate-x-1"
                >
                  ➕ AÑADIR NUEVO TEMA A ESTA SECCIÓN
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="bg-neo-orange border-3 border-black shadow-brutal p-4 mb-4">
                <span className="font-brutal text-lg">
                  NO HAY SUB-SECCIONES DISPONIBLES
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSubseccionModalOpen(true);
                }}
                className="bg-neo-lime border-3 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
              >
                ➕ CREAR EL PRIMER TEMA
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal para crear subsección */}
      <CrearSubseccionModal
        isOpen={isSubseccionModalOpen}
        onClose={() => setIsSubseccionModalOpen(false)}
        moduloId={moduloId}
        seccionId={seccion.cod_seccion!}
        seccionTitulo={seccion.titulo_seccion}
        onSubseccionCreated={onContentCreated}
      />
    </div>
  );
};

export default SeccionAccordion;
