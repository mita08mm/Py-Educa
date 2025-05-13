// src/modules/layout/components/Layout.tsx
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const hideGlobalSidebar =
    pathname.startsWith("/my-learning/") && pathname.split("/").length >= 3;

  return (
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

      <Footer />
    </div>
  );
};
