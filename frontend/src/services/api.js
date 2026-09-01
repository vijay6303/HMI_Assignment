import axios from 'axios';

const API_BASE_URL = 'https://hmi-assignment.onrender.com/api';

// Create a configured axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Machine Checks
export const getMachineChecks = () => apiClient.get('/machine-checks');
export const confirmMachineCheck = (id) => apiClient.put(`/machine-checks/${id}/confirm`);

// Tools
export const getTools = () => apiClient.get('/tools');
export const confirmTool = (id) => apiClient.put(`/tools/${id}/confirm`);

// Workpiece
export const getWorkpiece = () => apiClient.get('/workpiece');
export const confirmWorkpiece = () => apiClient.put('/workpiece/confirm');

// Operation
export const getOperation = () => apiClient.get('/operation');
export const startOperation = () => apiClient.post('/operation/start');
export const stopOperation = () => apiClient.post('/operation/stop');

// Overall Readiness
export const getReadiness = () => apiClient.get('/readiness');