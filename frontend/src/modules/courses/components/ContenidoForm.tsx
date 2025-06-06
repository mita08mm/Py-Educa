import { useState } from 'react';
import { contenidoService, Contenido } from '../../../services/api';

interface ContenidoFormProps {
  cod_modulo: number;
  cod_seccion: number;
  cod_subseccion: number;
  onSuccess?: () => void;
}

export const ContenidoForm = ({ cod_modulo, cod_seccion, cod_subseccion, onSuccess }: ContenidoFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    descripcion: '',
    link: '',
  });
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('cod_modulo', cod_modulo.toString());
      data.append('cod_seccion', cod_seccion.toString());
      data.append('descripcion', formData.descripcion);
      if (formData.link) data.append('link', formData.link);
      if (imagen) data.append('imagen', imagen);

      await contenidoService.create(cod_subseccion, data);
      
      // Limpiar formulario
      setFormData({ descripcion: '', link: '' });
      setImagen(null);
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el contenido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-[#E2E8F0] mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
          className="w-full px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-md text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#46838C]"
          rows={4}
          required
        />
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-[#E2E8F0] mb-1">
          Link (opcional)
        </label>
        <input
          type="url"
          id="link"
          value={formData.link}
          onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
          className="w-full px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-md text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#46838C]"
          placeholder="https://ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="imagen" className="block text-sm font-medium text-[#E2E8F0] mb-1">
          Imagen (opcional)
        </label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-md text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#46838C]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-[#46838C] text-white rounded-md hover:bg-[#3A6D75] focus:outline-none focus:ring-2 focus:ring-[#46838C] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando...' : 'Crear Contenido'}
      </button>
    </form>
  );
}; 