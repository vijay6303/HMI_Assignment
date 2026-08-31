package com.primeform.vmc.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.primeform.vmc.entity.MachineCheck;
import com.primeform.vmc.repository.MachineCheckRepository;

@Service
public class MachineCheckService {
    private final MachineCheckRepository repository;

    public MachineCheckService(MachineCheckRepository repository) {
        this.repository = repository;
    }

    public List<MachineCheck> getAllChecks() {
        return repository.findAll();
    }

    public MachineCheck confirmCheck(Long id) {
        MachineCheck check = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Check not found"));
        check.setConfirmed(true);
        check.setConfirmedAt(LocalDateTime.now());
        return repository.save(check);
    }
}