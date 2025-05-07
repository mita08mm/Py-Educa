
// Componente principal para crear el curso
import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';
import { CourseForm } from './CourseForm';
import { ModulesList } from './ModulesList';
import { SectionsList } from './SectionsList';
import { SubsectionsList } from './SubsectionsList';

export const CourseCreator: React.FC = () => {
  const {
    currentStage,
    course,
    module,
    section,
    resetCreation,
    completeCreation,
  } = useCourseCreation();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const renderComplete = () => (
    <div className="space-y-4 text-[#E2E8F0]">
      <h2 className="text-2xl font-bold">¡Curso Creado!</h2>
      <p>El curso "{course?.title}" ha sido creado exitosamente.</p>
      {previewImage && (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <img 
            src={previewImage} 
            alt="Course thumbnail" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex space-x-2">
        <button
          onClick={completeCreation}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Finalizar y Publicar
        </button>
        <button
          onClick={resetCreation}
          className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded transition"
        >
          Crear Nuevo Curso
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-[#0F172A] rounded-lg shadow-lg">
      {currentStage === 'course' && <CourseForm setPreviewImage={setPreviewImage} />}
      {currentStage === 'module' && <ModulesList courseName={course?.title} />}
      {currentStage === 'section' && <SectionsList moduleName={module?.title} />}
      {currentStage === 'subsection' && <SubsectionsList sectionName={section?.title} />}
      {currentStage === 'complete' && renderComplete()}
    </div>
  );
};