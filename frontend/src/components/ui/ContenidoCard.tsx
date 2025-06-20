import { useState } from "react";
import type { Contenido } from "../../types/contenido";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
} from "../../utils/youtubeUtils";

interface ContenidoCardProps {
  contenido: Contenido;
  index: number;
}

const ContenidoCard = ({ contenido, index }: ContenidoCardProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cardColors = [
    "bg-neo-mint",
    "bg-neo-coral",
    "bg-neo-lavender",
    "bg-neo-yellow",
    "bg-neo-aqua",
    "bg-neo-sage",
  ];

  const bgColor = cardColors[index % cardColors.length];
  const embedUrl = contenido.link ? getYouTubeEmbedUrl(contenido.link) : null;
  const thumbnail = contenido.link ? getYouTubeThumbnail(contenido.link) : null;

  return (
    <div
      className={`${bgColor} border-4 border-black shadow-brutal-lg hover:shadow-brutal-xl transition-all duration-100`}
    >
      {/* Header */}
      <div className="p-4 border-b-4 border-black bg-black text-white">
        <div className="flex items-center justify-between">
          <span className="font-brutal text-lg">CONTENIDO #{index + 1}</span>
          <div className="flex space-x-2">
            {contenido.link && (
              <span className="bg-neo-red border-2 border-white px-2 py-1 text-xs font-brutal">
                📹 VIDEO
              </span>
            )}
            {contenido.imagen && (
              <span className="bg-neo-lime border-2 border-white px-2 py-1 text-xs font-brutal text-black">
                🖼️ IMAGEN
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {/* Video de YouTube */}
        {contenido.link && embedUrl && (
          <div className="mb-6">
            {!showVideo ? (
              <div className="relative">
                <img
                  src={thumbnail || "/placeholder-video.jpg"}
                  alt="Video thumbnail"
                  className="w-full h-48 object-cover border-3 border-black shadow-brutal"
                  onError={() => setImageError(true)}
                />
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-30 transition-all duration-200"
                >
                  <div className="bg-neo-red border-4 border-white shadow-brutal-lg p-4 rounded-full">
                    <span className="font-brutal text-3xl text-white">▶</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="relative">
                <iframe
                  src={embedUrl}
                  title={`Video ${index + 1}`}
                  className="w-full h-64 border-3 border-black shadow-brutal"
                  allowFullScreen
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-2 right-2 bg-neo-red border-2 border-black shadow-brutal px-3 py-1 font-brutal text-sm hover:shadow-brutal-lg"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* Imagen adicional */}
        {contenido.imagen && (
          <div className="mb-6">
            <img
              src={contenido.imagen}
              alt={`Contenido ${index + 1}`}
              className="w-full max-h-64 object-cover border-3 border-black shadow-brutal"
              onError={() => setImageError(true)}
            />
          </div>
        )}

        {/* Descripción */}
        {contenido.descripcion && (
          <div className="bg-white border-3 border-black shadow-brutal p-4">
            <h4 className="font-brutal text-lg mb-2">📝 DESCRIPCIÓN:</h4>
            <p className="text-gray-800 font-medium leading-relaxed">
              {contenido.descripcion}
            </p>
          </div>
        )}

        {/* Link original del video */}
        {contenido.link && (
          <div className="mt-4">
            <a
              href={contenido.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-neo-red border-3 border-black shadow-brutal px-4 py-2 font-brutal text-sm hover:shadow-brutal-lg transition-shadow duration-100"
            >
              🔗 VER EN YOUTUBE
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContenidoCard;
