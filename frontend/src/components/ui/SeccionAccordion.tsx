import { useState } from "react";
import type { Seccion, Subseccion } from "../../types/seccion";
import CrearSubseccionModal from "./CrearSubseccionModal";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Usar solo dos colores modernos
  const bgColor = "bg-neo-periwinkle";
  const headerColor = "bg-neo-lavender";

  const handleEstudiar = (subseccionId: number) => {
    navigate(`/contenido/${subseccionId}`);
  };

  return (
    <div className={`${bgColor}  rounded-xl shadow-lg mb-4`}>
      {/* Header de la sección */}
      <button
        onClick={onToggle}
        className={`${headerColor} w-full p-6 text-left bg-neo-lavender rounded-t-xl flex items-center justify-between hover:bg-neo-periwinkle/90 transition-all duration-100`}
      >
        <div className="flex items-center space-x-4">
          <div className="text-neo-cream rounded-lg px-4 py-2 font-brutal text-lg">
            {index + 1}
          </div>
          <div>
            <h3 className="font-brutal text-xl text-neo-cream mb-1">
              {seccion.titulo_seccion.toUpperCase()}
            </h3>
            {seccion.descripcion_seccion && (
              <p className="text-neo-mint font-medium">
                {seccion.descripcion_seccion}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-neo-cream rounded-lg px-3 py-1 font-brutal text-sm">
            {seccion.subsecciones.length} SUB-SECCIONES
          </div>
          <span
            className={`font-brutal text-2xl text-neo-cream transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Contenido expandible - Subsecciones */}
      {isOpen && (
        <div className="bg-neo-lavender rounded-b-xl">
          {seccion.subsecciones.length > 0 ? (
            <div className="p-4 space-y-3">
              {seccion.subsecciones.map((subseccion, subIndex) => (
                <div
                  key={subseccion.cod_subseccion}
                  className="bg-neo-periwinkle rounded-lg p-4 flex items-center justify-between hover:bg-neo-periwinkle/80 transition-all duration-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-neo-cream rounded-lg px-3 py-1 font-brutal text-sm">
                      {index + 1}.{subIndex + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-neo-cream">
                        {subseccion.titulo_subseccion}
                      </h4>
                      {subseccion.descripcion_subseccion && (
                        <p className="text-neo-mint text-sm mt-1">
                          {subseccion.descripcion_subseccion}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleEstudiar(subseccion.cod_subseccion!)}
                    className="bg-neo-lime rounded-lg px-6 py-3 font-brutal text-neo-cream text-sm transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-neo-green"
                  >
                    ESTUDIAR
                  </button>
                </div>
              ))}

              {/* Botón para agregar nuevo tema */}
              <div className="pt-3 border-t border-neo-mint">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSubseccionModalOpen(true);
                  }}
                  className="w-full bg-neo-lime rounded-lg px-6 py-3 font-brutal text-neo-cream transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-neo-green"
                >
                  + AÑADIR NUEVO TEMA A ESTA SECCIÓN
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="text-neo-cream rounded-lg p-4 mb-4">
                <span className="font-brutal text-lg">
                  NO HAY SUB-SECCIONES DISPONIBLES
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSubseccionModalOpen(true);
                }}
                className="bg-neo-lime rounded-lg px-6 py-3 font-brutal text-neo-cream transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-neo-green"
              >
                + CREAR EL PRIMER TEMA
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
