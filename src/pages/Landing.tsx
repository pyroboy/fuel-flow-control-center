
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplet, TrendingUp, ShieldCheck, Truck } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Nav */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-indigo-900">Fuel Flow</h1>
          </div>
          <Link to="/auth">
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Fuel Flow Control Center</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Streamlined management system for fuel distribution, inventory tracking, and station operations
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
              <p className="text-gray-600">
                Real-time tracking and management of fuel inventory across all depots and stations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery Scheduling</h3>
              <p className="text-gray-600">
                Efficient scheduling and tracking of fuel deliveries to gas stations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">
                Secure, role-specific access control for administrators, staff, and gas station operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Droplet className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-semibold">Fuel Flow</span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Fuel Flow Control Center. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
