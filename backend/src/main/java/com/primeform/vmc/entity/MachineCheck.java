package com.primeform.vmc.entity;
import jakarta.persistence.*; 
import java.time.LocalDateTime;
@Entity public class MachineCheck {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String name; private String description; private boolean confirmed; private LocalDateTime confirmedAt;
    public MachineCheck() {}
    public MachineCheck(String name, String description) { this.name = name; this.description = description; this.confirmed = false; }
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getDescription() { return description; } public void setDescription(String description) { this.description = description; }
    public boolean isConfirmed() { return confirmed; } public void setConfirmed(boolean confirmed) { this.confirmed = confirmed; }
    public LocalDateTime getConfirmedAt() { return confirmedAt; } public void setConfirmedAt(LocalDateTime confirmedAt) { this.confirmedAt = confirmedAt; }
}