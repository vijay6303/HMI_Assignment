import React, { useContext, useState } from 'react';
import { HmiContext } from '../context/HmiContext';
import { confirmWorkpiece } from '../services/api';
import ConfirmButton from '../components/ConfirmButton';

export default function WorkpieceSetup() {
    const { workpiece, refreshData, advanceStage } = useContext(HmiContext);
    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            await confirmWorkpiece();
            await refreshData();
        } finally {
            setSubmitting(false);
        }
    };

    if (!workpiece) return <div>Loading workpiece data...</div>;

    return (
        <div className="stage-container">
            <h2>WORKPIECE SETUP</h2>
            <div className="instruction-card" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
                    <strong>Operation:</strong> {workpiece.operationName}<br />
                    <strong>Material:</strong> {workpiece.material}<br />
                    <strong>Drawing:</strong> {workpiece.drawing} (Rev {workpiece.drawingRevision})<br />
                    <strong>Fixture:</strong> {workpiece.fixture}<br />
                    <strong>Work Offset:</strong> {workpiece.workOffset}<br />
                    <hr style={{ borderColor: '#2b2b36', margin: '1rem 0' }} />
                    <strong>Orientation:</strong><br />
                    <span style={{ color: '#007bff' }}>{workpiece.orientation}</span><br /><br />
                    <strong>Clamping:</strong><br />
                    <span style={{ color: '#007bff' }}>{workpiece.clampingInstruction}</span>
                </div>
                
                {!workpiece.confirmed ? (
                    <ConfirmButton 
                        label=" CONFIRM WORKPIECE " 
                        onClick={handleConfirm} 
                        disabled={submitting} 
                    />
                ) : (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ color: '#28a745' }}>Workpiece Confirmed</h3>
                        <button className="btn success" onClick={() => advanceStage('READY_REVIEW')}>
                             NEXT 
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}