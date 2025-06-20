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
    "bg-neo-yellow",
    "bg-neo-lime",
    "bg-neo-coral",
    "bg-neo-cyan",
    "bg-neo-magenta",
    "bg-neo-orange",
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
    <div
      className={`${cardColor} border-4 border-black shadow-brutal-lg hover:shadow-brutal-xl transition-all duration-200 hover:translate-x-1 hover:translate-y-1 overflow-hidden`}
    >
      {/* Header de la Card */}
      <div className="bg-black text-white p-4 border-b-4 border-black">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="font-brutal text-lg">
            {hasTitle ? contenido.titulo : `CONTENIDO #${index + 1}`}
          </h3>

          {/* Badges de tipo de contenido */}
          <div className="flex gap-2 flex-wrap">
            {hasDescription && (
              <span className="bg-white text-black px-2 py-1 text-xs font-bold border-2 border-white">
                📝 TEXTO
              </span>
            )}
            {hasImage && (
              <span className="bg-neo-yellow text-black px-2 py-1 text-xs font-bold border-2 border-white">
                📷 IMAGEN
              </span>
            )}
            {hasVideo && (
              <span className="bg-neo-red text-white px-2 py-1 text-xs font-bold border-2 border-white">
                🎥 VIDEO
              </span>
            )}
          </div>
        </div>

        {/* Tabs si hay imagen Y video */}
        {needsTabs && (
          <div className="flex mt-3 gap-2">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-3 py-1 font-brutal text-sm border-2 transition-all duration-100 ${
                activeTab === "content"
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              📝 CONTENIDO
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-3 py-1 font-brutal text-sm border-2 transition-all duration-100 ${
                activeTab === "video"
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              🎥 VIDEO
            </button>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Contenido basado en tabs o tipo disponible */}
        {needsTabs ? (
          // Modo con tabs
          <>
            {activeTab === "content" && (
              <div className="space-y-4">
                {/* Descripción */}
                {hasDescription && (
                  <div className="bg-white border-3 border-black shadow-brutal p-4">
                    <p className="font-bold text-base leading-relaxed">
                      {contenido.descripcion}
                    </p>
                  </div>
                )}

                {/* Imagen */}
                {hasImage && (
                  <div className="bg-white border-3 border-black shadow-brutal p-2">
                    <div className="relative overflow-hidden border-2 border-black">
                      <img
                        src={contenido.imagen}
                        alt={
                          hasTitle ? contenido.titulo : "Imagen del contenido"
                        }
                        className="w-full h-auto max-h-80 object-contain bg-gray-100"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "video" && hasVideo && (
              <div className="bg-black border-3 border-black shadow-brutal">
                {embedUrl ? (
                  <div className="relative aspect-video">
                    <iframe
                      src={embedUrl}
                      title={hasTitle ? contenido.titulo : "Video"}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <a
                      href={contenido.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neo-red text-white px-6 py-3 font-brutal border-3 border-white shadow-brutal hover:shadow-brutal-lg transition-all duration-100 inline-block hover:translate-x-1"
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
              <div className="bg-white border-3 border-black shadow-brutal p-4">
                <p className="font-bold text-base leading-relaxed">
                  {contenido.descripcion}
                </p>
              </div>
            )}

            {/* Solo imagen */}
            {hasImage && !hasVideo && (
              <div className="bg-white border-3 border-black shadow-brutal p-2">
                <div className="relative overflow-hidden border-2 border-black">
                  <img
                    src={contenido.imagen}
                    alt={hasTitle ? contenido.titulo : "Imagen del contenido"}
                    className="w-full h-auto max-h-80 object-contain bg-gray-100"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>
            )}

            {/* Solo video */}
            {hasVideo && !hasImage && (
              <div className="bg-black border-3 border-black shadow-brutal">
                {embedUrl ? (
                  <div className="relative aspect-video">
                    <iframe
                      src={embedUrl}
                      title={hasTitle ? contenido.titulo : "Video"}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <a
                      href={contenido.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neo-red text-white px-6 py-3 font-brutal border-3 border-white shadow-brutal hover:shadow-brutal-lg transition-all duration-100 inline-block hover:translate-x-1"
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
        <div className="flex justify-between items-center pt-4 border-t-3 border-black">
          <div className="text-sm font-bold">
            #{contenido.orden || index + 1}
          </div>

          {/* Enlaces rápidos si hay múltiples tipos de contenido */}
          {(hasImage || hasVideo) && (
            <div className="flex gap-2">
              {hasImage && !needsTabs && (
                <span className="text-xs font-bold px-2 py-1 bg-black text-white">
                  📷
                </span>
              )}
              {hasVideo && !needsTabs && (
                <span className="text-xs font-bold px-2 py-1 bg-black text-white">
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
          <div className="bg-white border-3 border-black shadow-brutal p-6">
            <span className="font-brutal text-lg">⚠️ CONTENIDO VACÍO</span>
            <br />
            <span className="text-sm font-bold">
              Este elemento no tiene contenido asignado
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContenidoCard;
