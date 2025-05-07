import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile, UserRole, RegistrationStatus } from "@/types";

interface ViewUserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Profile | null;
}

// Helper to format role names nicely (can be moved to a utils file)
const formatRoleDisplay = (role?: UserRole | null): string => {
  if (!role) return "N/A";
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
      return String(role);
  }
};

const getInitials = (name: string | null | undefined): string => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
  }
  return name.substring(0, 2).toUpperCase();
};

const ViewUserDetailsModal: React.FC<ViewUserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>User Details: {user.full_name || "N/A"}</DialogTitle>
          <DialogDescription>
            Viewing profile information for the selected user.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={user.full_name || "User"} />{" "}
              {/* Placeholder for actual image if you add it */}
              <AvatarFallback className="text-2xl">
                {getInitials(user.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">
                {user.full_name || "N/A"}
              </h3>
              <p className="text-sm text-muted-foreground">{user.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-t pt-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Role
              </Label>
              <p>{formatRoleDisplay(user.role)}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Status
              </Label>
              <p className={user.is_active ? "text-green-600" : "text-red-600"}>
                {user.is_active ? "Active" : "Inactive"}
              </p>
            </div>
            {user.registration_status && (
              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  Registration
                </Label>
                <p>{user.registration_status}</p>
              </div>
            )}
            {user.assigned_station_id && (
              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  Assigned Station ID
                </Label>
                <p>{user.assigned_station_id}</p>
              </div>
            )}
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Created At
              </Label>
              <p>{new Date(user.created_at).toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Last Updated
              </Label>
              <p>{new Date(user.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDetailsModal;
