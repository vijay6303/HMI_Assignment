import React, { useContext } from 'react';
import { HmiContext, HmiProvider } from './context/HmiContext';
import StageLayout from './components/StageLayout';
import MachineChecks from './pages/MachineChecks';
import Tools from './pages/Tools';
import WorkpieceSetup from './pages/WorkpieceSetup';
import ReadyReview from './pages/ReadyReview';
import Operation from './pages/Operation';

const AppContent = () => {
    const { loading, error, stage } = useContext(HmiContext);
    
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff', fontSize: '1.5rem' }}>
                POWERING ON...
            </div>
        );
    }
    
    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#dc3545', fontSize: '1.5rem' }}>
                {error}
            </div>
        );
    }

    const renderStage = () => {
        switch (stage) {
            case 'CHECKS': return <MachineChecks />;
            case 'TOOLS': return <Tools />;
            case 'WORKPIECE': return <WorkpieceSetup />;
            case 'READY_REVIEW': return <ReadyReview />;
            case 'OPERATION': return <Operation />;
            default: return <div>Unknown State</div>;
        }
    };

    return <StageLayout>{renderStage()}</StageLayout>;
};

export default function App() { 
    // Wrapping the application inside the HmiProvider here guarantees 
    // that the context is always available to AppContent and all children.
    return (
        <HmiProvider>
            <AppContent />
        </HmiProvider>
    ); 
}