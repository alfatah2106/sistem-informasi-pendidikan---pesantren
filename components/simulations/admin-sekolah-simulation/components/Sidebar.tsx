import React from 'react';
import { LayoutDashboard, ClipboardList, Award, BookOpen, LogOut, GraduationCap, FileText } from 'lucide-react';
import { User } from '../types';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'absensi', label: 'Absensi', icon: ClipboardList },
    { id: 'nilai', label: 'Input Nilai', icon: Award },
    { id: 'jurnal', label: 'Jurnal Guru', icon: BookOpen },
    { id: 'laporan', label: 'Laporan', icon: FileText },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col z-10 shrink-0 h-auto md:min-h-screen">
      <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
        <div className="bg-blue-600 text-white p-2 rounded-lg shadow-blue-200 shadow-lg">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="font-bold text-gray-800 text-lg leading-tight">Admin<br /><span className="text-blue-600">Sekolah</span></h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="md:block flex overflow-x-auto gap-2 md:gap-0 pb-2 md:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-700'
                }`}
              >
                <Icon className={`mr-3 w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {user && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-white border border-gray-200" />
            <div className="flex flex-col truncate">
              <span className="font-bold text-gray-800 truncate">{user.name}</span>
              <span className="text-[10px] text-gray-500 truncate">{user.email}</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="mt-3 w-full text-xs text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-lg font-medium transition-colors border border-red-100 flex items-center justify-center gap-2"
          >
            <LogOut className="w-3 h-3" /> Log Out
          </button>
        </div>
      )}
    </aside>
  );
};