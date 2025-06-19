import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hideSidebar = searchParams.get('crear') === '1';

  return (
    <div className="min-h-screen flex flex-col bg-brand-700">
      <Navbar />
      <div className="flex flex-1">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 overflow-auto bg-brand-200">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};