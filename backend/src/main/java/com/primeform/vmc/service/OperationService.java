package com.primeform.vmc.service;

import com.primeform.vmc.entity.Operation;
import com.primeform.vmc.entity.OperationStatus;
import com.primeform.vmc.repository.OperationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class OperationService {
    private final OperationRepository repository;
    private final ReadinessService readinessService;

    public OperationService(OperationRepository repository, ReadinessService readinessService) {
        this.repository = repository;
        this.readinessService = readinessService;
    }

    public Operation getOperation() {
        return repository.findAll().stream().findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Operation not found"));
    }

    public Operation startOperation() {
        Boolean isReady = readinessService.getReadiness().get("ready");
        if (isReady == null || !isReady) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot start: Machine is not fully ready.");
        }

        Operation operation = getOperation();
        
        if (operation.getStatus() == OperationStatus.RUNNING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Operation is already running.");
        }

        operation.setStatus(OperationStatus.RUNNING);
        operation.setStartedAt(LocalDateTime.now());
        
        return repository.save(operation);
    }

    public Operation stopOperation() {
        Operation operation = getOperation();
        
        if (operation.getStatus() != OperationStatus.RUNNING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot stop: Operation is not running.");
        }

        operation.setStatus(OperationStatus.STOPPED);
        operation.setStoppedAt(LocalDateTime.now());
        
        return repository.save(operation);
    }
}