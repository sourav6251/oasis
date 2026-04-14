package com.oasis.repository;

import com.oasis.model.FileStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileStorageRepository extends JpaRepository<FileStorage, String> {
    Optional<FileStorage> findByEntityTypeAndEntityId(String entityType, String entityId);
}
