package com.oasis.repository;

import com.oasis.model.Service;
import com.oasis.model.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByCategory(ServiceCategory category);

    List<Service> findByCategoryId(Long categoryId);
}
