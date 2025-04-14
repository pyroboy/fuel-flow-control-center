// src/pages/TruckRecords.tsx

import React, { useState } from 'react'; // Import useState
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import CardDescription
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Import Badge
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Import Table components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Dropdown for actions
import { Truck, MoreHorizontal, Pencil, Ban, CheckCircle, Truck as TruckIcon } from 'lucide-react'; // Import icons

// Assuming types are correctly defined in @/types
import { Truck as TruckType, TruckStatus } from '@/types'; // Rename imported Truck to avoid conflict

// --- Mock Data ---
const initialMockTrucks: TruckType[] = [
  { id: 'trk_1', plate_number: 'FUEL 001', capacity_liters: 10000, status: TruckStatus.Available, created_at: '2024-11-15T08:00:00Z', updated_at: '2025-04-10T14:30:00Z',driver: 'John Doe' },
  { id: 'trk_2', plate_number: 'GAS 123', capacity_liters: 5000, status: TruckStatus.OutForDelivery, created_at: '2024-11-20T09:15:00Z', updated_at: '2025-04-14T10:05:00Z',driver: 'Jane Smith' },
  { id: 'trk_3', plate_number: 'NGA 987', capacity_liters: 15000, status: TruckStatus.Available, created_at: '2025-01-05T11:00:00Z', updated_at: '2025-03-25T16:00:00Z',driver: 'Alice Johnson' },
  { id: 'trk_4', plate_number: 'DEPO 04', capacity_liters: 10000, status: TruckStatus.Unavailable, created_at: '2025-02-10T13:45:00Z', updated_at: '2025-04-12T09:00:00Z',driver: 'Bob Brown' }, // e.g., Maintenance
  { id: 'trk_5', plate_number: 'FLW 555', capacity_liters: 8000, status: TruckStatus.Disabled, created_at: '2025-03-01T10:00:00Z', updated_at: '2025-04-01T17:20:00Z',driver: 'Charlie Davis' }, // e.g., Major repair/decommissioned
];
// --- End Mock Data ---

// Helper function to format status names nicely
const formatTruckStatus = (status: TruckStatus): string => {
  switch (status) {
    case TruckStatus.Available: return 'Available';
    case TruckStatus.Unavailable: return 'Unavailable';
    case TruckStatus.Disabled: return 'Disabled';
    case TruckStatus.OutForDelivery: return 'Out for Delivery';
    default: return status;
  }
};

// Helper to get badge variants based on status
const getStatusBadgeVariant = (status: TruckStatus): { variant: "default" | "secondary" | "destructive" | "outline", className?: string } => {
    switch (status) {
        case TruckStatus.Available: return { variant: 'default', className: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' };
        case TruckStatus.OutForDelivery: return { variant: 'default', className: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200' };
        case TruckStatus.Unavailable: return { variant: 'outline', className: 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200' };
        case TruckStatus.Disabled: return { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200' };
        default: return { variant: 'secondary' };
    }
}

const TruckRecords: React.FC = () => {
  const [trucks, setTrucks] = useState<TruckType[]>(initialMockTrucks);

  // --- Placeholder Action Handlers ---
  const handleAddTruck = () => {
      console.log("Add Truck clicked");
      // TODO: Implement logic to open an "Add Truck" modal
      alert("Add Truck modal not implemented.");
  };

  const handleEditTruck = (truckId: string) => {
    console.log("Edit Truck:", truckId);
    // TODO: Open modal with truck data for editing
    alert(`Edit action for truck ${truckId} not implemented.`);
  };

  const handleChangeStatus = (truckId: string, newStatus: TruckStatus) => {
      console.log(`Change status for Truck ${truckId} to ${newStatus}`);
      // TODO: Update state and potentially call API
       setTrucks(prevTrucks =>
          prevTrucks.map(t =>
              t.id === truckId ? { ...t, status: newStatus, updated_at: new Date().toISOString() } : t
          )
      );
      alert(`Changed status for truck ${truckId}. (Local state change only)`);
  };


  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Truck Records</h1>
          <p className="text-gray-600 mt-1">Manage delivery truck fleet</p>
        </div>
        <Button className="bg-indigo-900 hover:bg-indigo-800" onClick={handleAddTruck}>
          <Truck className="mr-2 h-4 w-4" /> Add Truck
        </Button>
      </div>

      {/* Truck Fleet Card */}
      <Card>
        <CardHeader>
          <CardTitle>Truck Fleet Management</CardTitle>
           <CardDescription>List of registered trucks and their current status.</CardDescription>
        </CardHeader>
        <CardContent>
           {/* Replace placeholder with the Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plate Number</TableHead>
                <TableHead>Capacity (Liters)</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               {trucks.length === 0 ? (
                 <TableRow><TableCell colSpan={6} className="h-24 text-center">No trucks found.</TableCell></TableRow>
               ) : (
                 trucks.map((truck) => {
                    const statusStyle = getStatusBadgeVariant(truck.status);
                    return (
                        <TableRow key={truck.id}>
                            <TableCell className="font-medium">{truck.plate_number}</TableCell>
                            <TableCell>{truck.capacity_liters.toLocaleString()}</TableCell> {/* Format number */}
                            <TableCell>{truck.driver}</TableCell>
                            <TableCell>
                            <Badge variant={statusStyle.variant} className={statusStyle.className}>
                                {formatTruckStatus(truck.status)}
                            </Badge>
                            </TableCell>
                            <TableCell>{new Date(truck.updated_at).toLocaleString()}</TableCell> {/* Format date */}
                            <TableCell className="text-right">
                            {/* Actions Dropdown */}
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleEditTruck(truck.id)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                    {/* Dynamically generate status change options */}
                                    {Object.values(TruckStatus)
                                        .filter(status => status !== truck.status) // Don't show current status as an option
                                        .map(status => (
                                            <DropdownMenuItem key={status} onClick={() => handleChangeStatus(truck.id, status)}>
                                                {/* Optionally add icons based on status */}
                                                {status === TruckStatus.Available && <CheckCircle className="mr-2 h-4 w-4 text-green-600"/>}
                                                {status === TruckStatus.OutForDelivery && <TruckIcon className="mr-2 h-4 w-4 text-blue-600"/>}
                                                {status === TruckStatus.Unavailable && <Ban className="mr-2 h-4 w-4 text-orange-600"/>}
                                                {status === TruckStatus.Disabled && <Ban className="mr-2 h-4 w-4 text-red-600"/>}
                                                Set as {formatTruckStatus(status)}
                                            </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                 })
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruckRecords;