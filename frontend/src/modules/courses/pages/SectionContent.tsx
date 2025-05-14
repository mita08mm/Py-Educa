// src/modules/courses/pages/SectionContent.tsx
import { useParams } from "react-router-dom";
import { useMyCourses } from "../hooks/useMyCourses";

export const SectionContent = () => {
  const { courseId, sectionId } = useParams();
  const { myCourses } = useMyCourses();

  const course = myCourses.find(c => c.id === courseId);
  const section = course?.modules
    ?.flatMap(m => m.sections || [])
    .find(s => s.id === sectionId);

  if (!section) return <p className="text-[#E2E8F0]">Sección no encontrada.</p>;

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{section.title}</h1>
      {section.subsections?.map(sub => (
        <div key={sub.id} className="mb-6">
          <h2>{sub.title}</h2>
          <p>{sub.content}</p>
        </div>
      ))}
    </article>
  );
};
