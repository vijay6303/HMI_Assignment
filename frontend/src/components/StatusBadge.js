import React from 'react';

export default function StatusBadge({ stage, operationStatus }) {
    let statusText = 'PENDING';
    let badgeClass = 'badge';

    if (stage === 'READY_REVIEW') {
        statusText = 'READY';
        badgeClass += ' ready';
    } else if (stage === 'OPERATION') {
        statusText = operationStatus || 'READY';
        if (statusText === 'RUNNING') badgeClass += ' running';
        else if (statusText === 'STOPPED') badgeClass += ' stopped';
        else badgeClass += ' ready';
    }

    return <div className={badgeClass}>{statusText}</div>;
}