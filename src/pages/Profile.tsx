import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { UserRole } from "@/types";

// Helper functions
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

const Profile: React.FC = () => {
  const { currentUser } = useAuthContext();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <p className="text-gray-600 mt-1">Your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Information associated with your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={currentUser?.name || "User"} />
              <AvatarFallback className="text-xl">
                {getInitials(currentUser?.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {currentUser?.name || "N/A"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {getRoleDisplayName(currentUser?.role)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <Label className="text-xs text-muted-foreground">User ID</Label>
              <p className="text-sm font-medium">{currentUser?.id || "N/A"}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                Email Address
              </Label>
              <p className="text-sm font-medium">
                {currentUser?.email || "N/A"}
              </p>
            </div>
            {currentUser?.role === UserRole.GSO &&
              currentUser.managedStationId && (
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Managed Station ID
                  </Label>
                  <p className="text-sm font-medium">
                    {currentUser.managedStationId}
                  </p>
                </div>
              )}
            {currentUser?.role === UserRole.GSOStaff &&
              currentUser.assigned_station_id && (
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Assigned Station ID
                  </Label>
                  <p className="text-sm font-medium">
                    {currentUser.assigned_station_id}
                  </p>
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
