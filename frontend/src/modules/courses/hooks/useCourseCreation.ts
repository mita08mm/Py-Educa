import { useState } from 'react';

// Interfaces necesarias
interface Course {
  title: string;
  description?: string;
  image?: string;
  modules?: Module[];
  id?: string | number;
}

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

// Tipo para las etapas de creación
type CreationStage = 'course' | 'module' | 'section' | 'subsection' | 'complete';

export const useCourseCreation = () => {
  // Estados principales
  const [currentStage, setCurrentStage] = useState<CreationStage>('course');
  const [course, setCourse] = useState<Course | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);

  // Función auxiliar para generar IDs únicos
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Obtener el módulo y sección actuales
  const module = currentModuleIndex !== null && course?.modules 
    ? course.modules[currentModuleIndex] 
    : null;

  const section = currentSectionIndex !== null && module?.sections 
    ? module.sections[currentSectionIndex] 
    : null;

  // Función para guardar el curso
  const saveCourse = (newCourse: Course) => {
    const courseWithId = {
      ...newCourse,
      id: newCourse.id || generateId(),
      modules: newCourse.modules || []
    };
    setCourse(courseWithId);
    if (!newCourse.modules) {
      setCurrentStage('module');
    }
  };

  // Función para guardar un módulo
  const saveModule = (selectedModule: Module) => {
    if (!course) return;

    // Si el módulo ya existe, solo navegar a él
    if (selectedModule.id) {
      const moduleIndex = course.modules?.findIndex(m => m.id === selectedModule.id) ?? -1;
      if (moduleIndex !== -1) {
        setCurrentModuleIndex(moduleIndex);
        setCurrentStage('section');
        return;
      }
    }

    // Si es un nuevo módulo, añadirlo al curso
    const moduleWithId = {
      ...selectedModule,
      id: generateId(),
      sections: selectedModule.sections || []
    };

    const updatedModules = [...(course.modules || []), moduleWithId];
    
    setCourse({
      ...course,
      modules: updatedModules
    });
    
    setCurrentModuleIndex(updatedModules.length - 1);
    setCurrentStage('section');
  };

  // Función para guardar una sección
  const saveSection = (selectedSection: Section) => {
    if (!course || currentModuleIndex === null) return;

    // Si la sección ya existe, solo navegar a ella
    if (selectedSection.id && module) {
      const sectionIndex = module.sections?.findIndex(s => s.id === selectedSection.id) ?? -1;
      if (sectionIndex !== -1) {
        setCurrentSectionIndex(sectionIndex);
        setCurrentStage('subsection');
        return;
      }
    }

    // Si es una nueva sección, añadirla al módulo actual
    const sectionWithId = {
      ...selectedSection,
      id: generateId(),
      subsections: selectedSection.subsections || []
    };

    const updatedCourse = { ...course };
    if (!updatedCourse.modules) {
      updatedCourse.modules = [];
    }
    
    if (updatedCourse.modules[currentModuleIndex] && !updatedCourse.modules[currentModuleIndex].sections) {
      updatedCourse.modules[currentModuleIndex].sections = [];
    }
    
    if (updatedCourse.modules[currentModuleIndex] && updatedCourse.modules[currentModuleIndex].sections) {
      updatedCourse.modules[currentModuleIndex].sections.push(sectionWithId);
      setCourse(updatedCourse);
      setCurrentSectionIndex(updatedCourse.modules[currentModuleIndex].sections.length - 1);
      setCurrentStage('subsection');
    }
  };

  // Función para guardar una subsección
  const saveSubsection = (newSubsection: Subsection) => {
    if (!course || currentModuleIndex === null || currentSectionIndex === null) return;

    const subsectionWithId = {
      ...newSubsection,
      id: newSubsection.id || generateId()
    };

    const updatedCourse = { ...course };
    
    // Asegurarse de que todas las estructuras existen
    if (updatedCourse.modules && 
        updatedCourse.modules[currentModuleIndex] && 
        updatedCourse.modules[currentModuleIndex].sections && 
        updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex]) {
      
      if (!updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections) {
        updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections = [];
      }
      
      // Si estamos editando una subsección existente
      if (newSubsection.id && updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections) {
        const subsectionIndex = updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections.findIndex(
          s => s.id === newSubsection.id
        );
        
        if (subsectionIndex !== -1) {
          updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections[subsectionIndex] = subsectionWithId;
        } else {
          updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections.push(subsectionWithId);
        }
      } else if (updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections) {
        updatedCourse.modules[currentModuleIndex].sections[currentSectionIndex].subsections.push(subsectionWithId);
      }
      
      setCourse(updatedCourse);
    }
  };

  // Función para volver a la etapa anterior
  const goBack = () => {
    if (currentStage === 'section') {
      setCurrentStage('module');
      setCurrentModuleIndex(null);
    } else if (currentStage === 'subsection') {
      setCurrentStage('section');
      setCurrentSectionIndex(null);
    }
  };

  // Función para completar la creación del curso
  const completeCreation = () => {
    setCurrentStage('complete');
  };

  // Función para reiniciar el proceso de creación
  const resetCreation = () => {
    setCourse(null);
    setCurrentModuleIndex(null);
    setCurrentSectionIndex(null);
    setCurrentStage('course');
  };

  return {
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
    goBack,
    completeCreation,
    resetCreation
  };
};