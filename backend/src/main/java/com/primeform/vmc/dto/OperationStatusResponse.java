package com.primeform.vmc.dto;
public class OperationStatusResponse {
    private String operationName; private String status;
    public OperationStatusResponse(String operationName, String status) { 
        this.operationName = operationName; this.status = status; 
    }
    public String getOperationName() { 
        return operationName; 
    } 
    public String getStatus() { 
        return status; 
    }
}