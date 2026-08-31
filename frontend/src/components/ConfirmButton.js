import React from 'react';

export default function ConfirmButton({ onClick, disabled, label }) {
    return (
        <button 
            className="btn primary" 
            onClick={onClick} 
            disabled={disabled}
        >
            {label}
        </button>
    );
}