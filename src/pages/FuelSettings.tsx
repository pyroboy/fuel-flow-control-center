// src/pages/FuelSettings.tsx
import React, { useState, useMemo } from 'react'; // Import useState and useMemo
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Dropdown for actions
import { Plus, MoreHorizontal, Pencil, ToggleLeft, ToggleRight, History } from 'lucide-react'; // Import icons

// Assuming types are correctly defined in @/types
import { FuelType, FuelPrice } from '@/types';

// --- Mock Data ---
const mockFuelTypes: FuelType[] = [
    { id: 'ft_1', name: 'Diesel', is_available: true, created_at: '2024-12-01T00:00:00Z', updated_at: '2025-03-15T00:00:00Z' },
    { id: 'ft_2', name: 'Gasoline 95 RON', is_available: true, created_at: '2024-12-01T00:00:00Z', updated_at: '2024-12-01T00:00:00Z' },
    { id: 'ft_3', name: 'Kerosene', is_available: false, created_at: '2024-12-05T00:00:00Z', updated_at: '2025-02-10T00:00:00Z' },
    { id: 'ft_4', name: 'Premium Gasoline 97 RON', is_available: true, created_at: '2025-02-01T00:00:00Z', updated_at: '2025-02-01T00:00:00Z' },
];

const mockFuelPrices: FuelPrice[] = [
    // Diesel Prices (PHP)
    { id: 'fp_1', fuel_type_id: 'ft_1', delivery_price_per_liter: 65.50, pickup_price_per_liter: 64.00, effective_from: '2025-03-01T00:00:00Z', set_by_user_id: 'usr_1', created_at: '2025-02-28T10:00:00Z' },
    { id: 'fp_2', fuel_type_id: 'ft_1', delivery_price_per_liter: 68.00, pickup_price_per_liter: 66.50, effective_from: '2025-04-10T00:00:00Z', set_by_user_id: 'usr_2', created_at: '2025-04-09T15:30:00Z' }, // Current Diesel
    // Gasoline 95 Prices (PHP)
    { id: 'fp_3', fuel_type_id: 'ft_2', delivery_price_per_liter: 72.00, pickup_price_per_liter: 70.50, effective_from: '2025-03-05T00:00:00Z', set_by_user_id: 'usr_1', created_at: '2025-03-04T11:00:00Z' },
    { id: 'fp_4', fuel_type_id: 'ft_2', delivery_price_per_liter: 71.25, pickup_price_per_liter: 69.75, effective_from: '2025-04-01T00:00:00Z', set_by_user_id: 'usr_1', created_at: '2025-03-31T09:00:00Z' }, // Current 95 RON
    // Kerosene Prices (PHP) - Note: Kerosene type is currently inactive
    { id: 'fp_5', fuel_type_id: 'ft_3', delivery_price_per_liter: 75.00, pickup_price_per_liter: 73.00, effective_from: '2025-01-15T00:00:00Z', set_by_user_id: 'usr_2', created_at: '2025-01-14T16:00:00Z' }, // Old Kerosene Price
     // Premium Gasoline 97 Prices (PHP)
    { id: 'fp_6', fuel_type_id: 'ft_4', delivery_price_per_liter: 78.50, pickup_price_per_liter: 77.00, effective_from: '2025-04-05T00:00:00Z', set_by_user_id: 'usr_1', created_at: '2025-04-04T14:00:00Z' }, // Current 97 RON
    { id: 'fp_7', fuel_type_id: 'ft_1', delivery_price_per_liter: 70.00, pickup_price_per_liter: 68.50, effective_from: '2025-05-01T00:00:00Z', set_by_user_id: 'usr_2', created_at: '2025-04-14T17:00:00Z' }, // Future Diesel Price
];
// --- End Mock Data ---

// Helper to find the currently effective price for a given fuel type ID
const findCurrentPrice = (fuelTypeId: string, allPrices: FuelPrice[], referenceDate: Date): FuelPrice | undefined => {
  const now = referenceDate.getTime();
  return allPrices
      .filter(p => p.fuel_type_id === fuelTypeId && new Date(p.effective_from).getTime() <= now) // Filter relevant and past/current effective dates
      .sort((a, b) => new Date(b.effective_from).getTime() - new Date(a.effective_from).getTime())[0]; // <-- FIX: Moved [0] up to this line
};

const FuelSettings: React.FC = () => {
  // State for fuel types (could be fetched in real app)
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>(mockFuelTypes);
  // Full price history (could be fetched)
  const [priceHistory, setPriceHistory] = useState<FuelPrice[]>(mockFuelPrices);

  // Calculate current prices using useMemo for efficiency
  const currentFuelPrices = useMemo(() => {
      const referenceDate = new Date(); // Use current time to determine effective price
      // Adjust referenceDate for testing future prices if needed:
      // const referenceDate = new Date('2025-05-02T00:00:00Z');
      console.log("Reference date for current price:", referenceDate.toISOString());

      return fuelTypes.map(fuelType => {
          const currentPrice = findCurrentPrice(fuelType.id, priceHistory, referenceDate);
          return {
              fuelTypeId: fuelType.id,
              fuelTypeName: fuelType.name,
              currentPrice: currentPrice, // This will be FuelPrice | undefined
          };
      }).filter(item => item.currentPrice !== undefined) as { fuelTypeId: string; fuelTypeName: string; currentPrice: FuelPrice }[]; // Type assertion after filtering
  }, [fuelTypes, priceHistory]); // Recalculate only if fuelTypes or priceHistory changes

  // --- Placeholder Action Handlers ---
  const handleAddFuelType = () => {
      console.log("Add Fuel Type clicked");
      // TODO: Implement logic to open an "Add Fuel Type" modal
      alert("Add Fuel Type modal not implemented.");
  };

  const handleEditFuelType = (fuelType: FuelType) => {
      console.log("Edit Fuel Type:", fuelType);
      // TODO: Open modal with fuel type data for editing
      alert(`Edit action for ${fuelType.name} not implemented.`);
  };

  const handleToggleAvailability = (fuelType: FuelType) => {
      console.log("Toggle Availability for:", fuelType);
      // TODO: Update state and potentially call API
      setFuelTypes(prevTypes =>
          prevTypes.map(ft =>
              ft.id === fuelType.id ? { ...ft, is_available: !ft.is_available, updated_at: new Date().toISOString() } : ft
          )
      );
      alert(`Toggled availability for ${fuelType.name}. (Local state change only)`);
  };

   const handleSetNewPrice = (fuelTypeId: string, fuelTypeName: string) => {
        console.log("Set New Price for:", fuelTypeName);
        // TODO: Open modal to set a new price with an effective date
        alert(`Set New Price action for ${fuelTypeName} not implemented.`);
    };

    const handleViewPriceHistory = (fuelTypeId: string, fuelTypeName: string) => {
        console.log("View Price History for:", fuelTypeName);
        // TODO: Open modal/view showing all prices for this fuel type
        alert(`View Price History action for ${fuelTypeName} not implemented.`);
    };


  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Fuel Settings</h1>
          <p className="text-gray-600 mt-1">Manage fuel types and current pricing</p>
        </div>
        <Button className="bg-indigo-900 hover:bg-indigo-800" onClick={handleAddFuelType}>
          <Plus className="mr-2 h-4 w-4" /> Add Fuel Type
        </Button>
      </div>

      {/* Fuel Types Card */}
      <Card>
        <CardHeader>
          <CardTitle>Fuel Types</CardTitle>
          <CardDescription>List of available fuel types in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fuelTypes.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">No fuel types defined.</TableCell></TableRow>
              ) : (
                fuelTypes.map((fuelType) => (
                  <TableRow key={fuelType.id}>
                    <TableCell className="font-medium">{fuelType.name}</TableCell>
                    <TableCell>
                      <Badge variant={fuelType.is_available ? 'default' : 'outline'} className={fuelType.is_available ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'}>
                        {fuelType.is_available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(fuelType.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditFuelType(fuelType)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleAvailability(fuelType)}>
                                {fuelType.is_available ? <ToggleLeft className="mr-2 h-4 w-4" /> : <ToggleRight className="mr-2 h-4 w-4" />}
                                {fuelType.is_available ? 'Make Unavailable' : 'Make Available'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Current Fuel Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Fuel Pricing</CardTitle>
           <CardDescription>Currently effective prices per liter as of {new Date().toLocaleDateString()}.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fuel Type</TableHead>
                <TableHead>Delivery Price (PHP)</TableHead>
                <TableHead>Pickup Price (PHP)</TableHead>
                <TableHead>Effective Since</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               {currentFuelPrices.length === 0 ? (
                 <TableRow><TableCell colSpan={5} className="h-24 text-center">No current prices found.</TableCell></TableRow>
               ) : (
                 currentFuelPrices.map(({ fuelTypeId, fuelTypeName, currentPrice }) => (
                    <TableRow key={fuelTypeId}>
                        <TableCell className="font-medium">{fuelTypeName}</TableCell>
                        <TableCell>{currentPrice.delivery_price_per_liter.toFixed(2)}</TableCell>
                        <TableCell>{currentPrice.pickup_price_per_liter.toFixed(2)}</TableCell>
                        <TableCell>{new Date(currentPrice.effective_from).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Pricing Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleSetNewPrice(fuelTypeId, fuelTypeName)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Set New Price
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleViewPriceHistory(fuelTypeId, fuelTypeName)}>
                                        <History className="mr-2 h-4 w-4" /> View History
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                 ))
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
};

export default FuelSettings;