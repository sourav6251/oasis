package com.oasis.controller;

import com.oasis.model.ServiceCategory;
import com.oasis.service.SalonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-categories")
@CrossOrigin(origins = "*")
public class ServiceCategoryController {

    @Autowired
    private SalonService salonService;

    @GetMapping
    public List<ServiceCategory> getAllServiceCategories() {
        return salonService.getAllServiceCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceCategory> getServiceCategoryById(@PathVariable Long id) {
        return salonService.getServiceCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ServiceCategory createServiceCategory(@RequestBody ServiceCategory serviceCategory) {
        return salonService.saveServiceCategory(serviceCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceCategory> updateServiceCategory(@PathVariable Long id,
            @RequestBody ServiceCategory serviceCategoryDetails) {
        return salonService.getServiceCategoryById(id)
                .map(category -> {
                    category.setName(serviceCategoryDetails.getName());
                    ServiceCategory updatedCategory = salonService.saveServiceCategory(category);
                    return ResponseEntity.ok(updatedCategory);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceCategory(@PathVariable Long id) {
        if (salonService.getServiceCategoryById(id).isPresent()) {
            salonService.deleteServiceCategory(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
