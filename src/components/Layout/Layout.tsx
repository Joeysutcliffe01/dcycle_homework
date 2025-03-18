import React from "react";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

// Layout used for all pages with sidebar + topbar
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
