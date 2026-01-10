package com.oasis.service;

import com.oasis.model.GalleryCategory;
import com.oasis.repository.GalleryCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryCategoryService {

    @Autowired
    private GalleryCategoryRepository galleryCategoryRepository;

    public List<GalleryCategory> getAllGalleryCategories() {
        return galleryCategoryRepository.findAll();
    }

    public Optional<GalleryCategory> getGalleryCategoryById(Long id) {
        return galleryCategoryRepository.findById(id);
    }

    public GalleryCategory saveGalleryCategory(GalleryCategory category) {
        return galleryCategoryRepository.save(category);
    }

    public void deleteGalleryCategory(Long id) {
        galleryCategoryRepository.deleteById(id);
    }
}
