
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SubjectColumns from './components/SubjectColumns';
import StandardGrid from './components/StandardGrid';
import UploadInterface from './components/UploadInterface';
import LoginScreen from './components/LoginScreen';
import DeviceHub from './components/DeviceHub';
import AdminDashboard from './components/AdminDashboard';
import { Subject, Standard, ViewState } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState<ViewState>('SUBJECTS');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(null);

  const handleLoginSuccess = (admin: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
    if (admin) {
      setView('ADMIN_DASHBOARD');
    } else {
      setView('SUBJECTS');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setView('SUBJECTS');
    setSelectedSubject(null);
    setSelectedStandard(null);
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('STANDARDS');
  };

  const handleStandardSelect = (standard: Standard) => {
    setSelectedStandard(standard);
    setView('WORKSPACE');
  };

  const handleHomeClick = () => {
    if (isAdmin) {
      setView('ADMIN_DASHBOARD');
    } else {
      setView('SUBJECTS');
      setSelectedSubject(null);
      setSelectedStandard(null);
    }
  };

  const handleDeviceHubClick = () => {
    setView('DEVICE_HUB');
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      setView('ADMIN_DASHBOARD');
    }
  };

  const handleBackToSubjects = () => {
    setView('SUBJECTS');
    setSelectedSubject(null);
  };

  const handleBackToStandards = () => {
    setView('STANDARDS');
    setSelectedStandard(null);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden font-sans text-slate-900 ${view === 'ADMIN_DASHBOARD' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <Sidebar 
        onHomeClick={handleHomeClick} 
        onDeviceHubClick={handleDeviceHubClick}
        onAdminClick={handleAdminClick}
        onLogout={handleLogout}
        currentView={view}
        isAdmin={isAdmin}
      />
      
      <main className="flex-1 relative h-full overflow-hidden flex flex-col">
        {/* Decorative background elements - Only for standard user */}
        {view !== 'ADMIN_DASHBOARD' && (
          <>
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-scholar-50 to-transparent pointer-events-none -z-10" />
            <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none -z-10" />
          </>
        )}

        {/* Content Area */}
        <div className="flex-1 h-full relative z-10 flex flex-col">
          {view === 'SUBJECTS' && (
            <div className="h-full flex flex-col">
              <header className="px-8 pt-8 pb-4">
                 <h1 className="text-3xl font-bold text-gray-900">Welcome to Scholar Hub</h1>
                 <p className="text-gray-500">Choose a learning path to begin your journey.</p>
              </header>
              <SubjectColumns onSelect={handleSubjectSelect} />
            </div>
          )}

          {view === 'STANDARDS' && selectedSubject && (
            <StandardGrid 
              subject={selectedSubject} 
              onSelect={handleStandardSelect}
              onBack={handleBackToSubjects}
            />
          )}

          {view === 'WORKSPACE' && selectedSubject && selectedStandard && (
            <UploadInterface 
              subject={selectedSubject}
              standard={selectedStandard}
              onBack={handleBackToStandards}
            />
          )}

          {view === 'DEVICE_HUB' && (
            <DeviceHub />
          )}

          {view === 'ADMIN_DASHBOARD' && (
            <AdminDashboard />
          )}
        </div>

        {/* Footer */}
        <footer className={`py-4 text-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 transition-colors ${view === 'ADMIN_DASHBOARD' ? 'bg-black text-slate-500' : 'bg-scholar-900 text-white'}`}>
            <p className="text-sm font-bold uppercase tracking-widest drop-shadow-md">
                Designed and published by Archit Rahul Salunkhe
            </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
