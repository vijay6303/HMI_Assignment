package com.primeform.vmc.service;

import com.primeform.vmc.entity.Tool;
import com.primeform.vmc.repository.ToolRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ToolService {
    private final ToolRepository repository;

    public ToolService(ToolRepository repository) {
        this.repository = repository;
    }

    public List<Tool> getAllTools() {
        return repository.findAll();
    }

    public Tool confirmTool(Long id) {
        Tool tool = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tool not found"));
        tool.setConfirmed(true);
        tool.setConfirmedAt(LocalDateTime.now());
        return repository.save(tool);
    }
}