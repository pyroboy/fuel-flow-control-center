
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';
import { UserRole } from '@/types';
import { TooltipProvider } from '@/components/ui/tooltip';

// Mock user role for demo purposes
// In a real application, this would come from authentication
const userRole = UserRole.Admin;

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          userRole={userRole} 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : ''}`}>
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
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MainLayout;
