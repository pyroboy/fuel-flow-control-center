
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';

const TruckRecords: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Truck Records</h1>
          <p className="text-gray-600 mt-1">Manage delivery truck fleet</p>
        </div>
        <Button className="bg-indigo-900 hover:bg-indigo-800">
          <Truck className="mr-2 h-4 w-4" /> Add Truck
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Truck Fleet Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-12">
            Truck management interface would be implemented here, including truck listing,
            status tracking, and maintenance records.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruckRecords;
