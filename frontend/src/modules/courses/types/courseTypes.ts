export interface Course {
    id: string;
    title: string;
    description: string;
    modules?: Module[]; 
  }

  export interface Module {
    id: string;
    courseId: string;
    title: string;
    order: number;
    sections?: Section[]; 
  }

  export interface Section {
    id: string;
    moduleId: string;
    title: string;
    subsections?: Subsection[]; 
  }
  
  export interface Subsection {
    id: string;
    sectionId: string;
    title: string;
    content: string;
  }
