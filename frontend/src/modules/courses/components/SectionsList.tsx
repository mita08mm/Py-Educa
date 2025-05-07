// Lista para crear secciones
import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';

interface SectionsListProps {
  moduleName?: string;
}

interface Section {
    title: string;
    subsections?: Subsection[];
    id?: string | number;
  }
  
  interface Subsection {
    title: string;
    content: string;
    id?: string | number;
  }

export const SectionsList: React.FC<SectionsListProps> = ({ moduleName }) => {
  const { saveSection, goBack, module } = useCourseCreation();
  const [sectionTitle, setSectionTitle] = useState<string>('');

  const handleSaveSection = () => {
    if (sectionTitle.trim()) {
      saveSection({ title: sectionTitle });
      setSectionTitle('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">Secciones de {moduleName}</h2>
        <button 
          onClick={goBack} 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Volver a Módulos
        </button>
      </div>
      
      {/* Lista de secciones existentes */}
      <div className="space-y-3">
        {module?.sections?.map((sec: Section, index: number) => (
          <div 
            key={index} 
            className="bg-[#1E293B] p-4 rounded-lg border border-gray-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#E2E8F0] font-medium">{sec.title}</h3>
                <p className="text-gray-400 text-sm">{sec.subsections?.length || 0} subsecciones</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-[#46838C] hover:bg-[#2F646D] text-white px-3 py-1 rounded text-sm transition"
                  onClick={() => saveSection(sec)}
                >
                  Ver Subsecciones
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition">
                  Modificar
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para agregar nueva sección */}
      <div className="mt-6 bg-[#1E293B] p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg text-[#E2E8F0] font-medium mb-3">Agregar nueva sección</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Título de la sección"
            className="flex-1 p-2 border border-gray-600 rounded bg-[#0F172A] text-white"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
          <button
            onClick={handleSaveSection}
            className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded disabled:opacity-50 transition"
            disabled={!sectionTitle.trim()}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};