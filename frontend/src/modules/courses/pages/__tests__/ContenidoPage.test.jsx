import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContenidoPage } from '../ContenidoPage';

describe('ContenidoPage', () => {
  test('muestra mensaje de información incompleta si no hay parámetros', () => {
    render(
      <MemoryRouter>
        <ContenidoPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/información incompleta/i)).toBeInTheDocument();
    expect(screen.getByText(/necesitas seleccionar un curso/i)).toBeInTheDocument();
  });

  test('muestra el componente ContenidoList si todos los parámetros están presentes', () => {
    const url = '/?curso=1&modulo=2&seccion=3&subseccion=4';
    render(
      <MemoryRouter initialEntries={[url]}>
        <ContenidoPage />
      </MemoryRouter>
    );

    expect(screen.queryByText(/información incompleta/i)).not.toBeInTheDocument();
  });
});
