export interface Course {
    id: string;
    title: string;
    description: string;
    modules?: Module[]; // Added modules property
  }

  export interface Module {
    id: string;
    courseId: string;
    title: string;
    order: number;
    sections?: Section[]; // Add sections property
  }

  export interface Section {
    id: string;
    moduleId: string;
    title: string;
    subsections?: Subsection[]; // Add subsections property
  }
  
  export interface Subsection {
    id: string;
    sectionId: string;
    title: string;
    content: string;
  }
