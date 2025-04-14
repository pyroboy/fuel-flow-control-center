
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types';
import { Droplet, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Admin);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate credentials here
    // For demo purposes, we'll just navigate to the dashboard
    
    toast.success(`Logged in as ${getRoleDisplayName(selectedRole)}`);
    navigate('/');
  };

  const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
      case UserRole.Admin:
        return 'Administrator';
      case UserRole.OfficeStaff:
        return 'Office Staff';
      case UserRole.DepotStaff:
        return 'Depot Staff';
      case UserRole.GSO:
        return 'GSO Manager';
      case UserRole.GSOStaff:
        return 'GSO Staff';
      default:
        return 'User';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <Droplet className="h-10 w-10 text-indigo-600" />
            <h1 className="ml-2 text-3xl font-bold text-indigo-900">Fuel Flow</h1>
          </div>
          <p className="mt-2 text-gray-600">Control Center Login</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Role (For Demo)</Label>
                <RadioGroup
                  value={selectedRole}
                  onValueChange={(value) => setSelectedRole(value as UserRole)}
                  className="grid grid-cols-1 gap-2"
                >
                  {Object.values(UserRole).map(role => (
                    <div key={role} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
                      <RadioGroupItem value={role} id={role} />
                      <Label htmlFor={role} className="flex-1 cursor-pointer">
                        {getRoleDisplayName(role)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Sign In <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
