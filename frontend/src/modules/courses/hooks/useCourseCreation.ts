import { useState } from 'react';
import { Course, Module, Section, Subsection } from '../types/courseTypes';

type CreationStage = 'course' | 'module' | 'section' | 'subsection' | 'complete';

export const useCourseCreation = () => {
  const [currentStage, setStage] = useState<CreationStage>('course');
  const [course, setCourse] = useState<Course | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [subsection, setSubsection] = useState<Subsection | null>(null);

  const saveCourse = (data: Omit<Course, 'id' | 'modules'>) => {
    const newCourse = { ...data, id: Date.now().toString(), modules: [] };
    setCourse(newCourse);
    setStage('module');
  };

  const saveModule = (data: Omit<Module, 'id' | 'courseId' | 'sections'>) => {
    if (!course) return;
    const newModule: Module = { // Explicitly type newModule
      ...data,
      id: Date.now().toString(),
      courseId: course.id,
      sections: []
    };
    setCourse(prevCourse => {
      if (!prevCourse) return null;
      return {
        ...prevCourse,
        modules: [...(prevCourse.modules || []), newModule]
      };
    });
    setModule(newModule);
    setStage('section');
  };

  const saveSection = (data: Omit<Section, 'id' | 'moduleId' | 'subsections'>) => {
    if (!module) return;
    const newSection: Section = { // Explicitly type newSection
      ...data,
      id: Date.now().toString(),
      moduleId: module.id,
      subsections: []
    };
    setCourse(prevCourse => {
      if (!prevCourse) return null;
      const updatedModules = prevCourse.modules?.map(m => {
        if (m.id === module.id) {
          return {
            ...m,
            sections: [...(m.sections || []), newSection]
          };
        }
        return m;
      });
      return {
        ...prevCourse,
        modules: updatedModules
      };
    });
    setSection(newSection);
    setStage('subsection');
  };

  const saveSubsection = (data: Omit<Subsection, 'id' | 'sectionId'>) => {
    if (!section) return;
    const newSubsection: Subsection = { // Explicitly type newSubsection
      ...data,
      id: Date.now().toString(),
      sectionId: section.id
    };
    setCourse(prevCourse => {
      if (!prevCourse) return null;
      const updatedModules = prevCourse.modules?.map(m => {
        const updatedSections = m.sections?.map(s => {
          if (s.id === section.id) {
            return {
              ...s,
              subsections: [...(s.subsections || []), newSubsection]
            };
          }
          return s;
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
    setSubsection(newSubsection);
    // After saving a subsection, stay on the subsection stage to allow adding more
    // or move to a completion/review stage. For now, let's reset subsection state
    // and allow adding more subsections to the current section.
    setSubsection(null);
  };

  const resetCreation = () => {
    setStage('course');
    setCourse(null);
    setModule(null);
    setSection(null);
    setSubsection(null);
  };

  const completeCreation = () => {
    // Here you would typically send the 'course' object to a backend API
    console.log('Course creation complete:', course);
    setStage('complete');
  };

  // Helper to go back to the previous stage (basic implementation)
  const goBack = () => {
    if (currentStage === 'subsection') setStage('section');
    else if (currentStage === 'section') setStage('module');
    else if (currentStage === 'module') setStage('course');
  };


  return {
    currentStage,
    course,
    module,
    section,
    subsection,
    saveCourse,
    saveModule,
    saveSection,
    saveSubsection,
    resetCreation,
    completeCreation,
    goBack,
  };
};
