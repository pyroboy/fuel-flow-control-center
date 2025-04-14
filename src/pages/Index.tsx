
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to landing page
  useEffect(() => {
    navigate('/landing');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-900">Fuel Flow Control Center</h1>
        <p className="text-xl text-gray-600">Redirecting to landing page...</p>
      </div>
    </div>
  );
};

export default Index;
