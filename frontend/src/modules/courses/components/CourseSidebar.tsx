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
    <aside className="w-80 bg-[#1E293B] p-4 overflow-y-auto border-r border-[#D1D5DB]">
      <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">{course.title}</h2>

      {course.modules?.map((mod) => (
        <div key={mod.id} className="mb-4">
          <button
            onClick={() => toggleModule(mod.id)}
            className="w-full flex justify-between items-center px-3 py-2 bg-[#0F172A] text-left font-medium rounded hover:bg-[#3B82F6]"
            >
            <div className="flex items-center space-x-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[#E2E8F0]"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
                </svg>
                <span className="text-[#E2E8F0]">{mod.title}</span>
            </div>
            <span>{openModules.includes(mod.id) ? "▲" : "▼"}</span>
            </button>

          {openModules.includes(mod.id) && (
            <div className="mt-2 ml-2 space-y-3">
              {mod.sections?.map((sec) => (
                <div
                  key={sec.id}
                >
                  <Link
                    to={`${sec.id}`}
                    className={`text-sm font-semibold block ${
                      sec.id === sectionId ? "text-[#3B82F6] underline" : "text-[#E2E8F0]"
                    }`}
                  >
                    {sec.title}
                  </Link>

                  <ul className="ml-3 mt-2 space-y-1 text-sm text-[#84CCD7]">
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
