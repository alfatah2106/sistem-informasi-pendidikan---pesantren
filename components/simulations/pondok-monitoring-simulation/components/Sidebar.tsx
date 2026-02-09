import React from 'react';
import { 
  LayoutGrid, Home, UserCheck, HeartHandshake, Eye, 
  ClipboardList, Clock, AlertTriangle, LogOut, X 
} from 'lucide-react';
import { ViewType, User } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, onNavigate, user, isOpen, onClose, onLogout 
}) => {
  const isPengawas = user.role === 'PENGAWAS';

  const NavItem = ({ view, icon: Icon, label, colorClass = "text-gray-600 hover:bg-gray-50" }: any) => (
    <button
      onClick={() => { onNavigate(view); if(window.innerWidth < 768) onClose(); }}
      className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
        currentView === view 
          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
          : colorClass
      }`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden transition-opacity" 
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex flex-col h-full shadow-xl md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Dashboard</h2>
              <p className="text-[10px] text-gray-500">Sistem Monitoring</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full border border-white shadow-sm bg-gray-200 object-cover" />
            <div className="overflow-hidden">
              <p className="font-semibold text-xs text-gray-900 truncate">{user.name}</p>
              <p className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <NavItem view="home" icon={Home} label="Home" />
          <NavItem view="absensi" icon={UserCheck} label="Absensi" />
          <NavItem view="konseling" icon={HeartHandshake} label="Konseling" />
          
          {isPengawas && (
            <NavItem view="pengawasan" icon={Eye} label="Pengawasan" />
          )}

          <NavItem view="daur" icon={ClipboardList} label="Laporan Daur" />
          <NavItem view="terlambat" icon={Clock} label="Keterlambatan" />
          <NavItem view="pelanggaran" icon={AlertTriangle} label="Pelanggaran" colorClass="text-red-600 hover:bg-red-50" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 p-2 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors">
            <LogOut className="w-3 h-3" /> KELUAR
          </button>
        </div>
      </aside>
    </>
  );
};
