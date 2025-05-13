// src/modules/courses/pages/CourseViewer.tsx
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { useMyCourses } from "../hooks/useMyCourses";
import { useEffect } from "react";
import { SectionContent } from "./SectionContent";
import { CourseSidebar } from "../components/CourseSidebar"; // 👈 Importa tu nuevo sidebar

export const courseViewerChildren = [
  { path: ":sectionId", element: <SectionContent /> },
];

export const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { myCourses } = useMyCourses();

  const course = myCourses.find((c) => c.id === courseId);

  useEffect(() => {
    if (!course) navigate("/my-learning");
  }, [course, navigate]);

  if (!course) return null;

  return (
    <div className="flex h-full">
      {/* Sidebar estilo Cisco */}
      <CourseSidebar course={course} />

      {/* Contenido de la sección */}
      <section className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </section>
    </div>
  );
};
