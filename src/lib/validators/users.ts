// src/lib/validators/user.ts
import { z } from 'zod';
import { UserRole } from '@/types'; // Import your UserRole enum

// Ensure UserRole values are included correctly for validation
const userRoleValues = Object.values(UserRole) as [string, ...string[]];

export const AddUserSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(userRoleValues, { required_error: "Please select a user role" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string()
  // Optional: Add assigned_station_id if needed, potentially conditionally required based on role
  // assignedStationId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Error path for UI feedback
});

// Define the type inferred from the schema
export type AddUserFormValues = z.infer<typeof AddUserSchema>;