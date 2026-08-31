package com.primeform.vmc.entity;
import jakarta.persistence.*; 
import java.time.LocalDateTime;
@Entity public class Tool {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String toolNumber; private String toolType; private String description; private String programName; private String programRevision; private boolean confirmed; private LocalDateTime confirmedAt;
    public Tool() {}
    public Tool(String toolNumber, String toolType, String description, String programName, String programRevision) {
        this.toolNumber = toolNumber; this.toolType = toolType; this.description = description; this.programName = programName; this.programRevision = programRevision; this.confirmed = false;
    }
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getToolNumber() { return toolNumber; } public void setToolNumber(String toolNumber) { this.toolNumber = toolNumber; }
    public String getToolType() { return toolType; } public void setToolType(String toolType) { this.toolType = toolType; }
    public String getDescription() { return description; } public void setDescription(String description) { this.description = description; }
    public String getProgramName() { return programName; } public void setProgramName(String programName) { this.programName = programName; }
    public String getProgramRevision() { return programRevision; } public void setProgramRevision(String programRevision) { this.programRevision = programRevision; }
    public boolean isConfirmed() { return confirmed; } public void setConfirmed(boolean confirmed) { this.confirmed = confirmed; }
    public LocalDateTime getConfirmedAt() { return confirmedAt; } public void setConfirmedAt(LocalDateTime confirmedAt) { this.confirmedAt = confirmedAt; }
}