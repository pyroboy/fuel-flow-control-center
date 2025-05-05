// src/components/modals/AddUserModal.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // Or use useToast from shadcn

import { AddUserSchema, AddUserFormValues } from "@/lib/validators/users";
import { UserRole, Profile, RegistrationStatus } from "@/types"; // Import your UserRole enum

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose, // Import DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

// Define roles that Admin can create
const adminCreatableRoles = [
  UserRole.Admin,
  UserRole.OfficeStaff,
  UserRole.DepotStaff,
];

// --- Mock API Function (Replace with your actual API call) ---
async function createUserAPI(
  userData: AddUserFormValues,
  assignedStationId?: string | null
): Promise<{ success: boolean; user?: Profile; message?: string }> {
  console.log("Submitting user data:", userData);
  console.log("Assigned Station ID if GSO:", assignedStationId);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Create a mock user object
  const newUser: Profile = {
    id: `usr_${Date.now()}`,
    full_name: userData.fullName,
    role: userData.role as UserRole,
    is_active: true,
    registration_status: RegistrationStatus.Approved,
    assigned_station_id:
      userData.role === UserRole.GSOStaff ? assignedStationId : null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  console.log("Creating mock user:", newUser);
  return { success: true, user: newUser };
}
// --- End Mock API Function ---

export interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded?: (newUser: Profile) => void; // Updated to expect Profile
  currentUserRole?: UserRole | null; // Role of the user opening the modal
  gsoStationId?: string | null; // Station ID if opened by GSO
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onUserAdded,
  currentUserRole,
  gsoStationId,
}) => {
  const queryClient = useQueryClient();

  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: undefined, // Let placeholder show
      password: "",
      confirmPassword: "",
    },
  });

  // Set role to GSOStaff when modal opens for a GSO user
  useEffect(() => {
    if (isOpen && currentUserRole === UserRole.GSO) {
      form.setValue("role", UserRole.GSOStaff, { shouldValidate: true });
    } else if (!isOpen) {
      form.reset();
    }
  }, [isOpen, currentUserRole, form]);

  const mutation = useMutation({
    mutationFn: (
      data: AddUserFormValues & { assignedStationId?: string | null }
    ) => createUserAPI(data, data.assignedStationId),
    onSuccess: (data) => {
      if (data.success && data.user) {
        toast.success("User created successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalidate user list query
        onUserAdded?.(data.user); // Pass the created user back
        onClose(); // Close the modal
        form.reset(); // Reset form fields
      } else {
        // Handle server-side validation errors returned in success response
        toast.error(
          `Failed to create user: ${
            data.message || "Server validation failed."
          }`
        );
      }
    },
    onError: (error) => {
      toast.error(
        `Failed to create user: ${
          (error as Error).message || "An unexpected error occurred."
        }`
      );
      console.error("Create User Error:", error);
    },
  });

  const onSubmit = (values: AddUserFormValues) => {
    // Optionally remove confirmPassword before sending to API if not needed backend
    const { confirmPassword, ...submissionData } = values;
    // Pass station ID along with form data
    mutation.mutate({ ...submissionData, assignedStationId: gsoStationId });
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
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
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                    />
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={currentUserRole === UserRole.GSO}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currentUserRole === UserRole.GSO ? (
                        // GSO can only create GSOStaff
                        <SelectItem value={UserRole.GSOStaff}>
                          GSO Staff
                        </SelectItem>
                      ) : currentUserRole === UserRole.Admin ? (
                        // Admin can only create internal staff
                        adminCreatableRoles.map((roleValue) => (
                          <SelectItem key={roleValue} value={roleValue}>
                            {roleValue
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </SelectItem>
                        ))
                      ) : (
                        // Fallback for other roles (should not happen in practice)
                        <SelectItem value="" disabled>
                          No roles available
                        </SelectItem>
                      )}
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

            {/* Show assigned station if the role being created is GSOStaff */}
            {form.watch("role") === UserRole.GSOStaff &&
              currentUserRole === UserRole.GSO &&
              gsoStationId && (
                <div className="rounded-md border p-4 bg-gray-50">
                  <Label className="font-medium">Assigned Station</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    This staff will be assigned to your station ID:{" "}
                    {gsoStationId}
                  </p>
                </div>
              )}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {mutation.isPending ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
