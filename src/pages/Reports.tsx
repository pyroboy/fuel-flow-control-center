import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types"; // Import UserRole enum

// Define the report interface
interface MockReport {
  id: string;
  title: string;
  description: string;
  availableToRoles: UserRole[];
}

const Reports: React.FC = () => {
  // Mock report data
  const initialMockReports: MockReport[] = [
    {
      id: "rep_1",
      title: "Sales Volume Report",
      description: "Total fuel volume sold over a period.",
      availableToRoles: [UserRole.Admin, UserRole.OfficeStaff],
    },
    {
      id: "rep_2",
      title: "Order History (Customer)",
      description: "View all orders placed by a specific gas station.",
      availableToRoles: [UserRole.Admin, UserRole.OfficeStaff, UserRole.GSO],
    },
    {
      id: "rep_3",
      title: "Inventory Log",
      description:
        "Detailed log of all inventory changes (replenishments, sales, adjustments).",
      availableToRoles: [UserRole.Admin, UserRole.DepotStaff],
    },
    {
      id: "rep_4",
      title: "Delivery Performance",
      description: "Track delivery times and efficiency.",
      availableToRoles: [UserRole.Admin, UserRole.DepotStaff],
    },
    {
      id: "rep_5",
      title: "Fuel Consumption (GSO)",
      description: "Fuel usage trends for stations managed by a GSO.",
      availableToRoles: [UserRole.Admin, UserRole.GSO],
    },
    {
      id: "rep_6",
      title: "User Activity Log",
      description: "Audit trail of user actions within the system.",
      availableToRoles: [UserRole.Admin],
    },
  ];

  // Get the current mock user role (replace with actual context later)
  const currentUserRole = UserRole.Admin; // Change this to test different roles

  const [availableReports, setAvailableReports] = useState<MockReport[]>(() =>
    initialMockReports.filter((report) =>
      report.availableToRoles.includes(currentUserRole)
    )
  );

  // Handler for generate report button
  const handleGenerateReport = (report: MockReport) => {
    alert(`Generate report: ${report.title}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Reporting Center</h1>
        <p className="text-gray-600 mt-1">Generate and view system reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {availableReports.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No reports available for your role.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableReports.map((report) => (
                <Card key={report.id} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      className="w-full bg-indigo-900 hover:bg-indigo-800"
                      onClick={() => handleGenerateReport(report)}
                    >
                      Generate Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
