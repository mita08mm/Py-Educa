// Lista para crear subsecciones
import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';

interface SubsectionsListProps {
  sectionName?: string;
}

interface Subsection {
  title: string;
  content: string;
  id?: string | number;
}

export const SubsectionsList: React.FC<SubsectionsListProps> = ({ sectionName }) => {
  const { saveSubsection, goBack, section } = useCourseCreation();
  const [subsectionTitle, setSubsectionTitle] = useState<string>('');
  const [subsectionContent, setSubsectionContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedSubsection, setSelectedSubsection] = useState<Subsection | null>(null);

  const handleSaveSubsection = () => {
    if (subsectionTitle.trim() && subsectionContent.trim()) {
      if (isEditing && selectedSubsection) {
        // Actualizar subsección existente - esta funcionalidad deberá implementarse en el hook
        // saveSubsectionUpdate({ ...selectedSubsection, title: subsectionTitle, content: subsectionContent });
        saveSubsection({ title: subsectionTitle, content: subsectionContent });
      } else {
        // Crear nueva subsección
        saveSubsection({ title: subsectionTitle, content: subsectionContent });
      }
      setSubsectionTitle('');
      setSubsectionContent('');
      setIsEditing(false);
      setSelectedSubsection(null);
    }
  };

  const handleEditSubsection = (subsection: Subsection) => {
    setSubsectionTitle(subsection.title);
    setSubsectionContent(subsection.content);
    setIsEditing(true);
    setSelectedSubsection(subsection);
  };

  const handleCancelEdit = () => {
    setSubsectionTitle('');
    setSubsectionContent('');
    setIsEditing(false);
    setSelectedSubsection(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">Subsecciones de {sectionName}</h2>
        <button 
          onClick={goBack} 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Volver a Secciones
        </button>
      </div>
      
      {/* Lista de subsecciones existentes */}
      <div className="space-y-3">
        {section?.subsections?.map((sub: Subsection, index: number) => (
          <div 
            key={index} 
            className="bg-[#1E293B] p-4 rounded-lg border border-gray-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#E2E8F0] font-medium">{sub.title}</h3>
                <p className="text-gray-400 text-sm truncate max-w-md">{sub.content.substring(0, 50)}...</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition"
                  onClick={() => handleEditSubsection(sub)}
                >
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

      {/* Formulario para agregar/editar subsección */}
      <div className="mt-6 bg-[#1E293B] p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg text-[#E2E8F0] font-medium mb-3">
          {isEditing ? 'Editar subsección' : 'Agregar nueva subsección'}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título de la subsección"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white"
            value={subsectionTitle}
            onChange={(e) => setSubsectionTitle(e.target.value)}
          />
          <textarea
            placeholder="Contenido de la subsección"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white min-h-[150px]"
            value={subsectionContent}
            onChange={(e) => setSubsectionContent(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSaveSubsection}
              className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded disabled:opacity-50 transition"
              disabled={!subsectionTitle.trim() || !subsectionContent.trim()}
            >
              {isEditing ? 'Actualizar' : 'Agregar'}
            </button>
            {isEditing && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};