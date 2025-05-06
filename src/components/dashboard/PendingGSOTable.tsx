import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RegistrationStatus } from "@/types";

interface PendingGSO {
  id: string;
  name: string;
  owner: string;
  location: string;
  submittedDate: string;
  status: RegistrationStatus;
}

interface PendingGSOTableProps {
  pendingGSOs: PendingGSO[];
  onApproveGSO: (userId: string) => void;
  onRejectGSO: (userId: string) => void;
}

const PendingGSOTable: React.FC<PendingGSOTableProps> = ({
  pendingGSOs,
  onApproveGSO,
  onRejectGSO,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Station Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pendingGSOs.map((gso) => (
          <TableRow key={gso.id}>
            <TableCell className="font-medium">{gso.name}</TableCell>
            <TableCell>{gso.owner}</TableCell>
            <TableCell>{gso.location}</TableCell>
            <TableCell>
              {new Date(gso.submittedDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 hover:bg-amber-100"
              >
                {gso.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline">
                  View
                </Button>
                <Button
                  size="sm"
                  className="bg-indigo-900 hover:bg-indigo-800"
                  onClick={() => onApproveGSO(gso.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onRejectGSO(gso.id)}
                >
                  Reject
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PendingGSOTable;
