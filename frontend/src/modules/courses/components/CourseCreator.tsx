import { useState } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';
import { FiUpload as UploadIcon } from 'react-icons/fi';

interface Module {
  title: string;
  description?: string;
  order: number;
  sections?: Section[];
  id?: string | number;
}

interface Section {
  title: string;
  description?: string;
  subsections?: Subsection[];
  id?: string | number;
}

interface Subsection {
  title: string;
  description?: string;
  content: string;
  id?: string | number;
}

export const CourseCreator = () => {
  const {
    currentStage,
    course,
    module,
    section,
    currentModuleIndex,
    currentSectionIndex,
    saveCourse,
    saveModule,
    saveSection,
    saveSubsection,
    resetCreation,
    completeCreation,
    goBack,
  } = useCourseCreation();

  // Estados para el formulario de curso
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Estados para el formulario de módulo
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [editingModuleId, setEditingModuleId] = useState<string | number | null>(null);
  
  // Estados para el formulario de sección
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [editingSectionId, setEditingSectionId] = useState<string | number | null>(null);
  
  // Estados para el formulario de subsección
  const [subsectionTitle, setSubsectionTitle] = useState('');
  const [subsectionDescription, setSubsectionDescription] = useState('');
  const [subsectionContent, setSubsectionContent] = useState('');
  const [editingSubsectionId, setEditingSubsectionId] = useState<string | number | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingContent, setViewingContent] = useState<Subsection | null>(null);

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

  // Manejo de curso
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

  // Manejo de módulos
  const handleSaveModule = () => {
    if (moduleTitle.trim()) {
      if (editingModuleId) {
        // Lógica para actualizar un módulo existente
        const updatedModule = course?.modules?.find(m => m.id === editingModuleId);
        if (updatedModule) {
          saveModule({
            ...updatedModule,
            title: moduleTitle,
            description: moduleDescription
          });
        }
        setEditingModuleId(null);
      } else {
        // Crear nuevo módulo
        saveModule({ 
          title: moduleTitle,
          description: moduleDescription,
          order: (course?.modules?.length || 0) + 1,
          sections: []
        });
      }
      setModuleTitle('');
      setModuleDescription('');
    }
  };

  const handleEditModule = (mod: Module) => {
    setModuleTitle(mod.title);
    setModuleDescription(mod.description || '');
    setEditingModuleId(mod.id || null);
  };

  const handleDeleteModule = (moduleId: string | number | undefined) => {
    if (!moduleId || !course) return;
    
    const updatedModules = course.modules?.filter(m => m.id !== moduleId) || [];
    // Aquí normalmente llamarías a una función para actualizar el curso en el backend
    saveCourse({
      ...course,
      modules: updatedModules
    });
  };

  // Manejo de secciones
  const handleSaveSection = () => {
    if (sectionTitle.trim()) {
      if (editingSectionId) {
        // Lógica para actualizar una sección existente
        const updatedSection = module?.sections?.find(s => s.id === editingSectionId);
        if (updatedSection) {
          saveSection({
            ...updatedSection,
            title: sectionTitle,
            description: sectionDescription
          });
        }
        setEditingSectionId(null);
      } else {
        // Crear nueva sección
        saveSection({ 
          title: sectionTitle,
          description: sectionDescription,
          subsections: []
        });
      }
      setSectionTitle('');
      setSectionDescription('');
    }
  };

  const handleEditSection = (sec: Section) => {
    setSectionTitle(sec.title);
    setSectionDescription(sec.description || '');
    setEditingSectionId(sec.id || null);
  };

  const handleDeleteSection = (sectionId: string | number | undefined) => {
    if (!sectionId || !module || !course || currentModuleIndex === null) return;
    
    const updatedSections = module.sections?.filter(s => s.id !== sectionId) || [];
    // Actualizar el módulo con las secciones filtradas
    const updatedCourse = { ...course };
    if (updatedCourse.modules && updatedCourse.modules[currentModuleIndex]) {
      updatedCourse.modules[currentModuleIndex].sections = updatedSections;
      saveCourse(updatedCourse);
    }
  };

  // Manejo de subsecciones
  const handleSaveSubsection = () => {
    if (subsectionTitle.trim() && subsectionContent.trim()) {
      if (editingSubsectionId) {
        // Lógica para actualizar una subsección existente
        const updatedSubsection = section?.subsections?.find(s => s.id === editingSubsectionId);
        if (updatedSubsection) {
          saveSubsection({
            ...updatedSubsection,
            title: subsectionTitle,
            description: subsectionDescription,
            content: subsectionContent
          });
        }
        setEditingSubsectionId(null);
      } else {
        // Crear nueva subsección
        saveSubsection({ 
          title: subsectionTitle,
          description: subsectionDescription,
          content: subsectionContent 
        });
      }
      setSubsectionTitle('');
      setSubsectionDescription('');
      setSubsectionContent('');
    }
  };

  const handleEditSubsection = (sub: Subsection) => {
    setSubsectionTitle(sub.title);
    setSubsectionDescription(sub.description || '');
    setSubsectionContent(sub.content);
    setEditingSubsectionId(sub.id || null);
  };

  const handleDeleteSubsection = (subsectionId: string | number | undefined) => {
    if (!subsectionId || !section || !module || !course || currentModuleIndex === null || currentSectionIndex === null) return;
    
    const updatedSubsections = section.subsections?.filter(s => s.id !== subsectionId) || [];
    // Actualizar la sección con las subsecciones filtradas
    const updatedCourse = { ...course };
    if (updatedCourse.modules && 
        updatedCourse.modules[currentModuleIndex] && 
        updatedCourse.modules[currentModuleIndex].sections && 
        updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex]) {
      updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections = updatedSubsections;
      saveCourse(updatedCourse);
    }
  };

  const handleViewSubsection = (sub: Subsection) => {
    setViewingContent(sub);
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
                  {mod.description && (
                    <p className="text-gray-300 text-sm mt-1">{mod.description}</p>
                  )}
                  <p className="text-gray-400 text-sm mt-1">{mod.sections?.length || 0} secciones</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="bg-[#46838C] hover:bg-[#2F646D] text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => saveModule(mod)}
                  >
                    Ver Secciones
                  </button>
                  <button 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => handleEditModule(mod)}
                  >
                    Modificar
                  </button>
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => handleDeleteModule(mod.id)}
                  >
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
        <h3 className="text-lg text-[#E2E8F0] font-medium mb-3">
          {editingModuleId ? 'Modificar módulo' : 'Agregar nuevo módulo'}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título del módulo"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <textarea
            placeholder="Descripción del módulo (opcional)"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white min-h-[80px]"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSaveModule}
              className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded disabled:opacity-50 transition flex-1"
              disabled={!moduleTitle.trim()}
            >
              {editingModuleId ? 'Actualizar' : 'Agregar'}
            </button>
            {editingModuleId && (
              <button
                onClick={() => {
                  setEditingModuleId(null);
                  setModuleTitle('');
                  setModuleDescription('');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              >
                Cancelar
              </button>
            )}
          </div>
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
        <h2 className="text-2xl text-[#E2E8F0] font-bold">
          Secciones de {module?.title}
        </h2>
        <button
          onClick={goBack}
          className="text-gray-400 hover:text-white transition"
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
                  {sec.description && (
                    <p className="text-gray-300 text-sm mt-1">{sec.description}</p>
                  )}
                  <p className="text-gray-400 text-sm mt-1">{sec.subsections?.length || 0} subsecciones</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="bg-[#46838C] hover:bg-[#2F646D] text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => saveSection(sec)}
                  >
                    Ver Subsecciones
                  </button>
                  <button 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => handleEditSection(sec)}
                  >
                    Modificar
                  </button>
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => handleDeleteSection(sec.id)}
                  >
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
        <h3 className="text-lg text-[#E2E8F0] font-medium mb-3">
          {editingSectionId ? 'Modificar sección' : 'Agregar nueva sección'}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título de la sección"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
          <textarea
            placeholder="Descripción de la sección (opcional)"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white min-h-[80px]"
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSaveSection}
              className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded disabled:opacity-50 transition flex-1"
              disabled={!sectionTitle.trim()}
            >
              {editingSectionId ? 'Actualizar' : 'Agregar'}
            </button>
            {editingSectionId && (
              <button
                onClick={() => {
                  setEditingSectionId(null);
                  setSectionTitle('');
                  setSectionDescription('');
                }}
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

  const renderSubsectionsList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#E2E8F0] font-bold">
          Subsecciones de {section?.title}
        </h2>
        <button
          onClick={goBack}
          className="text-gray-400 hover:text-white transition"
        >
          Volver a Secciones
        </button>
      </div>
      
      {/* Modal para visualizar contenido */}
      {viewingContent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E293B] rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl text-white font-bold">{viewingContent.title}</h3>
                  {viewingContent.description && (
                    <p className="text-gray-300 mt-1">{viewingContent.description}</p>
                  )}
                </div>
                <button 
                  onClick={() => setViewingContent(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
              <div className="prose prose-invert max-w-none mt-4">
                <div dangerouslySetInnerHTML={{ __html: viewingContent.content }} />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lista de subsecciones existentes */}
      <div className="space-y-3">
        {section?.subsections && section.subsections.length > 0 ? (
          section.subsections.map((sub: Subsection, index: number) => (
            <div 
              key={sub.id || index} 
              className="bg-[#1E293B] p-4 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#E2E8F0] font-medium">{sub.title}</h3>
                  {sub.description && (
                    <p className="text-gray-300 text-sm mt-1">{sub.description}</p>
                  )}
                  <p className="text-gray-400 text-sm mt-1">
                    {sub.content.length > 100 ? `${sub.content.substring(0, 100)}...` : sub.content}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => handleViewSubsection(sub)}
                  >
                    Ver
                  </button>
                  <button 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => handleEditSubsection(sub)}
                  >
                    Modificar
                  </button>
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                    onClick={() => handleDeleteSubsection(sub.id)}
                  >
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
        <h3 className="text-lg text-[#E2E8F0] font-medium mb-3">
          {editingSubsectionId ? 'Modificar subsección' : 'Agregar nueva subsección'}
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
            placeholder="Descripción breve (opcional)"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white min-h-[60px]"
            value={subsectionDescription}
            onChange={(e) => setSubsectionDescription(e.target.value)}
          />
          <textarea
            placeholder="Contenido detallado de la subsección"
            className="w-full p-2 border border-gray-600 rounded bg-[#0F172A] text-white min-h-[200px]"
            value={subsectionContent}
            onChange={(e) => setSubsectionContent(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSaveSubsection}
              className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded disabled:opacity-50 transition flex-1"
              disabled={!subsectionTitle.trim() || !subsectionContent.trim()}
            >
              {editingSubsectionId ? 'Actualizar' : 'Agregar'}
            </button>
            {editingSubsectionId && (
              <button
                onClick={() => {
                  setEditingSubsectionId(null);
                  setSubsectionTitle('');
                  setSubsectionDescription('');
                  setSubsectionContent('');
                }}
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

  const renderComplete = () => (
    <div className="space-y-6 text-center">
      <div className="text-green-500 text-6xl">✓</div>
      <h2 className="text-2xl text-[#E2E8F0] font-bold">¡Curso Creado Exitosamente!</h2>
      <p className="text-gray-400">
        Has completado la creación del curso "{course?.title}" con {course?.modules?.length || 0} módulos.
      </p>
      <div className="pt-4">
        <button
          onClick={resetCreation}
          className="bg-[#46838C] hover:bg-[#2F646D] text-white px-6 py-3 rounded-lg transition"
        >
          Crear Otro Curso
        </button>
      </div>
    </div>
  );

  // Renderizado condicional según la etapa actual
  const renderStage = () => {
    switch (currentStage) {
      case 'course':
        return renderCourseForm();
      case 'module':
        return renderModulesList();
      case 'section':
        return renderSectionsList();
      case 'subsection':
        return renderSubsectionsList();
      case 'complete':
        return renderComplete();
      default:
        return renderCourseForm();
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {renderStage()}
    </div>
  );
};