import React from 'react';
import SimulationWrapper from '../SimulationWrapper';
import PondokMonitoringApp from './pondok-monitoring-simulation/App';

interface Props {
  onBack: () => void;
}

const PondokMonitoringSimulation: React.FC<Props> = ({ onBack }) => {
  return (
    <SimulationWrapper title="Monitoring Pondok - Live Simulation" onBack={onBack}>
      <div className="h-full w-full overflow-hidden">
        <PondokMonitoringApp />
      </div>
    </SimulationWrapper>
  );
};

export default PondokMonitoringSimulation;