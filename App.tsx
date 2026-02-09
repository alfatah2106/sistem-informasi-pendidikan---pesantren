import React, { useState } from 'react';
import { ViewState } from './types';
import LandingPage from './components/LandingPage';
import SchoolAdminSimulation from './components/simulations/SchoolAdmin';
import PondokMonitoringSimulation from './components/simulations/PondokMonitoring';
import TahfidzAppSimulation from './components/simulations/TahfidzApp';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'school-admin':
        return <SchoolAdminSimulation onBack={() => setCurrentView('landing')} />;
      case 'pondok-monitoring':
        return <PondokMonitoringSimulation onBack={() => setCurrentView('landing')} />;
      case 'tahfidz-app':
        return <TahfidzAppSimulation onBack={() => setCurrentView('landing')} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen text-slate-800">
      {renderView()}
      <FloatingWhatsApp />
    </div>
  );
};

export default App;