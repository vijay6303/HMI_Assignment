package com.primeform.vmc.controller;
import com.primeform.vmc.dto.OperationStatusResponse; 
import com.primeform.vmc.entity.Operation; 
import com.primeform.vmc.service.*;
import org.springframework.web.bind.annotation.*; 
import java.util.Map;
@RestController @RequestMapping("/api") public class OperationController {
    private final OperationService opService; private final ReadinessService readService;
    public OperationController(OperationService opService, ReadinessService readService) { this.opService = opService; this.readService = readService; }
    @GetMapping("/readiness") public Map<String, Boolean> getReadiness() { 
        return readService.getReadiness(); 
    }
    @GetMapping("/operation") public Operation getOperation() { 
        return opService.getOperation(); 
    }
    @PostMapping("/operation/start") public Operation start() { 
        return opService.startOperation(); 
    }
    @PostMapping("/operation/stop") public Operation stop() { 
        return opService.stopOperation(); 
    }
}