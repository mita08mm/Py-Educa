<<<<<<< HEAD
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

=======
// src/modules/layout/components/Layout.tsx
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
>>>>>>> feature/course-form

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const hideGlobalSidebar =
    pathname.startsWith("/my-learning/") && pathname.split("/").length >= 3;

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-brand-700">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-brand-200">
          {children}
        </main>
      </div>
=======
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar global solo cuando NO estamos dentro del player */}
        {!hideGlobalSidebar && <Sidebar />}

        {/* el CourseViewer ya trae su propia sidebar interna */}
        <main className="flex-1 p-6 overflow-auto bg-[#0F172A]">
          {children}
        </main>
      </div>

>>>>>>> feature/course-form
      <Footer />
    </div>
  );
};
