// src/pages/Users.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Import Badge
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Import Table components
import { UserPlus, MoreHorizontal } from 'lucide-react'; // Import MoreHorizontal for actions
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // Import Dropdown for actions


import AddUserModal from '@/components/modals/AddUserModal';
// REMOVE: import { useQueryClient } from '@tanstack/react-query'; // Not needed for local state

import { Profile, UserRole, RegistrationStatus } from '@/types'; // Import types

// --- Mock Data ---
const initialMockUsers: Profile[] = [
  { id: 'usr_1', full_name: 'Alice Wonderland', role: UserRole.Admin, is_active: true, registration_status: RegistrationStatus.Approved, created_at: '2025-01-10T10:00:00Z', updated_at: '2025-01-10T10:00:00Z' },
  { id: 'usr_2', full_name: 'Bob The Builder', role: UserRole.OfficeStaff, is_active: true, registration_status: RegistrationStatus.Approved, created_at: '2025-01-11T11:30:00Z', updated_at: '2025-02-15T09:00:00Z' },
  { id: 'usr_3', full_name: 'Charlie Chaplin', role: UserRole.DepotStaff, is_active: true, registration_status: RegistrationStatus.Approved, created_at: '2025-01-12T14:00:00Z', updated_at: '2025-01-12T14:00:00Z' },
  { id: 'usr_4', full_name: 'Diana Prince', role: UserRole.GSO, is_active: true, registration_status: RegistrationStatus.Approved, assigned_station_id: 'gso_sta_1', created_at: '2025-01-15T08:00:00Z', updated_at: '2025-03-01T16:20:00Z' },
  { id: 'usr_5', full_name: 'Ethan Hunt', role: UserRole.GSOStaff, is_active: false, registration_status: RegistrationStatus.Approved, assigned_station_id: 'gso_sta_1', created_at: '2025-01-16T09:15:00Z', updated_at: '2025-04-01T10:00:00Z' },
  { id: 'usr_6', full_name: 'Fiona Shrek', role: UserRole.GSO, is_active: true, registration_status: RegistrationStatus.Pending, assigned_station_id: 'gso_sta_2', created_at: '2025-03-20T12:00:00Z', updated_at: '2025-03-20T12:00:00Z' },
];
// --- End Mock Data ---

// Helper function to format role names nicely
const formatRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin: return 'Administrator';
    case UserRole.OfficeStaff: return 'Office Staff';
    case UserRole.DepotStaff: return 'Depot Staff';
    case UserRole.GSO: return 'GSO Manager';
    case UserRole.GSOStaff: return 'GSO Staff';
    default: return role;
  }
};

const Users: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mockUsers, setMockUsers] = useState<Profile[]>(initialMockUsers);
  // REMOVE: const queryClient = useQueryClient();

  // Updated callback to add the new user to the local state
  const handleUserAdded = (newUser: Profile) => {
    setMockUsers(prevUsers => [newUser, ...prevUsers]); // Add new user to the beginning of the array
  };

  const handleEditUser = (userId: string) => {
      console.log("Edit user:", userId);
      // TODO: Implement edit logic (e.g., open modal with pre-filled data)
      alert(`Edit action for user ${userId} not implemented.`);
  };

  const handleDeleteUser = (userId: string) => {
      console.log("Delete user:", userId);
      // Filter out the user from the local state
      setMockUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      alert(`Mock delete action for user ${userId}.`);
      // In a real app, call API mutation here
  };


  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Management (Mock Data)</h1>
            <p className="text-gray-600 mt-1">Manage system users and GSO registrations</p>
          </div>
          <Button
            className="bg-indigo-900 hover:bg-indigo-800"
            onClick={() => setIsModalOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace placeholder with the Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.length === 0 ? (
                   <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No users found.
                        </TableCell>
                   </TableRow>
                ) : (
                    mockUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name || 'N/A'}</TableCell>
                        <TableCell>{formatRole(user.role)}</TableCell>
                        <TableCell>
                        <Badge variant={user.is_active ? 'default' : 'outline'} className={user.is_active ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-gray-100 text-gray-800 hover:bg-gray-100'}>
                            {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        {user.registration_status === RegistrationStatus.Pending && (
                             <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
                        )}
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            {/* Actions Dropdown */}
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleEditUser(user.id)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Render the Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onUserAdded={handleUserAdded} // Pass the updated handler
      />
    </>
  );
};

export default Users;