import React, { useContext } from 'react';
import { HmiContext } from '../context/HmiContext';
import ConfirmButton from '../components/ConfirmButton';

export default function ReadyReview() {
    const { checks, tools, advanceStage } = useContext(HmiContext);

    const handleProceed = () => {
        advanceStage('OPERATION');
    };

    return (
        <div className="stage-container">
            <h2>READY REVIEW</h2>
            <div className="instruction-card" style={{ textAlign: 'left' }}>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', lineHeight: '2' }}>
                    <li>
                        Machine Checks: 
                        <span style={{ color: '#28a745', float: 'right' }}>{checks.length} / {checks.length} COMPLETE ✓</span>
                    </li>
                    <li>
                        Tools: 
                        <span style={{ color: '#28a745', float: 'right' }}>{tools.length} / {tools.length} COMPLETE ✓</span>
                    </li>
                    <li>
                        Workpiece: 
                        <span style={{ color: '#28a745', float: 'right' }}>COMPLETE ✓</span>
                    </li>
                </ul>
                
                <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: '#28a745', color: '#fff', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    READY
                </div>

                <ConfirmButton 
                    label=" PROCEED TO OPERATION " 
                    onClick={handleProceed} 
                />
            </div>
        </div>
    );
}