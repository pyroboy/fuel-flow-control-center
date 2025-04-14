
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Reports: React.FC = () => {
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
          <p className="text-center text-gray-500 py-12">
            Reporting interface would be implemented here, with options to select report types,
            apply filters, and view or export results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
