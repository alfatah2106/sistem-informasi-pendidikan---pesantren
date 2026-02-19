import React from 'react';
import SimulationWrapper from '../SimulationWrapper';
import htmlContent from './pondok_pay_simulasi/pondok_pay_simulasi.html?raw';

interface Props {
    onBack: () => void;
}

const PondokPaySimulation: React.FC<Props> = ({ onBack }) => {
    return (
        <SimulationWrapper title="Pondok Pay - Live Simulation" onBack={onBack}>
            <div className="h-full w-full overflow-hidden bg-gray-100">
                <iframe
                    title="Pondok Pay"
                    srcDoc={htmlContent}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    allow="camera"
                />
            </div>
        </SimulationWrapper>
    );
};

export default PondokPaySimulation;
