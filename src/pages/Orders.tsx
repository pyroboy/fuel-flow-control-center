
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Orders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-1">Track and manage fuel orders</p>
        </div>
        <Button className="bg-indigo-900 hover:bg-indigo-800">
          <PlusCircle className="mr-2 h-4 w-4" /> New Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-12">
            Order management dashboard would be implemented here, with filterable orders table,
            status tracking, and contextual actions based on order status.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
