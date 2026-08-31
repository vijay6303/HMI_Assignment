import React, { useContext, useState } from 'react';
import { HmiContext } from '../context/HmiContext';
import { startOperation, stopOperation } from '../services/api';

export default function Operation() {
    const { operation, refreshData } = useContext(HmiContext);
    const [loading, setLoading] = useState(false);

    if (!operation) return <div>Loading operation...</div>;

    const handleStart = async () => {
        setLoading(true);
        try {
            await startOperation();
            await refreshData();
        } finally {
            setLoading(false);
        }
    };

    const handleStop = async () => {
        setLoading(true);
        try {
            await stopOperation();
            await refreshData();
        } finally {
            setLoading(false);
        }
    };

    const isRunning = operation.status === 'RUNNING';

    return (
        <div className="stage-container">
            <h2>OPERATION</h2>
            <div className="instruction-card" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'left', lineHeight: '1.8', marginBottom: '2rem' }}>
                    <strong>Operation Name:</strong> {operation.operationName}<br />
                    <strong>Quantity:</strong> {operation.quantity}<br />
                    <strong>CNC Program:</strong> {operation.programName}<br />
                </div>

                <div style={{ 
                    padding: '1.5rem', 
                    borderRadius: '8px', 
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    backgroundColor: isRunning ? '#ffc107' : (operation.status === 'STOPPED' ? '#dc3545' : '#28a745'),
                    color: isRunning ? '#000' : '#fff'
                }}>
                    STATUS: {operation.status}
                </div>

                {!isRunning ? (
                    <button 
                        className="btn success" 
                        onClick={handleStart} 
                        disabled={loading}
                        style={{ fontSize: '1.5rem', padding: '1.5rem' }}
                    >
                         START OPERATION 
                    </button>
                ) : (
                    <button 
                        className="btn danger" 
                        onClick={handleStop} 
                        disabled={loading}
                        style={{ fontSize: '1.5rem', padding: '1.5rem' }}
                    >
                         STOP OPERATION 
                    </button>
                )}
            </div>
        </div>
    );
}