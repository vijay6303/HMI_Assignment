package com.primeform.vmc.controller;

import com.primeform.vmc.entity.Workpiece;
import com.primeform.vmc.service.WorkpieceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workpiece")
public class WorkpieceController {
    private final WorkpieceService service;

    public WorkpieceController(WorkpieceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Workpiece> getWorkpiece() {
        return service.getWorkpiece();
    }

    @PutMapping("/confirm")
    public Workpiece confirmWorkpiece() {
        return service.confirmWorkpiece();
    }
}