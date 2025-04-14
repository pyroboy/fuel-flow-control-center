
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
        <p className="text-gray-600 mt-1">Configure application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-12">
            System settings interface would be implemented here, with options to configure
            notifications, display preferences, and other system-wide settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
