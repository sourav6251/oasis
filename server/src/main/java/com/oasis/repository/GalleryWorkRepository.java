package com.oasis.repository;

import com.oasis.model.GalleryWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryWorkRepository extends JpaRepository<GalleryWork, Long> {
}
