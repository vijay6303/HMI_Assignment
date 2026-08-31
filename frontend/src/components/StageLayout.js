import React, { useContext } from 'react';
import Header from './Header';
import { HmiContext } from '../context/HmiContext';

export default function StageLayout({ children }) {
    const { stage, operation } = useContext(HmiContext);
    
    return (
        <div className="hmi-app">
            <Header stage={stage} operationStatus={operation?.status} />
            <div className="stage-container">
                <div style={{ marginBottom: '1rem', color: '#aaa', fontWeight: 'bold' }}>
                    CURRENT STAGE
                </div>
                {children}
            </div>
        </div>
    );
}