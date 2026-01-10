package com.oasis.service;

import com.oasis.model.GalleryWork;
import com.oasis.repository.GalleryWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    @Autowired
    private GalleryWorkRepository galleryWorkRepository;

    public List<GalleryWork> getAllGalleryWorks() {
        return galleryWorkRepository.findAll();
    }

    public Optional<GalleryWork> getGalleryWorkById(Long id) {
        return galleryWorkRepository.findById(id);
    }

    public GalleryWork saveGalleryWork(GalleryWork work) {
        return galleryWorkRepository.save(work);
    }

    public void deleteGalleryWork(Long id) {
        galleryWorkRepository.deleteById(id);
    }
}
