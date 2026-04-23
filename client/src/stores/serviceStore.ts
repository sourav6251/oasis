import { defineStore } from 'pinia';
import type { Service, ServiceCategory } from '@/types/Services';
import apiStore from '@/api/apiStore';

export interface ServiceState {
    categories: ServiceCategory[];
    services: Service[];
    loading: boolean;
    error: string | null;
}

export const useServiceStore = defineStore('service', {
    // State
    state: (): ServiceState => ({
        categories: [],
        services: [],
        loading: false,
        error: null,
    }),

    // Getters
    getters: {
        /**
         * Get all service categories
         */
        getAllCategories: (state) => state.categories,

        /**
         * Get all services
         */
        getAllServices: (state) => state.services,

        /**
         * Get services filtered by category ID
         */
        getServicesByCategory: (state) => {
            return (categoryId: string) => {
                return state.services.filter(
                    (service) => service.category._id === categoryId
                );
            };
        },

        /**
         * Get services filtered by category name
         */
        getServicesByCategoryName: (state) => {
            return (categoryName: string) => {
                if (categoryName === 'All') return state.services;
                return state.services.filter(
                    (service) => service.category.name === categoryName
                );
            };
        },

        /**
         * Get category names as string array (for UI dropdown/filter)
         */
        getCategoryNames: (state) => {
            return ['All', ...state.categories.map((cat) => cat.name)];
        },

        /**
         * Check if data is currently loading
         */
        isLoading: (state) => state.loading,

        /**
         * Get current error message
         */
        getError: (state) => state.error,

        /**
         * Check if store has data
         */
        hasData: (state) => state.services.length > 0 && state.categories.length > 0,
    },

    // Actions
    actions: {
        /**
         * Fetch all service categories from API
         */
        async fetchCategories() {
            this.loading = true;
            this.error = null;
            try {
                const categories = await apiStore.getAllServiceCategories();
                this.categories = categories;
            } catch (error) {
                this.error = 'Failed to load service categories. Please try again.';
                console.error('Error fetching categories:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Fetch all services from API
         */
        async fetchServices() {
            this.loading = true;
            this.error = null;
            try {
                const services = await apiStore.getAllServices();
                this.services = services;
            } catch (error) {
                this.error = 'Failed to load services. Please try again.';
                console.error('Error fetching services:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Fetch both categories and services together
         */
        async fetchAllData() {
            // Don't refetch if we already have data (caching)
            if (this.hasData) {
                return;
            }

            this.loading = true;
            this.error = null;
            try {
                // Fetch in parallel for better performance
                const [categories, services] = await Promise.all([
                    apiStore.getAllServiceCategories(),
                    apiStore.getAllServices(),
                ]);
                this.categories = categories;
                this.services = services;
            } catch (error) {
                this.error = 'Failed to load data. Please try again.';
                console.error('Error fetching data:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Force refresh data (bypass cache)
         */
        async refreshData() {
            this.loading = true;
            this.error = null;
            try {
                const [categories, services] = await Promise.all([
                    apiStore.getAllServiceCategories(),
                    apiStore.getAllServices(),
                ]);
                this.categories = categories;
                this.services = services;
            } catch (error) {
                this.error = 'Failed to refresh data. Please try again.';
                console.error('Error refreshing data:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Clear error message
         */
        clearError() {
            this.error = null;
        },

        /**
         * Reset store to initial state
         */
        reset() {
            this.categories = [];
            this.services = [];
            this.loading = false;
            this.error = null;
        },
    },

    // Persist state across page reloads
    persist: true,
});
