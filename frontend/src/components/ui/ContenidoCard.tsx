import React, { useState } from "react";

interface ContenidoCardProps {
  contenido: {
    cod_contenido: number;
    titulo?: string;
    descripcion?: string;
    imagen?: string;
    link?: string;
    orden?: number;
  };
  index: number;
}

const ContenidoCard: React.FC<ContenidoCardProps> = ({ contenido, index }) => {
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "video">("content");

  // Determinar qué tipo de contenido tenemos
  const hasImage =
    contenido.imagen && contenido.imagen.trim() !== "" && !imageError;
  const hasVideo = contenido.link && contenido.link.trim() !== "";
  const hasDescription =
    contenido.descripcion && contenido.descripcion.trim() !== "";
  const hasTitle = contenido.titulo && contenido.titulo.trim() !== "";

  // Función para obtener el embed URL de YouTube
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const videoId = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
      );
      return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
    } catch {
      return null;
    }
  };

  const colors = [
    "bg-neo-coral",
    "bg-neo-mint",
    "bg-neo-peach",
    "bg-neo-lime",
    "bg-neo-yellow",
    "bg-neo-cyan",
  ];

  const cardColor = colors[index % colors.length];
  const embedUrl =
    hasVideo && contenido.link ? getYouTubeEmbedUrl(contenido.link) : null;

  // Si tenemos tanto imagen como video, usamos tabs
  const needsTabs = hasImage && hasVideo;

  // Determinar tab inicial
  React.useEffect(() => {
    if (needsTabs) {
      setActiveTab(hasImage ? "content" : "video");
    }
  }, [hasImage, hasVideo, needsTabs]);

  return (
    <div className={`${cardColor} rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
      {/* Header de la Card */}
      <div className="bg-neo-periwinkle p-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h3 className="font-brutal text-xl text-neo-cream">
            {hasTitle ? contenido.titulo : `📚 CONTENIDO #${index + 1}`}
          </h3>

          {/* Badges de tipo de contenido */}
          <div className="flex gap-2 flex-wrap">
            {hasDescription && (
              <span className="bg-neo-cream text-neo-periwinkle px-3 py-1 text-xs font-bold rounded-full">
                📝 TEXTO
              </span>
            )}
            {hasImage && (
              <span className="bg-neo-yellow text-neo-periwinkle px-3 py-1 text-xs font-bold rounded-full">
                📷 IMAGEN
              </span>
            )}
            {hasVideo && (
              <span className="bg-neo-coral text-neo-cream px-3 py-1 text-xs font-bold rounded-full">
                🎥 VIDEO
              </span>
            )}
          </div>
        </div>

        {/* Tabs si hay imagen Y video */}
        {needsTabs && (
          <div className="flex mt-4 gap-2">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-4 py-2 font-brutal text-sm rounded-lg transition-all duration-200 ${
                activeTab === "content"
                  ? "bg-neo-cream text-neo-periwinkle"
                  : "bg-transparent text-neo-cream border border-neo-cream hover:bg-neo-cream hover:text-neo-periwinkle"
              }`}
            >
              📝 CONTENIDO
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-4 py-2 font-brutal text-sm rounded-lg transition-all duration-200 ${
                activeTab === "video"
                  ? "bg-neo-cream text-neo-periwinkle"
                  : "bg-transparent text-neo-cream border border-neo-cream hover:bg-neo-cream hover:text-neo-periwinkle"
              }`}
            >
              🎥 VIDEO
            </button>
          </div>
        )}
      </div>

      <div className="bg-neo-coral p-6 space-y-4">
        {/* Contenido basado en tabs o tipo disponible */}
        {needsTabs ? (
          // Modo con tabs
          <>
            {activeTab === "content" && (
              <div className="space-y-4">
                {/* Descripción */}
                {hasDescription && (
                  <div className="bg-neo-periwinkle rounded-lg p-4">
                    <p className="font-bold text-base leading-relaxed text-white">
                      {contenido.descripcion}
                    </p>
                  </div>
                )}

                {/* Imagen */}
                {hasImage && (
                  <div className="bg-coral rounded-lg p-3">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={contenido.imagen}
                        alt={
                          hasTitle ? contenido.titulo : "Imagen del contenido"
                        }
                        className="w-full h-auto max-h-80 object-contain bg-neo-coral rounded-lg"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "video" && hasVideo && (
              <div className="bg-neo-periwinkle rounded-lg overflow-hidden">
                {embedUrl ? (
                  <div className="relative aspect-video">
                    <iframe
                      src={embedUrl}
                      title={hasTitle ? contenido.titulo : "Video"}
                      className="w-full h-full border-none rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <a
                      href={contenido.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neo-coral text-neo-cream px-6 py-3 font-brutal rounded-lg hover:bg-neo-lime transition-all duration-200 inline-block hover:scale-105"
                    >
                      🔗 ABRIR ENLACE
                    </a>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          // Modo sin tabs - mostrar todo disponible
          <div className="space-y-4">
            {/* Descripción */}
            {hasDescription && (
              <div className="bg-neo-periwinkle rounded-lg p-4">
                <p className="font-bold text-base leading-relaxed text-white">
                  {contenido.descripcion}
                </p>
              </div>
            )}

            {/* Solo imagen */}
            {hasImage && !hasVideo && (
              <div className="bg-neo-coral rounded-lg p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={contenido.imagen}
                    alt={hasTitle ? contenido.titulo : "Imagen del contenido"}
                    className="w-full h-auto max-h-80 object-contain bg-neo-coral rounded-lg"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>
            )}

            {/* Solo video */}
            {hasVideo && !hasImage && (
              <div className="bg-neo-periwinkle rounded-lg overflow-hidden">
                {embedUrl ? (
                  <div className="relative aspect-video">
                    <iframe
                      src={embedUrl}
                      title={hasTitle ? contenido.titulo : "Video"}
                      className="w-full h-full border-none rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <a
                      href={contenido.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neo-coral text-neo-cream px-6 py-3 font-brutal rounded-lg hover:bg-neo-lime transition-all duration-200 inline-block hover:scale-105"
                    >
                      🔗 ABRIR ENLACE
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer con acciones */}
        <div className="flex justify-between items-center pt-4 border-t border-neo-periwinkle/20">
          <div className="bg-neo-periwinkle text-neo-cream px-3 py-1 rounded-full font-bold text-sm">
            #{contenido.orden || index + 1}
          </div>

          {/* Enlaces rápidos si hay múltiples tipos de contenido */}
          {(hasImage || hasVideo) && (
            <div className="flex gap-2">
              {hasImage && !needsTabs && (
                <span className="text-sm font-bold px-2 py-1 bg-neo-yellow text-neo-periwinkle rounded-full">
                  📷
                </span>
              )}
              {hasVideo && !needsTabs && (
                <span className="text-sm font-bold px-2 py-1 bg-neo-coral text-neo-cream rounded-full">
                  🎥
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Estado vacío */}
      {!hasDescription && !hasImage && !hasVideo && (
        <div className="p-8 text-center">
          <div className="bg-neo-cream rounded-lg p-6">
            <span className="font-brutal text-lg text-neo-periwinkle">⚠️ CONTENIDO VACÍO</span>
            <br />
            <span className="text-sm font-bold text-neo-periwinkle">
              Este elemento no tiene contenido asignado
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContenidoCard;