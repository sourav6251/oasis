package com.oasis.controller;

import com.oasis.model.GalleryCategory;
import com.oasis.service.GalleryCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery-categories")
@CrossOrigin(origins = "*")
public class GalleryCategoryController {

    @Autowired
    private GalleryCategoryService galleryCategoryService;

    @GetMapping
    public List<GalleryCategory> getAllGalleryCategories() {
        return galleryCategoryService.getAllGalleryCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryCategory> getGalleryCategoryById(@PathVariable Long id) {
        return galleryCategoryService.getGalleryCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GalleryCategory createGalleryCategory(@RequestBody GalleryCategory category) {
        return galleryCategoryService.saveGalleryCategory(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryCategory> updateGalleryCategory(@PathVariable Long id,
            @RequestBody GalleryCategory categoryDetails) {
        return galleryCategoryService.getGalleryCategoryById(id)
                .map(category -> {
                    category.setName(categoryDetails.getName());
                    category.setIcon(categoryDetails.getIcon());
                    GalleryCategory updatedCategory = galleryCategoryService.saveGalleryCategory(category);
                    return ResponseEntity.ok(updatedCategory);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGalleryCategory(@PathVariable Long id) {
        if (galleryCategoryService.getGalleryCategoryById(id).isPresent()) {
            galleryCategoryService.deleteGalleryCategory(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
