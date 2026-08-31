import React from 'react';

export default function ProgressBar({ current, total }) {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    
    return (
        <div style={{ width: '100%', backgroundColor: '#3d3d4d', borderRadius: '4px', height: '10px', marginTop: '1rem' }}>
            <div style={{ 
                width: `${percentage}%`, 
                backgroundColor: '#007bff', 
                height: '100%', 
                borderRadius: '4px',
                transition: 'width 0.3s ease-in-out'
            }}></div>
        </div>
    );
}