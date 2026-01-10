import axiosInstance from "./apiInstance";

/**
 * Centralized API Store for all backend API calls
 * Backend Base URL: http://localhost:5002/api
 */
class ApiStore {

    // ============================================
    // TEST API
    // ============================================

    /**
     * Test API connection
     * GET /test
     */
    test = async () => {
        try {
            const response = await axiosInstance.get("/test");
            return response.data;
        } catch (error) {
            console.error("Error in API Store test method:", error);
            throw error;
        }
    }

    // ============================================
    // BOOKING APIs
    // ============================================

    /**
     * Get all bookings
     * GET /api/bookings
     */
    getAllBookings = async () => {
        try {
            const response = await axiosInstance.get("/bookings");
            return response.data;
        } catch (error) {
            console.error("Error fetching bookings:", error);
            throw error;
        }
    }

    /**
     * Get booking by ID
     * GET /api/bookings/{id}
     */
    getBookingById = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/bookings/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching booking ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create new booking
     * POST /api/bookings
     */
    createBooking = async (booking: any) => {
        try {
            const response = await axiosInstance.post("/bookings", booking);
            return response.data;
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error;
        }
    }

    // ============================================
    // SERVICE APIs
    // ============================================

    /**
     * Get all services
     * GET /api/services
     */
    getAllServices = async () => {
        try {
            const response = await axiosInstance.get("/api/services");
            return response.data;
        } catch (error) {
            console.error("Error fetching services:", error);
            throw error;
        }
    }

    /**
     * Get service by ID
     * GET /api/services/{id}
     */
    getServiceById = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/api/services/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create new service
     * POST /api/services
     */
    createService = async (service: any) => {
        try {
            const response = await axiosInstance.post("/api/services", service);
            return response.data;
        } catch (error) {
            console.error("Error creating service:", error);
            throw error;
        }
    }

    /**
     * Update service
     * PUT /api/services/{id}
     */
    updateService = async (id: number, service: any) => {
        try {
            const response = await axiosInstance.put(`/api/services/${id}`, service);
            return response.data;
        } catch (error) {
            console.error(`Error updating service ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete service
     * DELETE /api/services/{id}
     */
    deleteService = async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/api/services/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting service ${id}:`, error);
            throw error;
        }
    }

    /**
     * Get services by category
     * GET /api/services/category/{categoryId}
     */
    getServicesByCategory = async (categoryId: number) => {
        try {
            const response = await axiosInstance.get(`/api/services/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching services for category ${categoryId}:`, error);
            throw error;
        }
    }

    /**
     * Get all service packages
     * GET /api/service-packages
     */
    getAllServicePackages = async () => {
        try {
            const response = await axiosInstance.get("/service-packages");
            return response.data;
        } catch (error) {
            console.error("Error fetching service packages:", error);
            throw error;
        }
    }

    /**
     * Create service package
     * POST /api/service-packages
     */
    createServicePackage = async (servicePackage: any) => {
        try {
            const response = await axiosInstance.post("/service-packages", servicePackage);
            return response.data;
        } catch (error) {
            console.error("Error creating service package:", error);
            throw error;
        }
    }

    // ============================================
    // SERVICE CATEGORY APIs
    // ============================================

    /**
     * Get all service categories
     * GET /api/service-categories
     */
    getAllServiceCategories = async () => {
        try {
            const response = await axiosInstance.get("/api/service-categories");
            return response.data;
        } catch (error) {
            console.error("Error fetching service categories:", error);
            throw error;
        }
    }

    /**
     * Get service category by ID
     * GET /api/service-categories/{id}
     */
    getServiceCategoryById = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/api/service-categories/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service category ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create service category
     * POST /api/service-categories
     */
    createServiceCategory = async (category: any) => {
        try {
            const response = await axiosInstance.post("/api/service-categories", category);
            return response.data;
        } catch (error) {
            console.error("Error creating service category:", error);
            throw error;
        }
    }

    /**
     * Update service category
     * PUT /api/service-categories/{id}
     */
    updateServiceCategory = async (id: number, category: any) => {
        try {
            const response = await axiosInstance.put(`/api/service-categories/${id}`, category);
            return response.data;
        } catch (error) {
            console.error(`Error updating service category ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete service category
     * DELETE /api/service-categories/{id}
     */
    deleteServiceCategory = async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/service-categories/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting service category ${id}:`, error);
            throw error;
        }
    }

    // ============================================
    // GALLERY APIs
    // ============================================

    /**
     * Get all galleries
     * GET /api/galleries
     */
    getAllGalleries = async () => {
        try {
            const response = await axiosInstance.get("/api/gallery");
            return response.data;
        } catch (error) {
            console.error("Error fetching galleries:", error);
            throw error;
        }
    }

    /**
     * Get gallery by ID
     * GET /api/galleries/{id}
     */
    getGalleryById = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/api/gallery/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching gallery ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create gallery
     * POST /api/galleries
     */
    createGallery = async (gallery: any) => {
        try {
            const response = await axiosInstance.post("/api/gallery", gallery);
            return response.data;
        } catch (error) {
            console.error("Error creating gallery:", error);
            throw error;
        }
    }

    /**
     * Update gallery
     * PUT /api/galleries/{id}
     */
    updateGallery = async (id: number, gallery: any) => {
        try {
            const response = await axiosInstance.put(`/api/gallery/${id}`, gallery);
            return response.data;
        } catch (error) {
            console.error(`Error updating gallery ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete gallery
     * DELETE /api/galleries/{id}
     */
    deleteGallery = async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/api/gallery/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting gallery ${id}:`, error);
            throw error;
        }
    }

    // ============================================
    // GALLERY CATEGORY APIs
    // ============================================

    /**
     * Get all gallery categories
     * GET /api/gallery-categories
     */
    getAllGalleryCategories = async () => {
        try {
            const response = await axiosInstance.get("/api/gallery-categories");
            return response.data;
        } catch (error) {
            console.error("Error fetching gallery categories:", error);
            throw error;
        }
    }

    /**
     * Get gallery category by ID
     * GET /api/gallery-categories/{id}
     */
    getGalleryCategoryById = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/api/gallery-categories/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching gallery category ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create gallery category
     * POST /api/gallery-categories
     */
    createGalleryCategory = async (category: any) => {
        try {
            const response = await axiosInstance.post("/api/gallery-categories", category);
            return response.data;
        } catch (error) {
            console.error("Error creating gallery category:", error);
            throw error;
        }
    }

    /**
     * Update gallery category
     * PUT /api/gallery-categories/{id}
     */
    updateGalleryCategory = async (id: number, category: any) => {
        try {
            const response = await axiosInstance.put(`/api/gallery-categories/${id}`, category);
            return response.data;
        } catch (error) {
            console.error(`Error updating gallery category ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete gallery category
     * DELETE /api/gallery-categories/{id}
     */
    deleteGalleryCategory = async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/api/gallery-categories/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting gallery category ${id}:`, error);
            throw error;
        }
    }

    // ============================================
    // BLOG APIs
    // ============================================

    /**
     * Get all blogs
     * GET /api/blogs
     */
    getAllBlogs = async () => {
        try {
            const response = await axiosInstance.get("/blogs");
            return response.data;
        } catch (error) {
            console.error("Error fetching blogs:", error);
            throw error;
        }
    }

    /**
     * Get blog by ID
     * GET /api/blogs/{id}
     */
    getBlogById = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/blogs/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching blog ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create blog
     * POST /api/blogs
     */
    createBlog = async (blog: any) => {
        try {
            const response = await axiosInstance.post("/blogs", blog);
            return response.data;
        } catch (error) {
            console.error("Error creating blog:", error);
            throw error;
        }
    }

    // ============================================
    // REVIEW APIs
    // ============================================

    /**
     * Get all reviews
     * GET /api/reviews
     */
    getAllReviews = async () => {
        try {
            const response = await axiosInstance.get("/reviews");
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw error;
        }
    }

    /**
     * Create review
     * POST /api/reviews
     */
    createReview = async (review: any) => {
        try {
            const response = await axiosInstance.post("/reviews", review);
            return response.data;
        } catch (error) {
            console.error("Error creating review:", error);
            throw error;
        }
    }

    // ============================================
    // FILE UPLOAD APIs
    // ============================================

    /**
     * Upload file to Cloudinary
     * POST /api/upload
     */
    uploadFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axiosInstance.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    /**
     * Delete file from Cloudinary
     * DELETE /api/upload/{publicId}
     */
    deleteFile = async (publicId: string) => {
        try {
            const response = await axiosInstance.delete(`/upload/${publicId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting file ${publicId}:`, error);
            throw error;
        }
    }

    /**
     * Upload image to ImageKit
     * POST /api/images/upload
     */
    uploadImage = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axiosInstance.post("/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }

    // ============================================
    // AUTH APIs (To be implemented)
    // ============================================

    /**
     * Login with email and password
     * POST /auth/login
     * NOTE: Backend endpoint not yet implemented
     */
    login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await axiosInstance.post("/auth/login", credentials);

            // Save token to localStorage
            if (response.data.token) {
                localStorage.setItem("accessToken", response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    /**
     * Register new user
     * POST /auth/register
     * NOTE: Backend endpoint not yet implemented
     */
    register = async (userData: { email: string; password: string; fullName: string }) => {
        try {
            const response = await axiosInstance.post("/auth/register", userData);

            // Save token to localStorage
            if (response.data.token) {
                localStorage.setItem("accessToken", response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error("Error registering:", error);
            throw error;
        }
    }

    /**
     * Logout current user
     * POST /auth/logout
     * NOTE: Backend endpoint not yet implemented
     */
    logout = async () => {
        try {
            localStorage.removeItem("accessToken");
            const response = await axiosInstance.post("/auth/logout");
            return response.data;
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

    /**
     * Get current authenticated user
     * GET /auth/me
     * NOTE: Backend endpoint not yet implemented
     */
    getCurrentUser = async () => {
        try {
            const response = await axiosInstance.get("/auth/me");
            return response.data;
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    }

    /**
     * Refresh JWT token
     * POST /auth/refresh
     * NOTE: Backend endpoint not yet implemented
     */
    refreshToken = async () => {
        try {
            const response = await axiosInstance.post("/auth/refresh");
            if (response.data.token) {
                localStorage.setItem("accessToken", response.data.token);
            }
            return response.data.token;
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    }

    // ============================================
    // USER APIs (To be implemented)
    // ============================================

    /**
     * Get user profile
     * GET /api/users/{id}
     * NOTE: Backend endpoint not yet fully implemented
     */
    getUserProfile = async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user profile ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Update user profile
     * PUT /api/users/{id}
     * NOTE: Backend endpoint not yet implemented
     */
    updateUserProfile = async (userId: string, userData: any) => {
        try {
            const response = await axiosInstance.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error(`Error updating user profile ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Change password
     * POST /api/users/{id}/change-password
     * NOTE: Backend endpoint not yet implemented
     */
    changePassword = async (userId: string, passwords: { oldPassword: string; newPassword: string }) => {
        try {
            const response = await axiosInstance.post(`/users/${userId}/change-password`, passwords);
            return response.data;
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    }

    /**
     * Upload profile picture
     * POST /api/users/{id}/profile-picture
     * NOTE: Backend endpoint not yet implemented
     */
    uploadProfilePicture = async (userId: string, file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axiosInstance.post(`/users/${userId}/profile-picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            throw error;
        }
    }
}

export default new ApiStore();