import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ——— Tipos básicos ——— */
export interface Subsection {
  id: string;
  title: string;
  content: string;
}

export interface Section {
  id: string;
  title: string;
  subsections?: Subsection[];
}

export interface Module {
  id: string;
  title: string;
  order: number;
  sections?: Section[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  image?: string;
  modules?: Module[];
}

/* ——— Context ——— */
interface MyCoursesContextProps {
  myCourses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  removeCourse: (courseId: string) => void;
}

const MyCoursesContext = createContext<MyCoursesContextProps | undefined>(
  undefined
);

/* ——— Provider ——— */
export const MyCoursesProvider = ({ children }: { children: ReactNode }) => {
  const [myCourses, setMyCourses] = useState<Course[]>(() => {
    // Carga inicial desde localStorage (si existe)
    const raw = localStorage.getItem("myCourses");
    return raw ? (JSON.parse(raw) as Course[]) : [];
  });

  useEffect(() => {
  const hasValidCourse = myCourses.some(course => course.modules && course.modules.length > 0);

  if (import.meta.env.DEV && !hasValidCourse) {
    const demo: Course = {
      id: "demo‑1",
      title: "Curso DEMO 🌟",
      description: "Solo para ver cómo luce la interfaz.",
      image: "/demo.jpg",
      modules: [
        {
          id: "mod-1",
          title: "Estructuras de Datos",
          order: 1,
          sections: [
            {
              id: "sec-1",
              title: "3.1 Listas",
              subsections: [
                {
                  id: "sub-1",
                  title: "3.1.1 Creación y acceso",
                  content: "Aquí aprenderás a crear listas y acceder a sus elementos."
                },
                {
                  id: "sub-2",
                  title: "3.1.2 Métodos comunes",
                  content: "Métodos como append, remove, insert, etc."
                },
                {
                  id: "sub-3",
                  title: "3.1.3 Listas anidadas",
                  content: "Uso de listas dentro de listas."
                }
              ]
            },
            {
              id: "sec-2",
              title: "3.2 Tuplas",
              subsections: [
                {
                  id: "sub-4",
                  title: "Uso de Tuplas",
                  content: "Inmutabilidad y comparación con listas."
                }
              ]
            }
          ]
        },
        {
          id: "mod-2",
          title: "Control de Flujo",
          order: 2,
          sections: [
            {
              id: "sec-3",
              title: "Condicionales",
              subsections: [
                {
                  id: "sub-5",
                  title: "if, elif, else",
                  content: "Estructuras condicionales básicas."
                }
              ]
            }
          ]
        }
      ]
    };

    setMyCourses([demo]);
  }
}, [myCourses]);

  

    useEffect(() => {
        localStorage.setItem("myCourses", JSON.stringify(myCourses));
    }, [myCourses]);

  /* ——— mutadores ——— */
  const addCourse = (course: Course) =>
    setMyCourses((prev) => [...prev, course]);

  const updateCourse = (course: Course) =>
    setMyCourses((prev) =>
      prev.map((c) => (c.id === course.id ? course : c))
    );

  const removeCourse = (courseId: string) =>
    setMyCourses((prev) => prev.filter((c) => c.id !== courseId));

  return (
    <MyCoursesContext.Provider
      value={{ myCourses, addCourse, updateCourse, removeCourse }}
    >
      {children}
    </MyCoursesContext.Provider>
  );
};

/* ——— Hook público ——— */
export const useMyCourses = () => {
  const ctx = useContext(MyCoursesContext);
  if (!ctx) {
    throw new Error(
      "useMyCourses debe usarse dentro de <MyCoursesProvider>."
    );
  }
  return ctx;
};
