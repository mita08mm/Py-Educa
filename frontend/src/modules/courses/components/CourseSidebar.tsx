// src/modules/courses/components/CourseSidebar.tsx
import { useState } from "react";
import { Course } from "../hooks/useMyCourses";
import { Link, useParams } from "react-router-dom";

export const CourseSidebar = ({ course }: { course: Course }) => {
  const { sectionId } = useParams();
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  return (
    <aside className="w-80 bg-white p-4 overflow-y-auto border-r border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{course.title}</h2>

      {course.modules?.map((mod) => (
        <div key={mod.id} className="mb-4">
          <button
            onClick={() => toggleModule(mod.id)}
            className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 text-left font-medium rounded hover:bg-gray-200"
          >
            <span>{mod.title}</span>
            <span>{openModules.includes(mod.id) ? "▲" : "▼"}</span>
          </button>

          {openModules.includes(mod.id) && (
            <div className="mt-2 ml-2 space-y-3">
              {mod.sections?.map((sec) => (
                <div
                  key={sec.id}
                  className="border-l-2 pl-3 border-gray-300 bg-gray-50 rounded p-2"
                >
                  <Link
                    to={`${sec.id}`}
                    className={`text-sm font-semibold block ${
                      sec.id === sectionId ? "text-blue-600 underline" : "text-gray-700"
                    }`}
                  >
                    {sec.title}
                  </Link>

                  <ul className="ml-3 mt-2 space-y-1 text-sm text-gray-600">
                    {sec.subsections?.map((sub) => (
                      <li key={sub.id} className="list-disc">
                        {sub.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};
