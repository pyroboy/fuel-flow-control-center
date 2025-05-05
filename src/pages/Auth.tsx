import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types";
import { Droplet, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";

// Helper function to get the correct dashboard path based on role
const getDashboardPathForRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      return "/app/admin-dashboard";
    case UserRole.OfficeStaff:
      return "/app/office-staff-dashboard";
    case UserRole.DepotStaff:
      return "/app/depot-staff-dashboard";
    case UserRole.GSO:
      return "/app/gso-dashboard";
    case UserRole.GSOStaff:
      return "/app/gso-staff-dashboard";
    default:
      return "/app/admin-dashboard"; // Fallback
  }
};

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Admin);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a mock user
    const mockUserData = {
      id: `mock_${Date.now()}`,
      name: `Mock ${getRoleDisplayName(selectedRole)}`,
      role: selectedRole,
      email: `${selectedRole.replace("_", "")}@fuelflow.test`, // Generate mock email
      managedStationId: null,
      assigned_station_id: null,
    };

    // If logging in as GSO, assign a mock station they manage
    if (selectedRole === UserRole.GSO) {
      mockUserData.managedStationId = "gso_sta_1";
      mockUserData.name = "Mock Diana Prince";
      mockUserData.id = "usr_4";
      mockUserData.email = "diana.prince@gso.test";
    }

    // If logging in as GSOStaff, assign them to a station
    if (selectedRole === UserRole.GSOStaff) {
      mockUserData.assigned_station_id = "gso_sta_1";
      mockUserData.name = "Mock Ethan Hunt";
      mockUserData.id = "usr_5";
      mockUserData.email = "ethan.hunt@staff.test";
    }

    // Add specific emails for other roles
    if (selectedRole === UserRole.Admin) {
      mockUserData.email = "admin@fuelflow.test";
    }
    if (selectedRole === UserRole.OfficeStaff) {
      mockUserData.email = "office@fuelflow.test";
    }
    if (selectedRole === UserRole.DepotStaff) {
      mockUserData.email = "depot@fuelflow.test";
    }

    // Call the login function from AuthContext
    login(mockUserData);

    // Get the target path based on role
    const targetPath = getDashboardPathForRole(selectedRole);

    toast.success(`Logged in as ${getRoleDisplayName(selectedRole)}`);

    // Navigate to the appropriate dashboard
    navigate(targetPath, { replace: true });
  };

  const getRoleDisplayName = (role: UserRole): string => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <img
              src="/logo/logo.gif"
              alt="FuelFlow Logo"
              className="h-10 w-auto"
            />
            <h1 className="ml-2 text-3xl font-bold text-indigo-900">
              FuelFlow
            </h1>
          </div>
          <p className="mt-2 text-gray-600">Control Center Login</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Select Role (For Demo)</Label>
                <RadioGroup
                  value={selectedRole}
                  onValueChange={(value) => setSelectedRole(value as UserRole)}
                  className="grid grid-cols-1 gap-2"
                >
                  {Object.values(UserRole).map((role) => (
                    <div
                      key={role}
                      className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50"
                    >
                      <RadioGroupItem value={role} id={role} />
                      <Label htmlFor={role} className="flex-1 cursor-pointer">
                        {getRoleDisplayName(role)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
