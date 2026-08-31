package com.primeform.vmc.service;

import com.primeform.vmc.entity.MachineCheck;
import com.primeform.vmc.entity.Tool;
import com.primeform.vmc.entity.Workpiece;
import com.primeform.vmc.repository.MachineCheckRepository;
import com.primeform.vmc.repository.ToolRepository;
import com.primeform.vmc.repository.WorkpieceRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReadinessService {
    
    private final MachineCheckRepository machineCheckRepository;
    private final ToolRepository toolRepository;
    private final WorkpieceRepository workpieceRepository;

    public ReadinessService(MachineCheckRepository machineCheckRepository, 
                            ToolRepository toolRepository, 
                            WorkpieceRepository workpieceRepository) {
        this.machineCheckRepository = machineCheckRepository;
        this.toolRepository = toolRepository;
        this.workpieceRepository = workpieceRepository;
    }

    public Map<String, Boolean> getReadiness() {
        List<MachineCheck> checks = machineCheckRepository.findAll();
        boolean machineChecksComplete = !checks.isEmpty() && checks.stream().allMatch(MachineCheck::isConfirmed);

        List<Tool> tools = toolRepository.findAll();
        boolean toolsComplete = !tools.isEmpty() && tools.stream().allMatch(Tool::isConfirmed);

        List<Workpiece> workpieces = workpieceRepository.findAll();
        boolean workpieceComplete = !workpieces.isEmpty() && workpieces.stream().allMatch(Workpiece::isConfirmed);

        boolean ready = machineChecksComplete && toolsComplete && workpieceComplete;

        Map<String, Boolean> readinessState = new HashMap<>();
        readinessState.put("machineChecksComplete", machineChecksComplete);
        readinessState.put("toolsComplete", toolsComplete);
        readinessState.put("workpieceComplete", workpieceComplete);
        readinessState.put("ready", ready);

        return readinessState;
    }
}