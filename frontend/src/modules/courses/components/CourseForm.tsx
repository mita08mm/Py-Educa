import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';
import { FiUpload as UploadIcon } from 'react-icons/fi';

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

  const renderCourseForm = () => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string); // Explicitamos que es string
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">Crear Curso</h2>
        
        {/* Campo de título */}
        <div>
          <label className="block text-[#E2E8F0] mb-1">Título del Curso</label>
          <input
            type="text"
            placeholder="Ej: Introducción a Python"
            className="w-full p-2 border border-gray-600 rounded bg-[#1E293B] text-white"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>
  
        {/* Campo de descripción */}
        <div>
          <label className="block text-[#E2E8F0] mb-1">Descripción del Curso</label>
          <textarea
            placeholder="Describe el contenido del curso"
            className="w-full p-2 border border-gray-600 rounded bg-[#1E293B] text-white min-h-[100px]"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </div>
  
        {/* Campo de imagen (nuevo) */}
        <div>
          <label className="block text-[#E2E8F0] mb-1">Imagen del Curso</label>
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-[#1E293B] hover:bg-[#1E293B]/80 transition">
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <UploadIcon className="w-8 h-8 mb-2" /> {/* Icono de subida */}
                <p className="text-sm">Click para subir imagen</p>
                <p className="text-xs mt-1">Formatos: JPG, PNG (Max. 2MB)</p>
              </div>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
            />
          </label>
        </div>
  
        {/* Botón de acción */}
        <button
          onClick={handleSaveCourse}
          className="w-full bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-3 rounded-lg disabled:opacity-50 transition mt-6"
          disabled={!courseTitle.trim()}
        >
          Crear Curso
        </button>
      </div>
    );
};  

  const renderModuleForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl text-[#E2E8F0] font-bold">Agregar Módulo a {course?.title}</h2>
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
          className="bg-[#46838C] text-white px-4 py-2 rounded disabled:opacity-50"
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
      <h2 className="text-2xl text-[#E2E8F0] font-bold">Agregar Sección a {module?.title}</h2>
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
      <h2 className="text-2xl text-[#E2E8F0] font-bold">Agregar Subsección a {section?.title}</h2>
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
