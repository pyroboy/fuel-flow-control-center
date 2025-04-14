
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

const Messages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Internal Messaging</h1>
          <p className="text-gray-600 mt-1">Communication within the system</p>
        </div>
        <Button className="bg-indigo-900 hover:bg-indigo-800">
          <MessageSquarePlus className="mr-2 h-4 w-4" /> New Message
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-12">
            Messaging interface would be implemented here, with inbox, conversation view, and compose functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
