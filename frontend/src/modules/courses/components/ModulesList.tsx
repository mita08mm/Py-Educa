// Lista para crear modulos
import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';

interface ModulesListProps {
  courseName?: string;
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
  
  interface Module {
    title: string;
    order: number;
    sections?: Section[];
    id?: string | number;
  }

export const ModulesList: React.FC<ModulesListProps> = ({ courseName }) => {
  const { saveModule, goBack, course } = useCourseCreation();
  const [moduleTitle, setModuleTitle] = useState<string>('');

  const handleSaveModule = () => {
    if (moduleTitle.trim()) {
      saveModule({ 
        title: moduleTitle, 
        order: (course?.modules?.length || 0) + 1 
      });
      setModuleTitle('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">Módulos de {courseName}</h2>
        <button 
          onClick={goBack} 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Volver a Cursos
        </button>
      </div>
      
      {/* Lista de módulos existentes */}
      <div className="space-y-3">
        {course?.modules?.map((mod: Module, index: number) => (
          <div 
            key={index} 
            className="bg-[#1E293B] p-4 rounded-lg border border-gray-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#E2E8F0] font-medium">{mod.title}</h3>
                <p className="text-gray-400 text-sm">Orden: {mod.order}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-[#46838C] hover:bg-[#2F646D] text-white px-3 py-1 rounded text-sm transition"
                  onClick={() => saveModule(mod)}
                >
                  Ver Secciones
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

      {/* Formulario para agregar nuevo módulo */}
      <div className="mt-6 bg-[#1E293B] p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg text-[#E2E8F0] font-medium mb-3">Agregar nuevo módulo</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Título del módulo"
            className="flex-1 p-2 border border-gray-600 rounded bg-[#0F172A] text-white"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <button
            onClick={handleSaveModule}
            className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded disabled:opacity-50 transition"
            disabled={!moduleTitle.trim()}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};