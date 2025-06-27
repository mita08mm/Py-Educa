
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MainLayout from '../../src/components/layout/MainLayout'; // ajusta si usas alias

// Mock del Navbar si no quieres testearlo ahora
jest.mock('@/components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);

describe('MainLayout', () => {
  it('debe renderizar el navbar y los children', () => {
    render(
      <MainLayout>
        <h1>Contenido principal</h1>
      </MainLayout>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByText('Contenido principal')).toBeInTheDocument();
  });
});
