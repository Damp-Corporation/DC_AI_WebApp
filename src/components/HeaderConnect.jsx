import { UserCircle, Bell } from 'lucide-react';

const HeaderConnect = () => {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">Tableau de bord</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-blue-600">
          <Bell size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <UserCircle size={20} />
          <span className="text-sm text-gray-700">Dr. Nguema</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderConnect;
