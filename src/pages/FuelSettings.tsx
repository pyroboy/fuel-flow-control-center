// src/pages/FuelSettings.tsx
import React, { useState, useMemo } from "react"; // Import useState and useMemo
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Import CardDescription
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge
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
import {
  MoreHorizontal,
  Edit3,
  ToggleLeft,
  ToggleRight,
  History,
  DollarSign,
} from "lucide-react"; // Import icons
import { useAuthContext } from "@/context/AuthContext";
import EditFuelTypeModal from "@/components/modals/EditFuelTypeModal";
import SetNewPriceModal from "@/components/modals/SetNewPriceModal";
import { toast } from "sonner";

// Assuming types are correctly defined in @/types
import { FuelType, FuelPrice } from "@/types";

// --- Mock Data ---
const mockFuelTypes: FuelType[] = [
  {
    id: "ft_1",
    name: "Diesel",
    is_available: true,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2025-03-15T00:00:00Z",
  },
  {
    id: "ft_2",
    name: "Gasoline 95 RON",
    is_available: true,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "ft_4",
    name: "Premium Gasoline 97 RON",
    is_available: true,
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-02-01T00:00:00Z",
  },
];

const mockFuelPrices: FuelPrice[] = [
  // Diesel Prices (PHP)
  {
    id: "fp_1",
    fuel_type_id: "ft_1",
    delivery_price_per_liter: 65.5,
    pickup_price_per_liter: 64.0,
    effective_from: "2025-03-01T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-02-28T10:00:00Z",
  },
  {
    id: "fp_2",
    fuel_type_id: "ft_1",
    delivery_price_per_liter: 68.0,
    pickup_price_per_liter: 66.5,
    effective_from: "2025-04-10T00:00:00Z",
    set_by_user_id: "usr_2",
    created_at: "2025-04-09T15:30:00Z",
  }, // Current Diesel
  // Gasoline 95 Prices (PHP)
  {
    id: "fp_3",
    fuel_type_id: "ft_2",
    delivery_price_per_liter: 72.0,
    pickup_price_per_liter: 70.5,
    effective_from: "2025-03-05T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-03-04T11:00:00Z",
  },
  {
    id: "fp_4",
    fuel_type_id: "ft_2",
    delivery_price_per_liter: 71.25,
    pickup_price_per_liter: 69.75,
    effective_from: "2025-04-01T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-03-31T09:00:00Z",
  }, // Current 95 RON
  // Premium Gasoline 97 Prices (PHP)
  {
    id: "fp_6",
    fuel_type_id: "ft_4",
    delivery_price_per_liter: 78.5,
    pickup_price_per_liter: 77.0,
    effective_from: "2025-04-05T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-04-04T14:00:00Z",
  }, // Current 97 RON
  {
    id: "fp_7",
    fuel_type_id: "ft_1",
    delivery_price_per_liter: 70.0,
    pickup_price_per_liter: 68.5,
    effective_from: "2025-05-01T00:00:00Z",
    set_by_user_id: "usr_2",
    created_at: "2025-04-14T17:00:00Z",
  }, // Future Diesel Price
];
// --- End Mock Data ---

// Helper to find the currently effective price for a given fuel type ID
const findCurrentPrice = (
  fuelTypeId: string,
  allPrices: FuelPrice[],
  referenceDate: Date
): FuelPrice | undefined => {
  const now = referenceDate.getTime();
  return allPrices
    .filter(
      (p) =>
        p.fuel_type_id === fuelTypeId &&
        new Date(p.effective_from).getTime() <= now
    ) // Filter relevant and past/current effective dates
    .sort(
      (a, b) =>
        new Date(b.effective_from).getTime() -
        new Date(a.effective_from).getTime()
    )[0]; // <-- FIX: Moved [0] up to this line
};

const FuelSettings: React.FC = () => {
  // State for fuel types (could be fetched in real app)
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>(mockFuelTypes);
  // Full price history (could be fetched)
  const [priceHistory, setPriceHistory] = useState<FuelPrice[]>(mockFuelPrices);
  const { currentUser } = useAuthContext();

  // Modal state
  const [isEditFuelTypeModalOpen, setIsEditFuelTypeModalOpen] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState<FuelType | null>(
    null
  );
  const [isSetPriceModalOpen, setIsSetPriceModalOpen] = useState(false);
  const [fuelForPriceSetting, setFuelForPriceSetting] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Calculate current prices using useMemo for efficiency
  const currentFuelPrices = useMemo(() => {
    const referenceDate = new Date();
    return fuelTypes
      .map((fuelType) => {
        const currentPrice = findCurrentPrice(
          fuelType.id,
          priceHistory,
          referenceDate
        );
        return {
          fuelTypeId: fuelType.id,
          fuelTypeName: fuelType.name,
          currentPrice: currentPrice,
        };
      })
      .filter((item) => item.currentPrice !== undefined) as {
      fuelTypeId: string;
      fuelTypeName: string;
      currentPrice: FuelPrice;
    }[];
  }, [fuelTypes, priceHistory]);

  // --- Action Handlers ---
  const handleOpenEditFuelTypeModal = (fuelType: FuelType) => {
    if (currentUser?.role !== "admin") {
      toast.error("Only Administrators can edit fuel types.");
      return;
    }
    setSelectedFuelType(fuelType);
    setIsEditFuelTypeModalOpen(true);
  };

  const handleFuelTypeUpdated = (updatedFuelType: FuelType) => {
    setFuelTypes((prev) =>
      prev.map((ft) => (ft.id === updatedFuelType.id ? updatedFuelType : ft))
    );
    setIsEditFuelTypeModalOpen(false);
    toast.success(`Fuel type "${updatedFuelType.name}" updated.`);
  };

  const handleToggleAvailability = (fuelType: FuelType) => {
    if (currentUser?.role !== "admin") {
      toast.error("Only Administrators can change fuel availability.");
      return;
    }
    setFuelTypes((prevTypes) =>
      prevTypes.map((ft) =>
        ft.id === fuelType.id
          ? {
              ...ft,
              is_available: !ft.is_available,
              updated_at: new Date().toISOString(),
            }
          : ft
      )
    );
    toast.info(`Availability for ${fuelType.name} toggled.`);
  };

  const handleOpenSetNewPriceModal = (
    fuelTypeId: string,
    fuelTypeName: string
  ) => {
    if (currentUser?.role !== "admin" && currentUser?.role !== "office_staff") {
      toast.error("You do not have permission to set prices.");
      return;
    }
    setFuelForPriceSetting({ id: fuelTypeId, name: fuelTypeName });
    setIsSetPriceModalOpen(true);
  };

  const handleNewPriceSet = (newPriceEntry: FuelPrice) => {
    setPriceHistory((prev) => [...prev, newPriceEntry]);
    setIsSetPriceModalOpen(false);
    toast.success(
      `New price set for ${fuelForPriceSetting?.name} effective ${new Date(
        newPriceEntry.effective_from
      ).toLocaleDateString()}.`
    );
  };

  const handleViewPriceHistory = (fuelTypeId: string, fuelTypeName: string) => {
    console.log("View Price History for:", fuelTypeName);
    alert(
      `View Price History action for ${fuelTypeName} not implemented yet. Would show list of prices for fuel ID: ${fuelTypeId}`
    );
  };

  const canManageFuelTypes = currentUser?.role === "admin";
  const canManagePrices =
    currentUser?.role === "admin" || currentUser?.role === "office_staff";

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Fuel Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage fuel types and current pricing
            </p>
          </div>
          {/* Add Fuel Type button removed as per requirements */}
        </div>

        {/* Fuel Types Card */}
        <Card>
          <CardHeader>
            <CardTitle>Fuel Types</CardTitle>
            <CardDescription>
              List of available fuel types in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  {canManageFuelTypes && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {fuelTypes.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={canManageFuelTypes ? 4 : 3}
                      className="h-24 text-center"
                    >
                      No fuel types defined.
                    </TableCell>
                  </TableRow>
                ) : (
                  fuelTypes.map((fuelType) => (
                    <TableRow key={fuelType.id}>
                      <TableCell className="font-medium">
                        {fuelType.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            fuelType.is_available ? "default" : "outline"
                          }
                          className={
                            fuelType.is_available
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {fuelType.is_available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(fuelType.updated_at).toLocaleDateString()}
                      </TableCell>
                      {canManageFuelTypes && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleOpenEditFuelTypeModal(fuelType)
                                }
                              >
                                <Edit3 className="mr-2 h-4 w-4" /> Edit Type
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleToggleAvailability(fuelType)
                                }
                              >
                                {fuelType.is_available ? (
                                  <ToggleLeft className="mr-2 h-4 w-4" />
                                ) : (
                                  <ToggleRight className="mr-2 h-4 w-4" />
                                )}
                                {fuelType.is_available
                                  ? "Make Unavailable"
                                  : "Make Available"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
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
            <CardDescription>
              Currently effective prices per liter as of{" "}
              {new Date().toLocaleDateString()}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead>Delivery Price (PHP)</TableHead>
                  <TableHead>Pickup Price (PHP)</TableHead>
                  <TableHead>Effective Since</TableHead>
                  {canManagePrices && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFuelPrices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={canManagePrices ? 5 : 4}
                      className="h-24 text-center"
                    >
                      No current prices found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentFuelPrices.map(
                    ({ fuelTypeId, fuelTypeName, currentPrice }) => (
                      <TableRow key={fuelTypeId}>
                        <TableCell className="font-medium">
                          {fuelTypeName}
                        </TableCell>
                        <TableCell>
                          {currentPrice.delivery_price_per_liter.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {currentPrice.pickup_price_per_liter.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            currentPrice.effective_from
                          ).toLocaleDateString()}
                        </TableCell>
                        {canManagePrices && (
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  Pricing Actions
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleOpenSetNewPriceModal(
                                      fuelTypeId,
                                      fuelTypeName
                                    )
                                  }
                                >
                                  <DollarSign className="mr-2 h-4 w-4" /> Set
                                  New Price
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleViewPriceHistory(
                                      fuelTypeId,
                                      fuelTypeName
                                    )
                                  }
                                >
                                  <History className="mr-2 h-4 w-4" /> View
                                  History
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedFuelType && canManageFuelTypes && (
        <EditFuelTypeModal
          isOpen={isEditFuelTypeModalOpen}
          onClose={() => setIsEditFuelTypeModalOpen(false)}
          fuelType={selectedFuelType}
          onFuelTypeUpdated={handleFuelTypeUpdated}
        />
      )}
      {fuelForPriceSetting && canManagePrices && (
        <SetNewPriceModal
          isOpen={isSetPriceModalOpen}
          onClose={() => setIsSetPriceModalOpen(false)}
          fuelTypeId={fuelForPriceSetting.id}
          fuelTypeName={fuelForPriceSetting.name}
          currentUserId={currentUser?.id || "unknown_user"}
          onNewPriceSet={handleNewPriceSet}
        />
      )}
    </>
  );
};

export default FuelSettings;
