import { useState, useEffect } from 'react';
// import { cursoService, Curso } from '../../../services/api'; // Eliminado porque no se usan

interface CourseProgressProps {
  courseId: number;
}

export const CourseProgress = ({ courseId }: CourseProgressProps) => {
  const [progress, setProgress] = useState({
    completedModules: 0,
    totalModules: 0,
    completedSections: 0,
    totalSections: 0,
    completedSubsections: 0,
    totalSubsections: 0,
    lastAccessed: null as string | null,
  });

  useEffect(() => {
    fetchProgress();
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      // TODO: Implementar servicio para obtener el progreso real
      // Por ahora usamos datos de ejemplo
      setProgress({
        completedModules: 2,
        totalModules: 5,
        completedSections: 8,
        totalSections: 15,
        completedSubsections: 12,
        totalSubsections: 30,
        lastAccessed: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error al obtener el progreso:', error);
    }
  };

  const calculatePercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="bg-[#1E293B] rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#E2E8F0] mb-6">Tu Progreso</h2>
      
      <div className="space-y-6">
        {/* Barra de progreso general */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#94A3B8]">Progreso General</span>
            <span className="text-sm font-medium text-[#E2E8F0]">
              {calculatePercentage(progress.completedSubsections, progress.totalSubsections)}%
            </span>
          </div>
          <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#46838C] transition-all duration-300"
              style={{
                width: `${calculatePercentage(progress.completedSubsections, progress.totalSubsections)}%`,
              }}
            />
          </div>
        </div>

        {/* Estadísticas detalladas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0F172A] p-4 rounded-lg">
            <h3 className="text-sm text-[#94A3B8] mb-1">Módulos</h3>
            <p className="text-2xl font-bold text-[#E2E8F0]">
              {progress.completedModules}/{progress.totalModules}
            </p>
            <div className="mt-2 h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#46838C]"
                style={{
                  width: `${calculatePercentage(progress.completedModules, progress.totalModules)}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-[#0F172A] p-4 rounded-lg">
            <h3 className="text-sm text-[#94A3B8] mb-1">Secciones</h3>
            <p className="text-2xl font-bold text-[#E2E8F0]">
              {progress.completedSections}/{progress.totalSections}
            </p>
            <div className="mt-2 h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#46838C]"
                style={{
                  width: `${calculatePercentage(progress.completedSections, progress.totalSections)}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-[#0F172A] p-4 rounded-lg">
            <h3 className="text-sm text-[#94A3B8] mb-1">Subsecciones</h3>
            <p className="text-2xl font-bold text-[#E2E8F0]">
              {progress.completedSubsections}/{progress.totalSubsections}
            </p>
            <div className="mt-2 h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#46838C]"
                style={{
                  width: `${calculatePercentage(progress.completedSubsections, progress.totalSubsections)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Último acceso */}
        {progress.lastAccessed && (
          <div className="text-sm text-[#94A3B8]">
            Último acceso: {new Date(progress.lastAccessed).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}; 