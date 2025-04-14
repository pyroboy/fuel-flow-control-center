import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import {
  BarChart,
  Truck,
  Users,
  ShoppingCart,
  Database,
  MessageCircle,
  FileText,
  User,
  Settings,
  LogOut,
  Home,
  Droplet,
} from "lucide-react";

interface SidebarProps {
  userRole: UserRole;
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, collapsed, onToggle }) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      path: "/",
      icon: <Home size={20} />,
      roles: [
        UserRole.Admin,
        UserRole.OfficeStaff,
        UserRole.DepotStaff,
        UserRole.GSO,
        UserRole.GSOStaff,
      ],
    },
    {
      title: "User Management",
      path: "/users",
      icon: <Users size={20} />,
      roles: [UserRole.Admin, UserRole.GSO],
    },
    {
      title: "Fuel Settings",
      path: "/fuel-settings",
      icon: <Droplet size={20} />,
      roles: [UserRole.Admin, UserRole.OfficeStaff],
    },
    {
      title: "Truck Records",
      path: "/trucks",
      icon: <Truck size={20} />,
      roles: [UserRole.Admin, UserRole.DepotStaff],
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <ShoppingCart size={20} />,
      roles: [
        UserRole.Admin,
        UserRole.OfficeStaff,
        UserRole.DepotStaff,
        UserRole.GSO,
        UserRole.GSOStaff,
      ],
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <Database size={20} />,
      roles: [UserRole.Admin, UserRole.DepotStaff],
    },
    {
      title: "Reports",
      path: "/reports",
      icon: <BarChart size={20} />,
      roles: [
        UserRole.Admin,
        UserRole.OfficeStaff,
        UserRole.DepotStaff,
        UserRole.GSO,
      ],
    },
    {
      title: "Messages",
      path: "/messages",
      icon: <MessageCircle size={20} />,
      roles: [
        UserRole.Admin,
        UserRole.OfficeStaff,
        UserRole.DepotStaff,
        UserRole.GSO,
        UserRole.GSOStaff,
      ],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside
      className={cn(
        "bg-indigo-900 text-white h-screen relative transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold truncate">FuelFlow</h1>}
        <button
          onClick={onToggle}
          className={cn(
            "text-white p-1 rounded-full hover:bg-indigo-800 transition-all",
            collapsed ? "mx-auto" : ""
          )}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm transition-colors",
                  location.pathname === item.path
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-800",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <span className="inline-block">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
