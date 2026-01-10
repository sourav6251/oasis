package com.oasis.service;

import com.oasis.model.ServicePackage;
import com.oasis.repository.ServicePackageRepository;
import com.oasis.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalonService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private com.oasis.repository.ServiceCategoryRepository serviceCategoryRepository;

    @Autowired
    private ServicePackageRepository servicePackageRepository;

    public List<com.oasis.model.Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<com.oasis.model.Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public com.oasis.model.Service saveService(com.oasis.model.Service service) {
        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    public List<com.oasis.model.Service> getServicesByCategory(Long categoryId) {
        return serviceRepository.findByCategoryId(categoryId);
    }

    public List<ServicePackage> getAllServicePackages() {
        return servicePackageRepository.findAll();
    }

    public ServicePackage saveServicePackage(ServicePackage servicePackage) {
        return servicePackageRepository.save(servicePackage);
    }

    // Service Category Methods

    public List<com.oasis.model.ServiceCategory> getAllServiceCategories() {
        return serviceCategoryRepository.findAll();
    }

    public Optional<com.oasis.model.ServiceCategory> getServiceCategoryById(Long id) {
        return serviceCategoryRepository.findById(id);
    }

    public com.oasis.model.ServiceCategory saveServiceCategory(com.oasis.model.ServiceCategory serviceCategory) {
        return serviceCategoryRepository.save(serviceCategory);
    }

    public void deleteServiceCategory(Long id) {
        serviceCategoryRepository.deleteById(id);
    }
}
