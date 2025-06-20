import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-neo-cream">
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
