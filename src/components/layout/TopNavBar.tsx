import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { UserRole } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";

const getRoleDisplayName = (role: UserRole | null): string => {
  switch (role) {
    case UserRole.Admin:
      return "Administrator";
    case UserRole.OfficeStaff:
      return "Office Staff";
    case UserRole.DepotStaff:
      return "Depot Staff";
    case UserRole.GSO:
      return "GSO Manager";
    case UserRole.GSOStaff:
      return "GSO Staff";
    default:
      return "User";
  }
};

const getInitials = (name: string | null): string => {
  if (!name) return "U";

  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
  }
  return name.substring(0, 2).toUpperCase();
};

const TopNavBar: React.FC = () => {
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={currentUser?.name || "User"} />
              <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium">{currentUser?.name || "User"}</span>
              <span className="text-xs text-gray-500">
                {getRoleDisplayName(currentUser?.role)}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>View Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopNavBar;
