import apiStore from "./apiStore";
import type { GalleryWork, GalleryCategory } from "@/types/Gallery";

/**
 * Gallery API - Delegates to centralized apiStore
 * This wrapper maintains backward compatibility while using apiStore internally
 */
class GalleryApi {
    // ==================== Gallery Category Methods ====================

    /**
     * Get all gallery categories
     */
    getAllGalleryCategories = async (): Promise<GalleryCategory[]> => {
        return apiStore.getAllGalleryCategories();
    };

    /**
     * Get a single gallery category by ID
     */
    getGalleryCategoryById = async (id: number): Promise<GalleryCategory> => {
        return apiStore.getGalleryCategoryById(id);
    };

    /**
     * Create a new gallery category
     */
    createGalleryCategory = async (data: Omit<GalleryCategory, "id">): Promise<GalleryCategory> => {
        return apiStore.createGalleryCategory(data);
    };

    /**
     * Update an existing gallery category
     */
    updateGalleryCategory = async (id: number, data: Omit<GalleryCategory, "id">): Promise<GalleryCategory> => {
        return apiStore.updateGalleryCategory(id, data);
    };

    /**
     * Delete a gallery category
     */
    deleteGalleryCategory = async (id: number): Promise<void> => {
        return apiStore.deleteGalleryCategory(id);
    };

    // ==================== Gallery Work Methods ====================

    /**
     * Get all gallery works
     */
    getAllGalleryWorks = async (): Promise<GalleryWork[]> => {
        return apiStore.getAllGalleries();
    };

    /**
     * Get a single gallery work by ID
     */
    getGalleryWorkById = async (id: number): Promise<GalleryWork> => {
        return apiStore.getGalleryById(id);
    };

    /**
     * Create a new gallery work
     */
    createGalleryWork = async (data: Omit<GalleryWork, "id">): Promise<GalleryWork> => {
        return apiStore.createGallery(data);
    };

    /**
     * Update an existing gallery work
     */
    updateGalleryWork = async (id: number, data: Omit<GalleryWork, "id">): Promise<GalleryWork> => {
        return apiStore.updateGallery(id, data);
    };

    /**
     * Delete a gallery work
     */
    deleteGalleryWork = async (id: number): Promise<void> => {
        return apiStore.deleteGallery(id);
    };

    /**
     * Upload an image file
     */
    uploadImage = async (file: File): Promise<string> => {
        const response = await apiStore.uploadFile(file);
        return response.url; // Extract URL from response
    };
}

export default new GalleryApi();
