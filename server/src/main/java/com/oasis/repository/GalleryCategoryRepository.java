package com.oasis.repository;

import com.oasis.model.GalleryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GalleryCategoryRepository extends JpaRepository<GalleryCategory, Long> {
    Optional<GalleryCategory> findByName(String name);
}
