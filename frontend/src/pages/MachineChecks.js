import React, { useContext, useState } from 'react';
import { HmiContext } from '../context/HmiContext';
import { confirmMachineCheck } from '../services/api';

export default function MachineChecks() {
    const { checks, refreshData, advanceStage } = useContext(HmiContext);
    const pendingCheck = checks.find(c => !c.confirmed);
    const confirmedCount = checks.filter(c => c.confirmed).length;
    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            await confirmMachineCheck(pendingCheck.id);
            await refreshData();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="stage-container">
            <h2>MACHINE CHECKS</h2>
            {pendingCheck ? (
                <div className="instruction-card">
                    <div className="counter" style={{ color: '#aaa', marginBottom: '1rem' }}>
                        Check {confirmedCount + 1} of {checks.length}
                    </div>
                    <h3>{pendingCheck.name}</h3>
                    <p>{pendingCheck.description}</p>
                    <button className="btn primary" onClick={handleConfirm} disabled={submitting}>
                         CONFIRM CHECK 
                    </button>
                </div>
            ) : (
                <div className="instruction-card success">
                    <h3>All Checks Complete</h3>
                    <button className="btn success" onClick={() => advanceStage('TOOLS')}>
                         NEXT 
                    </button>
                </div>
            )}
            <div className="progress-text">Progress: {confirmedCount} / {checks.length}</div>
        </div>
    );
}