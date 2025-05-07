// types/courseTypes.ts
export interface Subsection {
  title: string;
  content: string;
  id?: string | number;
  sectionId?: string | number;
}

export interface Section {
  title: string;
  id?: string | number;
  moduleId?: string | number;
  subsections?: Subsection[];
}

export interface Module {
  title: string;
  order: number;
  id?: string | number;
  courseId?: string | number;
  sections?: Section[];
}

export interface Course {
  title: string;
  description?: string;
  id?: string | number;
  modules?: Module[];
}