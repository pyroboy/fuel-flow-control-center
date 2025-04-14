// src/components/modals/AddUserModal.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; // Or use useToast from shadcn

import { AddUserSchema, AddUserFormValues } from '@/lib/validators/users';
import { UserRole } from '@/types'; // Import your UserRole enum

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose, // Import DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

// --- Mock API Function (Replace with your actual API call) ---
async function createUserAPI(userData: AddUserFormValues): Promise<{ success: boolean; message?: string }> {
  console.log("Submitting user data:", userData);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Replace with your actual fetch/axios call:
  // const response = await fetch('/api/users', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData),
  // });
  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.message || 'Failed to create user');
  // }
  // return await response.json();

  // Mock Success/Failure (uncomment one)
  return { success: true };
  // return { success: false, message: 'Email already exists (mock)' };
  // throw new Error("Network error simulation");
}
// --- End Mock API Function ---

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded?: () => void; // Optional callback after success
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onUserAdded }) => {
  const queryClient = useQueryClient();

  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: undefined, // Let placeholder show
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createUserAPI,
    onSuccess: (data) => {
        if (data.success) {
            toast.success('User created successfully!');
            queryClient.invalidateQueries({ queryKey: ['users'] }); // Invalidate user list query
            onUserAdded?.(); // Call optional callback
            onClose(); // Close the modal
            form.reset(); // Reset form fields
        } else {
            // Handle server-side validation errors returned in success response
             toast.error(`Failed to create user: ${data.message || 'Server validation failed.'}`);
        }
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message || 'An unexpected error occurred.'}`);
      console.error("Create User Error:", error);
    },
  });

  const onSubmit = (values: AddUserFormValues) => {
    // Optionally remove confirmPassword before sending to API if not needed backend
    const { confirmPassword, ...submissionData } = values;
    mutation.mutate(submissionData);
  };

  // Close handler for Dialog
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      form.reset(); // Reset form on close as well
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new user profile.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Select */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Map through UserRole enum to create options */}
                      {Object.entries(UserRole).map(([key, value]) => (
                        <SelectItem key={value} value={value}>
                          {/* Simple formatting - you might want a helper function */}
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Password */}
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Confirm Password */}
             <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Add Assigned Station ID field conditionally if needed */}
            {/* Example:
              {form.watch('role') === UserRole.GSO && (
                <FormField ... for assignedStationId ... />
              )}
            */}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={mutation.isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mutation.isPending ? 'Creating...' : 'Create User'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;