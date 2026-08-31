package com.primeform.vmc.controller;

import com.primeform.vmc.entity.MachineCheck;
import com.primeform.vmc.service.MachineCheckService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machine-checks")
public class MachineCheckController {
    private final MachineCheckService service;

    public MachineCheckController(MachineCheckService service) {
        this.service = service;
    }

    @GetMapping
    public List<MachineCheck> getAll() {
        return service.getAllChecks();
    }

    @PutMapping("/{id}/confirm")
    public MachineCheck confirmCheck(@PathVariable Long id) {
        return service.confirmCheck(id);
    }
}