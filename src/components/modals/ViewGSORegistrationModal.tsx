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
import { Separator } from "@/components/ui/separator";
import { RegistrationStatus } from "@/types";

export interface PendingGSODetails {
  id: string;
  name: string; // Station Name
  owner: string; // Owner's Full Name
  location: string;
  submittedDate: string;
  status: RegistrationStatus;
  // Add other fields you might have from registration, e.g.:
  // email?: string;
  // contactNumber?: string;
  // businessPermitUrl?: string;
}

interface ViewGSORegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  gsoData: PendingGSODetails | null;
}

const ViewGSORegistrationModal: React.FC<ViewGSORegistrationModalProps> = ({
  isOpen,
  onClose,
  gsoData,
}) => {
  if (!gsoData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>View GSO Registration: {gsoData.name}</DialogTitle>
          <DialogDescription>
            Details for the pending gas station owner registration.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Station Name
              </Label>
              <p className="font-semibold">{gsoData.name}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Owner's Name
              </Label>
              <p>{gsoData.owner}</p>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Location/Address
              </Label>
              <p>{gsoData.location}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Date Submitted
              </Label>
              <p>{new Date(gsoData.submittedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">
                Current Status
              </Label>
              <p className="capitalize">{gsoData.status}</p>
            </div>
            {/*
            {gsoData.email && (
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Owner Email</Label>
                <p>{gsoData.email}</p>
              </div>
            )}
            {gsoData.contactNumber && (
               <div>
                <Label className="text-xs font-medium text-muted-foreground">Contact Number</Label>
                <p>{gsoData.contactNumber}</p>
              </div>
            )}
            */}
          </div>
          {/*
          {gsoData.businessPermitUrl && (
            <>
              <Separator />
              <div>
                <Label className="text-sm font-medium">Submitted Documents</Label>
                <div className="mt-2">
                  <a 
                    href={gsoData.businessPermitUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    View Business Permit
                  </a>
                </div>
              </div>
            </>
          )}
          */}
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

export default ViewGSORegistrationModal;
