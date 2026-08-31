import React from 'react';
import StatusBadge from './StatusBadge';

export default function Header({ stage, operationStatus }) {
    return (
        <div className="hmi-header">
            <div>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>VMC OPERATOR HMI</h1>
                <p style={{ margin: '0.5rem 0 0 0', color: '#aaa' }}>Machine: VMC-01 | Operation: Face Milling</p>
            </div>
            <StatusBadge stage={stage} operationStatus={operationStatus} />
        </div>
    );
}