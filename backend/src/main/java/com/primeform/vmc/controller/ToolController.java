package com.primeform.vmc.controller;

import com.primeform.vmc.entity.Tool;
import com.primeform.vmc.service.ToolService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
public class ToolController {
    private final ToolService service;

    public ToolController(ToolService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tool> getAll() {
        return service.getAllTools();
    }

    @PutMapping("/{id}/confirm")
    public Tool confirmTool(@PathVariable Long id) {
        return service.confirmTool(id);
    }
}