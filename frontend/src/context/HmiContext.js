import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import * as api from '../services/api';

export const HmiContext = createContext();

export const HmiProvider = ({ children }) => {
    const [checks, setChecks] = useState([]);
    const [tools, setTools] = useState([]);
    const [workpiece, setWorkpiece] = useState(null);
    const [operation, setOperation] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Explicitly track the active view instead of deriving it dynamically
    const [stage, setStage] = useState('CHECKS');
    const isInitialLoad = useRef(true);

    const loadData = useCallback(async () => {
        try {
            setError(null);
            
            const [checksRes, toolsRes, workpieceRes, operationRes] = await Promise.all([
                api.getMachineChecks(),
                api.getTools(),
                api.getWorkpiece(),
                api.getOperation()
            ]);

            setChecks(checksRes.data);
            setTools(toolsRes.data);
            setWorkpiece(workpieceRes.data[0]); 
            setOperation(operationRes.data);
            
            // Only auto-calculate the stage on the very first load so browser refreshes persist the view
            if (isInitialLoad.current) {
                const mcDone = checksRes.data.length > 0 && checksRes.data.every(c => c.confirmed);
                const tDone = toolsRes.data.length > 0 && toolsRes.data.every(t => t.confirmed);
                const wpDone = workpieceRes.data[0] && workpieceRes.data[0].confirmed;
                
                let highest = 'CHECKS';
                if (mcDone) highest = 'TOOLS';
                if (mcDone && tDone) highest = 'WORKPIECE';
                if (mcDone && tDone && wpDone) highest = 'READY_REVIEW';
                if (operationRes.data && operationRes.data.status !== 'READY') highest = 'OPERATION';
                
                setStage(highest);
                isInitialLoad.current = false;
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to the machine backend. Please verify connection.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Expose a manual advance function for the NEXT buttons
    const advanceStage = (nextStage) => {
        setStage(nextStage);
    };

    return (
        <HmiContext.Provider value={{
            checks, tools, workpiece, operation,
            loading, error, stage,
            refreshData: loadData,
            advanceStage
        }}>
            {children}
        </HmiContext.Provider>
    );
};