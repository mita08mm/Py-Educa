import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';

export const CourseCreator = () => {
  const {
    currentStage,
    course,
    module,
    section,
    saveCourse,
    saveModule,
    saveSection,
    saveSubsection,
    resetCreation,
    completeCreation,
    goBack,
  } = useCourseCreation();

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [subsectionTitle, setSubsectionTitle] = useState('');
  const [subsectionContent, setSubsectionContent] = useState('');

  const handleSaveCourse = () => {
    if (courseTitle.trim()) {
      saveCourse({ title: courseTitle, description: courseDescription });
      setCourseTitle('');
      setCourseDescription('');
    }
  };

  const handleSaveModule = () => {
    if (moduleTitle.trim()) {
      saveModule({ title: moduleTitle, order: (course?.modules?.length || 0) + 1 });
      setModuleTitle('');
    }
  };

  const handleSaveSection = () => {
    if (sectionTitle.trim()) {
      saveSection({ title: sectionTitle });
      setSectionTitle('');
    }
  };

  const handleSaveSubsection = () => {
    if (subsectionTitle.trim() && subsectionContent.trim()) {
      saveSubsection({ title: subsectionTitle, content: subsectionContent });
      setSubsectionTitle('');
      setSubsectionContent('');
    }
  };

  const renderCourseForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Nuevo Curso</h2>
      <input
        type="text"
        placeholder="Título del curso"
        className="w-full p-2 border rounded"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción del curso"
        className="w-full p-2 border rounded"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      <button
        onClick={handleSaveCourse}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!courseTitle.trim()}
      >
        Siguiente (Módulos)
      </button>
    </div>
  );

  const renderModuleForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Agregar Módulo a {course?.title}</h2>
      <input
        type="text"
        placeholder="Título del módulo"
        className="w-full p-2 border rounded"
        value={moduleTitle}
        onChange={(e) => setModuleTitle(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          onClick={handleSaveModule}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!moduleTitle.trim()}
        >
          Agregar Módulo
        </button>
      </div>
      <button onClick={goBack} className="bg-gray-500 text-white px-4 py-2 rounded">
        Back
      </button>
    </div>
  );

  const renderSectionForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Agregar Sección a {module?.title}</h2>
      <input
        type="text"
        placeholder="Título de la sección"
        className="w-full p-2 border rounded"
        value={sectionTitle}
        onChange={(e) => setSectionTitle(e.target.value)}
      />
       <div className="flex space-x-2">
        <button
          onClick={handleSaveSection}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!sectionTitle.trim()}
        >
          Agregar Sección
        </button>
      </div>
      <button onClick={goBack} className="bg-gray-500 text-white px-4 py-2 rounded">
        Back
      </button>
    </div>
  );

  const renderSubsectionForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Agregar Subsección a {section?.title}</h2>
      <input
        type="text"
        placeholder="Título de la subsección"
        className="w-full p-2 border rounded"
        value={subsectionTitle}
        onChange={(e) => setSubsectionTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenido de la subsección"
        className="w-full p-2 border rounded"
        value={subsectionContent}
        onChange={(e) => setSubsectionContent(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          onClick={handleSaveSubsection}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!subsectionTitle.trim() || !subsectionContent.trim()}
        >
          Agregar Subsección
        </button>
        <button
          onClick={() => {
            goBack();
          }}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Done Adding Subsections
        </button>
      </div>
      <button onClick={goBack} className="bg-gray-500 text-white px-4 py-2 rounded">
        Back
      </button>
    </div>
  );

  const renderComplete = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Curso Creado!</h2>
      <p>El curso "{course?.title}" ha sido creado.</p>
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(course, null, 2)}
      </pre>
      <div className="flex space-x-2">
        <button
          onClick={completeCreation}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Finalizar y Enviar
        </button>
        <button
          onClick={resetCreation}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Crear Otro Curso
        </button>
      </div>
    </div>
  );


  return (
    <div className="p-6 max-w-2xl mx-auto">
      {currentStage === 'course' && renderCourseForm()}
      {currentStage === 'module' && renderModuleForm()}
      {currentStage === 'section' && renderSectionForm()}
      {currentStage === 'subsection' && renderSubsectionForm()}
      {currentStage === 'complete' && renderComplete()}
    </div>
  );
};
