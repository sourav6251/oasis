import apiStore from "./apiStore";
import type { Service, ServiceCategory, ServicePackage } from "@/types/Services";

/**
 * Service API - Delegates to centralized apiStore
 * This wrapper maintains backward compatibility while using apiStore internally
 */
class ServiceApi {
    // ==================== Service Category Methods ====================

    /**
     * Get all service categories
     */
    getAllServiceCategories = async (): Promise<ServiceCategory[]> => {
        return apiStore.getAllServiceCategories();
    };

    /**
     * Get a single service category by ID
     */
    getServiceCategoryById = async (id: string): Promise<ServiceCategory> => {
        return apiStore.getServiceCategoryById(id);
    };

    /**
     * Create a new service category
     */
    createServiceCategory = async (data: Omit<ServiceCategory, "_id">): Promise<ServiceCategory> => {
        return apiStore.createServiceCategory(data);
    };

    /**
     * Update an existing service category
     */
    updateServiceCategory = async (
        id: string,
        data: Omit<ServiceCategory, "_id">
    ): Promise<ServiceCategory> => {
        return apiStore.updateServiceCategory(id, data);
    };

    /**
     * Delete a service category
     */
    deleteServiceCategory = async (id: string): Promise<void> => {
        return apiStore.deleteServiceCategory(id);
    };

    // ==================== Service Methods ====================

    /**
     * Get all services
     */
    getAllServices = async (): Promise<Service[]> => {
        return apiStore.getAllServices();
    };

    /**
     * Get a single service by ID
     */
    getServiceById = async (id: string): Promise<Service> => {
        return apiStore.getServiceById(id);
    };

    /**
     * Get services filtered by category ID
     */
    getServicesByCategory = async (categoryId: string): Promise<Service[]> => {
        return apiStore.getServicesByCategory(categoryId);
    };

    /**
     * Create a new service
     */
    createService = async (data: FormData): Promise<Service> => {
        return apiStore.createService(data);
    };

    /**
     * Update an existing service
     */
    updateService = async (id: string, data: FormData): Promise<Service> => {
        return apiStore.updateService(id, data);
    };

    /**
     * Delete a service
     */
    deleteService = async (id: string): Promise<void> => {
        return apiStore.deleteService(id);
    };

    // ==================== Service Package Methods ====================

    /**
     * Get all service packages
     */
    getAllServicePackages = async (): Promise<ServicePackage[]> => {
        return apiStore.getAllServicePackages();
    };

    /**
     * Create a new service package
     */
    createServicePackage = async (data: Omit<ServicePackage, "_id">): Promise<ServicePackage> => {
        return apiStore.createServicePackage(data);
    };

    // ==================== File Upload Methods ====================

    /**
     * Upload an image file to Cloudinary
     * @param file The image file to upload
     * @returns Promise with the uploaded file URL
     */
    uploadImage = async (file: File): Promise<string> => {
        const response = await apiStore.uploadFile(file);
        return response.url; // Extract URL from response
    };
}

export default new ServiceApi();
