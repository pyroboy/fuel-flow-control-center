
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RegistrationStatus } from '@/types';

// Mock data for demonstration
const mockPendingGSOs = [
  {
    id: '1',
    name: 'Eastside Fuels',
    owner: 'John Rodriguez',
    location: 'Metro East, Zone 4',
    submittedDate: '2025-04-10',
    status: RegistrationStatus.Pending
  },
  {
    id: '2',
    name: 'North Star Gas',
    owner: 'Maria Chen',
    location: 'Northern District, Area 2',
    submittedDate: '2025-04-11',
    status: RegistrationStatus.Pending
  },
  {
    id: '3',
    name: 'Valley Petroleum',
    owner: 'Robert Nelson',
    location: 'Southern Valley, Block 7',
    submittedDate: '2025-04-13',
    status: RegistrationStatus.Pending
  }
];

const PendingGSOTable: React.FC = () => {
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
        {mockPendingGSOs.map((gso) => (
          <TableRow key={gso.id}>
            <TableCell className="font-medium">{gso.name}</TableCell>
            <TableCell>{gso.owner}</TableCell>
            <TableCell>{gso.location}</TableCell>
            <TableCell>{new Date(gso.submittedDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                {gso.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm" className="bg-indigo-900 hover:bg-indigo-800">Approve</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PendingGSOTable;
