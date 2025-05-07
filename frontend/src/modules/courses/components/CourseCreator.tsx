import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';
import { FiUpload as UploadIcon } from 'react-icons/fi';

interface Module {
  title: string;
  order: number;
  sections?: Section[];
  id?: string | number;
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) { // Limitar a 2MB
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Sube una imagen menor a 2MB');
    }
  };

  const handleSaveCourse = () => {
    if (courseTitle.trim()) {
      setIsSubmitting(true);
      saveCourse({ 
        title: courseTitle, 
        description: courseDescription,
        image: previewImage || undefined
      });
      setCourseTitle('');
      setCourseDescription('');
      setIsSubmitting(false);
    }
  };

  const handleSaveModule = () => {
    if (moduleTitle.trim()) {
      saveModule({ 
        title: moduleTitle, 
        order: (course?.modules?.length || 0) + 1,
        sections: [] // Inicializar el array de secciones vacío
      });
      setModuleTitle('');
    }
  };

  const handleSaveSection = () => {
    if (sectionTitle.trim()) {
      saveSection({ 
        title: sectionTitle,
        subsections: [] // Inicializar el array de subsecciones vacío
      });
      setSectionTitle('');
    }
  };

  const handleSaveSubsection = () => {
    if (subsectionTitle.trim() && subsectionContent.trim()) {
      saveSubsection({ 
        title: subsectionTitle, 
        content: subsectionContent 
      });
      setSubsectionTitle('');
      setSubsectionContent('');
    }
  };

  const renderCourseForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl text-[#E2E8F0] font-bold">Crear Curso</h2>
      
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

      <div>
        <label className="block text-[#E2E8F0] mb-1">Descripción del Curso</label>
        <textarea
          placeholder="Describe el contenido del curso"
          className="w-full p-2 border border-gray-600 rounded bg-[#1E293B] text-white min-h-[100px]"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-[#E2E8F0] mb-1">Imagen del Curso</label>
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-[#1E293B] hover:bg-[#1E293B]/80 transition">
          {previewImage ? (
            <div className="relative w-full h-full">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewImage(null);
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <UploadIcon className="w-8 h-8 mb-2" />
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

      <button
        onClick={handleSaveCourse}
        className="w-full bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-3 rounded-lg disabled:opacity-50 transition mt-6"
        disabled={!courseTitle.trim() || isSubmitting}
      >
        {isSubmitting ? 'Creando...' : 'Crear Curso'}
      </button>
    </div>
  );

  const renderModulesList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">Módulos de {course?.title}</h2>
      </div>
      
      {/* Lista de módulos existentes */}
      <div className="space-y-3">
        {course?.modules && course.modules.length > 0 ? (
          course.modules.map((mod: Module, index: number) => (
            <div 
              key={mod.id || index} 
              className="bg-[#1E293B] p-4 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#E2E8F0] font-medium">{mod.title}</h3>
                  <p className="text-gray-400 text-sm">{mod.sections?.length || 0} secciones</p>
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
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No hay módulos agregados aún.</p>
        )}
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
      
      <div className="flex justify-end mt-4">
        <button
          onClick={completeCreation}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Finalizar Curso
        </button>
      </div>
    </div>
  );
  
  const renderSectionsList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">Secciones de {module?.title}</h2>
        <button 
          onClick={goBack} 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Volver a Módulos
        </button>
      </div>
      
      {/* Lista de secciones existentes */}
      <div className="space-y-3">
        {module?.sections && module.sections.length > 0 ? (
          module.sections.map((sec: Section, index: number) => (
            <div 
              key={sec.id || index} 
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
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No hay secciones agregadas aún.</p>
        )}
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

  const renderSubsectionsList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">Subsecciones de {section?.title}</h2>
        <button 
          onClick={goBack} 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Volver a Secciones
        </button>
      </div>
      
      {/* Lista de subsecciones existentes */}
      <div className="space-y-3">
        {section?.subsections && section.subsections.length > 0 ? (
          section.subsections.map((subsec: Subsection, index: number) => (
            <div 
              key={subsec.id || index} 
              className="bg-[#1E293B] p-4 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#E2E8F0] font-medium">{subsec.title}</h3>
                  <p className="text-gray-400 text-sm truncate max-w-md">
                    {subsec.content && subsec.content.length > 50 
                      ? `${subsec.content.substring(0, 50)}...` 
                      : subsec.content}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition">
                    Ver Contenido
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
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No hay subsecciones agregadas aún.</p>
        )}
      </div>

      {/* Formulario para agregar nueva subsección */}
      <div className="mt-6 bg-[#1E293B] p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg text-[#E2E8F0] font-medium mb-3">Agregar nueva subsección</h3>
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
          <button
            onClick={handleSaveSubsection}
            className="w-full bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded disabled:opacity-50 transition"
            disabled={!subsectionTitle.trim() || !subsectionContent.trim()}
          >
            Agregar Subsección
          </button>
        </div>
      </div>
    </div>
  );

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
      
      {/* Resumen del contenido del curso */}
      <div className="mt-4 bg-[#1E293B] p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium mb-2">Resumen del Contenido:</h3>
        <p>{course?.modules?.length || 0} módulos</p>
        <div className="mt-2 ml-4">
          {course?.modules?.map((mod, i) => (
            <div key={mod.id || i} className="mb-2">
              <p>• {mod.title} ({mod.sections?.length || 0} secciones)</p>
              {mod.sections && mod.sections.length > 0 && (
                <ul className="ml-6 list-disc">
                  {mod.sections.map((sec, j) => (
                    <li key={sec.id || j}>
                      {sec.title} ({sec.subsections?.length || 0} subsecciones)
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      
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
    <div className="p-6 mx-auto bg-[#0F172A] rounded-lg shadow-lg">
      {currentStage === 'course' && renderCourseForm()}
      {currentStage === 'module' && renderModulesList()}
      {currentStage === 'section' && renderSectionsList()}
      {currentStage === 'subsection' && renderSubsectionsList()}
      {currentStage === 'complete' && renderComplete()}
    </div>
  );
};