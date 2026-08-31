import React, { useContext, useState } from 'react';
import { HmiContext } from '../context/HmiContext';
import { confirmTool } from '../services/api';
import ConfirmButton from '../components/ConfirmButton';
import ProgressBar from '../components/ProgressBar';

export default function Tools() {
    const { tools, refreshData, advanceStage } = useContext(HmiContext);
    const pendingTool = tools.find(t => !t.confirmed);
    const confirmedCount = tools.filter(t => t.confirmed).length;
    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            await confirmTool(pendingTool.id);
            await refreshData();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="stage-container">
            <h2>TOOLS</h2>
            {pendingTool ? (
                <div className="instruction-card">
                    <div className="counter" style={{ color: '#aaa', marginBottom: '1rem' }}>
                        Tool {confirmedCount + 1} of {tools.length}
                    </div>
                    <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>{pendingTool.toolNumber}</h3>
                    <div style={{ textAlign: 'left', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        <strong>Type:</strong> {pendingTool.toolType}<br />
                        <strong>Description:</strong> {pendingTool.description}<br />
                        <strong>CNC Program:</strong> {pendingTool.programName}<br />
                        <strong>Revision:</strong> {pendingTool.programRevision}<br />
                    </div>
                    <div style={{ background: '#2b2b36', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                        <strong>Instruction:</strong><br />
                        Insert {pendingTool.toolNumber} into the machine tool holder.
                    </div>
                    <ConfirmButton 
                        label=" CONFIRM TOOL " 
                        onClick={handleConfirm} 
                        disabled={submitting} 
                    />
                </div>
            ) : (
                <div className="instruction-card success">
                    <h3>All Tools Confirmed</h3>
                    <button className="btn success" onClick={() => advanceStage('WORKPIECE')}>
                         NEXT 
                    </button>
                </div>
            )}
            
            <div className="progress-text" style={{ marginTop: '1rem', color: '#aaa' }}>
                Progress: {confirmedCount} / {tools.length}
            </div>
            <ProgressBar current={confirmedCount} total={tools.length} />
        </div>
    );
}