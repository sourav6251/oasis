package com.oasis.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "service_packages")
public class ServicePackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String price;
    private String originalPrice;

    @ElementCollection
    private List<String> features;

    private Boolean popular;

    public ServicePackage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(String originalPrice) {
        this.originalPrice = originalPrice;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public Boolean getPopular() {
        return popular;
    }

    public void setPopular(Boolean popular) {
        this.popular = popular;
    }
}
