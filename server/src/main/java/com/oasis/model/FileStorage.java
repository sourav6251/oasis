package com.oasis.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "file_storage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileStorage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // Reference to any entity
    private String entityType; // e.g., "SERVICE_REQUEST", "USER", "PARTNER", "REVIEW"
    private String entityId;   // ID of the referenced entity

    private String fileUrl;

    @CreationTimestamp
    private LocalDateTime uploadedAt;
}