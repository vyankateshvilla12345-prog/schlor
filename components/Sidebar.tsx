
import React from 'react';
import { BookOpen, GraduationCap, Home, Settings, LogOut, Smartphone, ShieldAlert } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  onHomeClick: () => void;
  onDeviceHubClick: () => void;
  onAdminClick: () => void;
  onLogout: () => void;
  currentView: ViewState;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onHomeClick, onDeviceHubClick, onAdminClick, onLogout, currentView, isAdmin }) => {
  return (
    <div className={`w-24 md:w-64 border-r flex flex-col items-center md:items-start py-8 transition-all duration-300 shadow-xl z-20 ${currentView === 'ADMIN_DASHBOARD' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
      <div 
        className="px-4 md:px-8 mb-12 cursor-pointer flex items-center gap-3"
        onClick={onHomeClick}
      >
        <div className={`${currentView === 'ADMIN_DASHBOARD' ? 'bg-red-600' : 'bg-scholar-600'} p-2 rounded-xl shadow-lg`}>
           {currentView === 'ADMIN_DASHBOARD' ? <ShieldAlert className="w-8 h-8 text-white" /> : <GraduationCap className="w-8 h-8 text-white" />}
        </div>
        <div className="hidden md:block">
            <h1 className={`text-2xl font-bold tracking-tight leading-none ${currentView === 'ADMIN_DASHBOARD' ? 'text-slate-100' : 'text-scholar-800'}`}>
            Scholar<br/>Hub
            </h1>
        </div>
      </div>

      <nav className="flex-1 w-full px-4 space-y-2">
        <SidebarItem 
            icon={<Home size={22} />} 
            label="Home" 
            onClick={onHomeClick} 
            active={currentView === 'SUBJECTS' || currentView === 'STANDARDS' || currentView === 'WORKSPACE'} 
            dark={currentView === 'ADMIN_DASHBOARD'}
        />
        
        {isAdmin && (
          <SidebarItem 
              icon={<ShieldAlert size={22} />} 
              label="Admin Panel" 
              onClick={onAdminClick}
              active={currentView === 'ADMIN_DASHBOARD'}
              dark={currentView === 'ADMIN_DASHBOARD'}
              alert
          />
        )}

        {!isAdmin && (
          <SidebarItem 
              icon={<Smartphone size={22} />} 
              label="Device Hub" 
              onClick={onDeviceHubClick}
              active={currentView === 'DEVICE_HUB'}
          />
        )}

        <SidebarItem icon={<BookOpen size={22} />} label="Library" dark={currentView === 'ADMIN_DASHBOARD'} />
        <SidebarItem icon={<Settings size={22} />} label="Settings" dark={currentView === 'ADMIN_DASHBOARD'} />
      </nav>

      <div className="w-full px-4 mb-4">
        {!isAdmin && (
          <div className="bg-scholar-50 p-4 rounded-2xl hidden md:flex flex-col items-center text-center border border-scholar-100">
            <p className="text-xs font-semibold text-scholar-800 mb-1">Premium Access</p>
            <p className="text-[10px] text-gray-500 mb-3">Unlock all AI features</p>
            <button className="w-full py-2 bg-scholar-600 hover:bg-scholar-700 text-white text-xs font-bold rounded-lg transition-colors">
              Upgrade
            </button>
          </div>
        )}
        <SidebarItem 
          icon={<LogOut size={22} />} 
          label="Logout" 
          onClick={onLogout}
          className="mt-4" 
          dark={currentView === 'ADMIN_DASHBOARD'}
        />
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  onClick?: () => void;
  className?: string;
  dark?: boolean;
  alert?: boolean;
}> = ({ icon, label, active, onClick, className = '', dark, alert }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl transition-all duration-200 group ${
        active 
          ? (alert ? 'bg-red-600 text-white' : 'bg-scholar-600 text-white shadow-md') 
          : dark 
            ? 'text-slate-500 hover:bg-slate-800 hover:text-white'
            : 'text-gray-400 hover:bg-scholar-50 hover:text-scholar-600'
      } ${className}`}
    >
      <div className={`${active ? 'text-white' : 'group-hover:scale-110 transition-transform'}`}>
        {icon}
      </div>
      <span className="hidden md:block font-medium text-sm">{label}</span>
    </button>
  );
};

export default Sidebar;
