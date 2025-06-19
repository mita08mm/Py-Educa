import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface Subsection {
  id: number;
  title: string;
  content: string;
}

export interface Section {
  id: number;
  title: string;
  subsections?: Subsection[];
}

export interface Module {
  id: number;
  title: string;
  order: number;
  sections?: Section[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  lastAccessed: string;
  modules?: Module[];
}

interface MyCoursesContextProps {
  myCourses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  removeCourse: (courseId: number) => void;
}

const MyCoursesContext = createContext<MyCoursesContextProps | undefined>(
  undefined
);

export const MyCoursesProvider = ({ children }: { children: ReactNode }) => {
  const [myCourses, setMyCourses] = useState<Course[]>(() => {
    const raw = localStorage.getItem("myCourses");
    return raw ? (JSON.parse(raw) as Course[]) : [];
  });

  useEffect(() => {
    const hasValidCourse = myCourses.some(course => course.modules && course.modules.length > 0);

    if (import.meta.env.DEV && !hasValidCourse) {
      const demo: Course = {
        id: 1,
        title: "Curso DEMO",
        description: "Solo para ver cómo luce la interfaz.",
        progress: 0,
        lastAccessed: new Date().toISOString(),
        modules: []
      };

      setMyCourses([demo]);
    }
  }, [myCourses]);

  useEffect(() => {
    localStorage.setItem("myCourses", JSON.stringify(myCourses));
  }, [myCourses]);

  const addCourse = (course: Course) =>
    setMyCourses((prev) => [...prev, course]);

  const updateCourse = (course: Course) =>
    setMyCourses((prev) =>
      prev.map((c) => (c.id === course.id ? course : c))
    );

  const removeCourse = (courseId: number) =>
    setMyCourses((prev) => prev.filter((c) => c.id !== courseId));

  return (
    <MyCoursesContext.Provider
      value={{ myCourses, addCourse, updateCourse, removeCourse }}
    >
      {children}
    </MyCoursesContext.Provider>
  );
};

export const useMyCourses = () => {
  const ctx = useContext(MyCoursesContext);
  if (!ctx) {
    throw new Error(
      "useMyCourses debe usarse dentro de <MyCoursesProvider>."
    );
  }
  return ctx;
};
