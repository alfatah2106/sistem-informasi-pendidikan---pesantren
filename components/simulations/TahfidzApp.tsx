import React from 'react';
import SimulationWrapper from '../SimulationWrapper';

interface Props {
  onBack: () => void;
}

const TahfidzAppSimulation: React.FC<Props> = ({ onBack }) => {
  return (
    <SimulationWrapper title="Aplikasi Tahfidz - Live Simulation" onBack={onBack}>
      <div className="h-full w-full overflow-hidden">
        <iframe
          src="/simulations/tahfidz/index.html"
          className="w-full h-full border-none"
          title="Tahfidz App Simulation"
        />
      </div>
    </SimulationWrapper>
  );
};

export default TahfidzAppSimulation;