
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const FuelSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Fuel Settings</h1>
          <p className="text-gray-600 mt-1">Manage fuel types and pricing</p>
        </div>
        <Button className="bg-indigo-900 hover:bg-indigo-800">
          <Plus className="mr-2 h-4 w-4" /> Add Fuel Type
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fuel Types & Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-12">
            Fuel settings interface would be implemented here, including fuel type management
            and pricing tables with history tracking.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FuelSettings;
