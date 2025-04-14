
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp } from 'lucide-react';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inventory Hub</h1>
          <p className="text-gray-600 mt-1">Track and manage fuel inventory</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" className="border-indigo-900 text-indigo-900 hover:bg-indigo-50">
            <RefreshCw className="mr-2 h-4 w-4" /> Record Adjustment
          </Button>
          <Button className="bg-indigo-900 hover:bg-indigo-800">
            <TrendingUp className="mr-2 h-4 w-4" /> Record Replenishment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-12">
            Inventory dashboard would be implemented here, with current levels, historical tracking,
            and alert management for low inventory situations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
