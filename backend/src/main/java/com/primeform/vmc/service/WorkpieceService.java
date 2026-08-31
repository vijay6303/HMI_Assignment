package com.primeform.vmc.service;

import com.primeform.vmc.entity.Workpiece;
import com.primeform.vmc.repository.WorkpieceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WorkpieceService {
    private final WorkpieceRepository repository;

    public WorkpieceService(WorkpieceRepository repository) {
        this.repository = repository;
    }

    public List<Workpiece> getWorkpiece() {
        return repository.findAll();
    }

    public Workpiece confirmWorkpiece() {
        Workpiece workpiece = repository.findAll().stream().findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workpiece not found"));
        workpiece.setConfirmed(true);
        workpiece.setConfirmedAt(LocalDateTime.now());
        return repository.save(workpiece);
    }
}