import React from 'react';
import SimulationWrapper from '../SimulationWrapper';
import AdminSekolahApp from './admin-sekolah-simulation/App';

interface Props {
  onBack: () => void;
}

const SchoolAdminSimulation: React.FC<Props> = ({ onBack }) => {
  return (
    <SimulationWrapper title="Admin Sekolah - Live Simulation" onBack={onBack}>
      <div className="h-full w-full overflow-hidden">
        <AdminSekolahApp />
      </div>
    </SimulationWrapper>
  );
};

export default SchoolAdminSimulation;