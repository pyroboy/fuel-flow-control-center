
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings,
  LogOut 
} from 'lucide-react';
import { UserRole } from '@/types';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// This would normally come from an auth context
const mockUserData = {
  name: 'John Doe',
  role: UserRole.Admin,
  avatarUrl: null, // In a real app, this would be a URL to the user's avatar
  initials: 'JD'
};

const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      return 'Administrator';
    case UserRole.OfficeStaff:
      return 'Office Staff';
    case UserRole.DepotStaff:
      return 'Depot Staff';
    case UserRole.GSO:
      return 'GSO Manager';
    case UserRole.GSOStaff:
      return 'GSO Staff';
    default:
      return 'User';
  }
};

const TopNavBar: React.FC = () => {
  return (
    <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={mockUserData.avatarUrl || ''} alt={mockUserData.name} />
              <AvatarFallback>{mockUserData.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium">{mockUserData.name}</span>
              <span className="text-xs text-gray-500">
                {getRoleDisplayName(mockUserData.role)}
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
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopNavBar;
