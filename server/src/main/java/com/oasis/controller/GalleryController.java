package com.oasis.controller;

import com.oasis.model.GalleryWork;
import com.oasis.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @GetMapping
    public List<GalleryWork> getAllGalleryWorks() {
        return galleryService.getAllGalleryWorks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryWork> getGalleryWorkById(@PathVariable Long id) {
        return galleryService.getGalleryWorkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GalleryWork createGalleryWork(@RequestBody GalleryWork work) {
        return galleryService.saveGalleryWork(work);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryWork> updateGalleryWork(@PathVariable Long id, @RequestBody GalleryWork workDetails) {
        return galleryService.getGalleryWorkById(id)
                .map(work -> {
                    work.setTitle(workDetails.getTitle());
                    work.setCategory(workDetails.getCategory());
                    work.setImage(workDetails.getImage());
                    work.setDescription(workDetails.getDescription());
                    work.setDuration(workDetails.getDuration());
                    work.setStylist(workDetails.getStylist());
                    GalleryWork updatedWork = galleryService.saveGalleryWork(work);
                    return ResponseEntity.ok(updatedWork);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGalleryWork(@PathVariable Long id) {
        if (galleryService.getGalleryWorkById(id).isPresent()) {
            galleryService.deleteGalleryWork(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
