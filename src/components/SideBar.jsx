import { Link } from 'react-router-dom';
import { LayoutDashboard, LineChart, Bell, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r h-full shadow-md">
      <div className="text-2xl font-bold p-4 border-b">BloodTrack</div>
      <nav className="flex flex-col p-4 space-y-4 text-gray-700">
        <Link to="/" className="flex items-center space-x-2 hover:text-blue-600">
          <LayoutDashboard size={18} /> <span>Stocks</span>
        </Link>
        <Link to="/forecast" className="flex items-center space-x-2 hover:text-blue-600">
          <LineChart size={18} /> <span>Prévisions</span>
        </Link>
        <Link to="/alerts" className="flex items-center space-x-2 hover:text-blue-600">
          <Bell size={18} /> <span>Alertes</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-2 hover:text-blue-600">
          <Settings size={18} /> <span>Paramètres</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
