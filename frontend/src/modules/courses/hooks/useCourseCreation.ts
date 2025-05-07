// hooks/useCourseCreation.ts
import { useState, useCallback } from 'react';
import { Course, Module, Section, Subsection } from '../types/courseTypes';

// Tipo para las etapas del proceso de creación
type CreationStage = 'course' | 'module' | 'section' | 'subsection' | 'complete';

export const useCourseCreation = () => {
  // Estado para cada nivel de la jerarquía del curso
  const [course, setCourse] = useState<Course | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  
  // Estado para controlar en qué etapa del proceso estamos
  const [currentStage, setCurrentStage] = useState<CreationStage>('course');
  
  // Guardar curso
  const saveCourse = useCallback((courseData: { title: string, description?: string }) => {
    // Generar ID único para el curso
    const courseWithId: Course = { 
      ...courseData, 
      id: Date.now(), 
      modules: [] 
    };
    setCourse(courseWithId);
    setCurrentStage('module');
  }, []);
  
  // Guardar o seleccionar módulo
  const saveModule = useCallback((moduleData: { title: string, order: number, id?: string | number, sections?: Section[] }) => {
    if (!course) return;
    
    // Si el módulo ya existe (tiene ID), estamos navegando a sus secciones
    if (moduleData.id) {
      setModule(moduleData);
      setCurrentStage('section');
      return;
    }
    
    // Generar ID único para el nuevo módulo
    const moduleWithId: Module = { 
      ...moduleData, 
      id: Date.now(),
      courseId: course.id,
      sections: [] 
    };
    
    // Actualizar el curso con el nuevo módulo
    setCourse(prevCourse => {
      if (!prevCourse) return null;
      return {
        ...prevCourse,
        modules: [...(prevCourse.modules || []), moduleWithId]
      };
    });
    
    // Navegar a las secciones del módulo recién creado
    setModule(moduleWithId);
    setCurrentStage('section');
  }, [course]);
  
  // Guardar o seleccionar sección
  const saveSection = useCallback((sectionData: { title: string, id?: string | number, subsections?: Subsection[] }) => {
    if (!course || !module) return;
    
    // Si la sección ya existe (tiene ID), estamos navegando a sus subsecciones
    if (sectionData.id) {
      setSection(sectionData);
      setCurrentStage('subsection');
      return;
    }
    
    // Generar ID único para la nueva sección
    const sectionWithId: Section = { 
      ...sectionData, 
      id: Date.now(),
      moduleId: module.id,
      subsections: [] 
    };
    
    // Actualizar el curso con la nueva sección
    setCourse(prevCourse => {
      if (!prevCourse) return null;
      
      const updatedModules = prevCourse.modules?.map(m => {
        if (m.id === module.id) {
          return {
            ...m,
            sections: [...(m.sections || []), sectionWithId]
          };
        }
        return m;
      });
      
      return {
        ...prevCourse,
        modules: updatedModules
      };
    });
    
    // Actualizar el módulo actual
    setModule(prevModule => {
      if (!prevModule) return null;
      return {
        ...prevModule,
        sections: [...(prevModule.sections || []), sectionWithId]
      };
    });
    
    // Navegar a las subsecciones de la sección recién creada
    setSection(sectionWithId);
    setCurrentStage('subsection');
  }, [course, module]);
  
  // Guardar subsección
  const saveSubsection = useCallback((subsectionData: { title: string, content: string, id?: string | number }) => {
    if (!course || !module || !section) return;
    
    // Generar ID único para la nueva subsección
    const subsectionWithId: Subsection = { 
      ...subsectionData, 
      id: Date.now(),
      sectionId: section.id
    };
    
    // Actualizar el curso con la nueva subsección
    setCourse(prevCourse => {
      if (!prevCourse) return null;
      
      const updatedModules = prevCourse.modules?.map(m => {
        if (m.id !== module.id) return m;
        
        const updatedSections = m.sections?.map(s => {
          if (s.id !== section.id) return s;
          
          return {
            ...s,
            subsections: [...(s.subsections || []), subsectionWithId]
          };
        });
        
        return {
          ...m,
          sections: updatedSections
        };
      });
      
      return {
        ...prevCourse,
        modules: updatedModules
      };
    });
    
    // Actualizar el módulo actual
    setModule(prevModule => {
      if (!prevModule) return null;
      
      const updatedSections = prevModule.sections?.map(s => {
        if (s.id !== section.id) return s;
        
        return {
          ...s,
          subsections: [...(s.subsections || []), subsectionWithId]
        };
      });
      
      return {
        ...prevModule,
        sections: updatedSections
      };
    });
    
    // Actualizar la sección actual
    setSection(prevSection => {
      if (!prevSection) return null;
      
      return {
        ...prevSection,
        subsections: [...(prevSection.subsections || []), subsectionWithId]
      };
    });
  }, [course, module, section]);
  
  // Navegar hacia atrás
  const goBack = useCallback(() => {
    if (currentStage === 'module') {
      setCurrentStage('course');
      setModule(null);
    } else if (currentStage === 'section') {
      setCurrentStage('module');
      setSection(null);
    } else if (currentStage === 'subsection') {
      setCurrentStage('section');
    }
  }, [currentStage]);
  
  // Finalizar creación
  const completeCreation = useCallback(() => {
    // Aquí iría la lógica para guardar el curso en la base de datos
    console.log('Curso completo:', course);
    // Se podría implementar aquí la lógica para enviar los datos a un backend
    setCurrentStage('complete');
  }, [course]);
  
  // Reiniciar el proceso de creación
  const resetCreation = useCallback(() => {
    setCourse(null);
    setModule(null);
    setSection(null);
    setCurrentStage('course');
  }, []);
  
  return {
    // Estados
    currentStage,
    course,
    module,
    section,
    
    // Acciones 
    saveCourse,
    saveModule,
    saveSection,
    saveSubsection,
    goBack,
    completeCreation,
    resetCreation
  };
};