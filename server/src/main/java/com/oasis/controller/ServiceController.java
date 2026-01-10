package com.oasis.controller;

import com.oasis.model.ServicePackage;
import com.oasis.service.SalonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ServiceController {

    @Autowired
    private SalonService salonService;

    @GetMapping("/services")
    public List<com.oasis.model.Service> getAllServices() {
        return salonService.getAllServices();
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<com.oasis.model.Service> getServiceById(@PathVariable Long id) {
        return salonService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/services")
    public com.oasis.model.Service createService(@RequestBody com.oasis.model.Service service) {
        return salonService.saveService(service);
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<com.oasis.model.Service> updateService(@PathVariable Long id,
            @RequestBody com.oasis.model.Service serviceDetails) {
        return salonService.getServiceById(id)
                .map(service -> {
                    service.setName(serviceDetails.getName());
                    service.setPrice(serviceDetails.getPrice());
                    service.setDuration(serviceDetails.getDuration());
                    service.setImg(serviceDetails.getImg());
                    service.setDescription(serviceDetails.getDescription());
                    service.setFeatures(serviceDetails.getFeatures());
                    service.setCategory(serviceDetails.getCategory());
                    com.oasis.model.Service updatedService = salonService.saveService(service);
                    return ResponseEntity.ok(updatedService);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        if (salonService.getServiceById(id).isPresent()) {
            salonService.deleteService(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/services/category/{categoryId}")
    public List<com.oasis.model.Service> getServicesByCategory(@PathVariable Long categoryId) {
        return salonService.getServicesByCategory(categoryId);
    }

    @GetMapping("/service-packages")
    public List<ServicePackage> getAllServicePackages() {
        return salonService.getAllServicePackages();
    }

    @PostMapping("/service-packages")
    public ServicePackage createServicePackage(@RequestBody ServicePackage servicePackage) {
        return salonService.saveServicePackage(servicePackage);
    }
}
