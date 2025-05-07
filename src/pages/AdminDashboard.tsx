import React, { useState } from "react";
import PendingGSOTable, {
  PendingGSO,
} from "@/components/dashboard/PendingGSOTable";
import { RegistrationStatus } from "@/types";
import { toast } from "sonner";
import ViewGSORegistrationModal from "@/components/modals/ViewGSORegistrationModal";

const initialMockPendingGSOs: PendingGSO[] = [
  {
    id: "1",
    name: "Eastside Fuels",
    owner: "John Rodriguez",
    location: "Metro East, Zone 4",
    submittedDate: "2025-04-10",
    status: RegistrationStatus.Pending,
  },
  {
    id: "2",
    name: "North Star Gas",
    owner: "Maria Chen",
    location: "Northern District, Area 2",
    submittedDate: "2025-04-11",
    status: RegistrationStatus.Pending,
  },
  {
    id: "3",
    name: "Valley Petroleum",
    owner: "Robert Nelson",
    location: "Southern Valley, Block 7",
    submittedDate: "2025-04-13",
    status: RegistrationStatus.Pending,
  },
];

const AdminDashboard: React.FC = () => {
  const [mockPendingGSOs, setMockPendingGSOs] = useState<PendingGSO[]>(
    initialMockPendingGSOs
  );
  const [isViewGSOModalOpen, setIsViewGSOModalOpen] = useState(false);
  const [selectedGSOForView, setSelectedGSOForView] =
    useState<PendingGSO | null>(null);

  const handleApproveGSO = (userId: string) => {
    setMockPendingGSOs((prev) =>
      prev.map((gso) =>
        gso.id === userId
          ? { ...gso, status: RegistrationStatus.Approved }
          : gso
      )
    );
    toast.success("GSO approved!");
    console.log("Approved GSO:", userId);
  };

  const handleRejectGSO = (userId: string) => {
    setMockPendingGSOs((prev) => prev.filter((gso) => gso.id !== userId));
    toast("GSO rejected.");
    console.log("Rejected GSO:", userId);
  };

  const handleViewGSO = (gsoData: PendingGSO) => {
    setSelectedGSOForView(gsoData);
    setIsViewGSOModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the Fuel Flow Control Center Admin Dashboard.
        </p>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="divide-y divide-gray-200">
            <div className="flex justify-between py-3">
              <span className="font-medium text-gray-600">Active Users</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-medium text-gray-600">Pending Orders</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-medium text-gray-600">
                Total Deliveries (Today)
              </span>
              <span className="font-semibold">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Pending GSO Registrations
          </h2>
          <PendingGSOTable
            pendingGSOs={mockPendingGSOs}
            onApproveGSO={handleApproveGSO}
            onRejectGSO={handleRejectGSO}
            onViewGSO={handleViewGSO}
          />
        </div>
      </div>
      <ViewGSORegistrationModal
        isOpen={isViewGSOModalOpen}
        onClose={() => {
          setIsViewGSOModalOpen(false);
          setSelectedGSOForView(null);
        }}
        gsoData={selectedGSOForView}
      />
    </>
  );
};

export default AdminDashboard;
