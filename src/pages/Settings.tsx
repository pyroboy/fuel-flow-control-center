import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthContext } from "@/context/AuthContext";

// Define validation schemas
const UpdateProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, {
        message: "Current password must be at least 8 characters long",
      }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long" }),
    confirmNewPassword: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters long",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

// Types from the schemas
type UpdateProfileFormValues = z.infer<typeof UpdateProfileSchema>;
type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;

// Mock API functions
async function updateProfileAPI(
  data: UpdateProfileFormValues
): Promise<{ success: boolean; message?: string }> {
  console.log("Updating profile data:", data);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true };
}

async function changePasswordAPI(
  data: ChangePasswordFormValues
): Promise<{ success: boolean; message?: string }> {
  console.log("Changing password:", data);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true };
}

const Settings: React.FC = () => {
  const { currentUser } = useAuthContext();

  // Profile form
  const profileForm = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      fullName: currentUser?.name || "",
      email: currentUser?.email || "",
    },
  });

  // Password form
  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(
        `Failed to update profile: ${
          (error as Error).message || "An unexpected error occurred."
        }`
      );
    },
  });

  // Password change mutation
  const passwordMutation = useMutation({
    mutationFn: changePasswordAPI,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      passwordForm.reset();
    },
    onError: (error) => {
      toast.error(
        `Failed to change password: ${
          (error as Error).message || "An unexpected error occurred."
        }`
      );
    },
  });

  // Submit handlers
  const onProfileSubmit = (values: UpdateProfileFormValues) => {
    profileMutation.mutate(values);
  };

  const onPasswordSubmit = (values: ChangePasswordFormValues) => {
    passwordMutation.mutate(values);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your profile and security settings
        </p>
      </div>

      {/* Profile Update Card */}
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <FormField
                control={profileForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        readOnly
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={profileMutation.isPending}>
                {profileMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {profileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Change Password Card */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to maintain account security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={passwordMutation.isPending}>
                {passwordMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {passwordMutation.isPending
                  ? "Changing Password..."
                  : "Change Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
