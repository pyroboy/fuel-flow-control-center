import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Building,
  Store,
  PlusCircle,
  Fuel,
} from "lucide-react";

interface SidebarProps {
  userRole: UserRole | null;
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
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      path: "/app/admin-dashboard",
      icon: <Home size={20} />,
      roles: [UserRole.Admin],
    },
    {
      title: "Dashboard",
      path: "/app/office-staff-dashboard",
      icon: <Home size={20} />,
      roles: [UserRole.OfficeStaff],
    },
    {
      title: "Dashboard",
      path: "/app/depot-staff-dashboard",
      icon: <Home size={20} />,
      roles: [UserRole.DepotStaff],
    },
    {
      title: "GSO Dashboard",
      path: "/app/gso-dashboard",
      icon: <Building size={20} />,
      roles: [UserRole.GSO],
    },
    {
      title: "Staff Dashboard",
      path: "/app/gso-staff-dashboard",
      icon: <Store size={20} />,
      roles: [UserRole.GSOStaff],
    },
    {
      title: "User Management",
      path: "/app/users",
      icon: <Users size={20} />,
      roles: [UserRole.Admin, UserRole.GSO],
    },
    {
      title: "Fuel Settings",
      path: "/app/fuel-settings",
      icon: <Droplet size={20} />,
      roles: [UserRole.Admin, UserRole.OfficeStaff],
    },
    {
      title: "Truck Records",
      path: "/app/trucks",
      icon: <Truck size={20} />,
      roles: [UserRole.Admin, UserRole.DepotStaff, UserRole.OfficeStaff],
    },
    {
      title: "Orders",
      path: "/app/orders",
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
      path: "/app/inventory",
      icon: <Database size={20} />,
      roles: [UserRole.Admin, UserRole.DepotStaff, UserRole.OfficeStaff],
    },
    {
      title: "Reports",
      path: "/app/reports",
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
      path: "/app/messages",
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

  const filteredNavItems = userRole
    ? navItems.filter((item) => item.roles.includes(userRole))
    : [];

  return (
    <aside
      className={cn(
        "bg-indigo-900 text-white h-screen relative transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer"
          title="Go to Homepage"
        >
          <img
            src="/logo/logo.svg"
            alt="FuelFlow Logo"
            className="h-8 w-auto"
          />

          {!collapsed && (
            <span className="text-xl font-bold text-white">FuelFlow</span>
          )}
        </Link>
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
