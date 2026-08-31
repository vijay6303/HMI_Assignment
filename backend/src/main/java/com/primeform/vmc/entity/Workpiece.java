package com.primeform.vmc.entity;
import jakarta.persistence.*; 
import java.time.LocalDateTime;
@Entity public class Workpiece {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String operationName; private int quantity; private String material; private String drawing; private String drawingRevision; private String fixture; private String orientation; private String clampingInstruction; private String workOffset; private boolean confirmed; private LocalDateTime confirmedAt;
    public Workpiece() {}
    public Workpiece(String operationName, int quantity, String material, String drawing, String drawingRevision, String fixture, String orientation, String clampingInstruction, String workOffset) {
        this.operationName = operationName; this.quantity = quantity; this.material = material; this.drawing = drawing; this.drawingRevision = drawingRevision; this.fixture = fixture; this.orientation = orientation; this.clampingInstruction = clampingInstruction; this.workOffset = workOffset; this.confirmed = false;
    }
    public Long getId() { return id; }
    public String getOperationName() { return operationName; } public int getQuantity() { return quantity; } public String getMaterial() { return material; } public String getDrawing() { return drawing; } public String getDrawingRevision() { return drawingRevision; } public String getFixture() { return fixture; } public String getOrientation() { return orientation; } public String getClampingInstruction() { return clampingInstruction; } public String getWorkOffset() { return workOffset; }
    public boolean isConfirmed() { return confirmed; } public void setConfirmed(boolean confirmed) { this.confirmed = confirmed; }
    public LocalDateTime getConfirmedAt() { return confirmedAt; } public void setConfirmedAt(LocalDateTime confirmedAt) { this.confirmedAt = confirmedAt; }
}