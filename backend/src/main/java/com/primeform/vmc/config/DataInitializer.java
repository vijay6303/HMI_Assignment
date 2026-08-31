package com.primeform.vmc.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.primeform.vmc.entity.MachineCheck;
import com.primeform.vmc.entity.Operation;
import com.primeform.vmc.entity.OperationStatus;
import com.primeform.vmc.entity.Tool;
import com.primeform.vmc.entity.Workpiece;
import com.primeform.vmc.repository.MachineCheckRepository;
import com.primeform.vmc.repository.OperationRepository;
import com.primeform.vmc.repository.ToolRepository;
import com.primeform.vmc.repository.WorkpieceRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MachineCheckRepository machineCheckRepository;
    private final ToolRepository toolRepository;
    private final WorkpieceRepository workpieceRepository;
    private final OperationRepository operationRepository;

    public DataInitializer(MachineCheckRepository machineCheckRepository, 
                           ToolRepository toolRepository, 
                           WorkpieceRepository workpieceRepository, 
                           OperationRepository operationRepository) {
        this.machineCheckRepository = machineCheckRepository;
        this.toolRepository = toolRepository;
        this.workpieceRepository = workpieceRepository;
        this.operationRepository = operationRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (machineCheckRepository.count() == 0) {
            machineCheckRepository.save(new MachineCheck("Power / Control Available", "Power/control system is available."));
            machineCheckRepository.save(new MachineCheck("E-Stop Released", "Verify Emergency Stop button is released."));
            machineCheckRepository.save(new MachineCheck("Guard / Door Closed", "Ensure safety guards and doors are securely closed."));
            machineCheckRepository.save(new MachineCheck("No Active Alarm", "Check panel for active alarms."));
            machineCheckRepository.save(new MachineCheck("Lubrication / Coolant Ready", "Verify levels and flow are ready."));
            machineCheckRepository.save(new MachineCheck("Reference Return Complete", "Axes returned to home position."));
        }

        if (toolRepository.count() == 0) {
            toolRepository.save(new Tool("T01", "Face Mill", "50mm carbide face mill", "VMC-PART-1001", "Rev B"));
            toolRepository.save(new Tool("T02", "End Mill", "10mm carbide end mill", "VMC-PART-1001", "Rev B"));
            toolRepository.save(new Tool("T03", "Drill", "6mm carbide drill", "VMC-PART-1001", "Rev B"));
        }

        if (workpieceRepository.count() == 0) {
            workpieceRepository.save(new Workpiece(
                "Face Milling - Aluminium Component", 
                10, 
                "Aluminium 6061-T6", 
                "PART-1001", 
                "Rev B", 
                "VMC Precision Vice Fixture #01", 
                "Datum A facing the operator", 
                "Place the workpiece firmly against the fixed jaw and tighten the vice securely.", 
                "G54"
            ));
        }

        if (operationRepository.count() == 0) {
            operationRepository.save(new Operation(
                "Face Milling - Aluminium Component", 
                10, 
                "VMC-PART-1001", 
                OperationStatus.READY
            ));
        }
    }
}