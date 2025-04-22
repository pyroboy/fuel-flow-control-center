import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthContext } from "@/context/AuthContext";

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentUser } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          userRole={currentUser?.role}
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />
        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
            sidebarCollapsed ? "" : ""
          }`}
        >
          <TopNavBar />
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MainLayout;
