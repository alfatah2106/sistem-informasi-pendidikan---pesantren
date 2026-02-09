import React from 'react';
import { ArrowLeft, Monitor } from 'lucide-react';

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  onBack: () => void;
  bgColor?: string;
}

const SimulationWrapper: React.FC<WrapperProps> = ({ children, title, onBack, bgColor = "bg-slate-100" }) => {
  return (
    <div className={`h-screen overflow-hidden flex flex-col ${bgColor}`}>
      {/* Simulation Top Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between shadow-md z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Home
          </button>
          <div className="h-4 w-px bg-slate-700"></div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Simulation Mode
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Monitor className="w-4 h-4" />
          <span>{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default SimulationWrapper;