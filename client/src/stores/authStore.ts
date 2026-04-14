import { defineStore } from 'pinia'
import type { UserProfile } from '@/api/authApi'
import * as authApi from '@/api/authApi'

interface AuthState {
    isAuthenticated: boolean
    user: UserProfile | null
    loading: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        user: null,
        loading: false
    }),

    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        currentUser: (state) => state.user,
        userEmail: (state) => state.user?.email || '',
        userName: (state) => state.user?.fullName || '',
        userImage: (state) => state.user?.profileImageUrl || '',
        isEmailVerified: (state) => state.user?.isEmailVerified || false
    },

    actions: {
        /**
         * Register new user
         */
        async register(data: { email: string; password: string; fullName: string; mobileNumber?: string }) {
            this.loading = true
            try {
                const response = await authApi.register(data)

                // Set basic user info from registration response
                // Don't fetch profile yet - user needs to verify email first
                this.user = {
                    userId: response.userId,
                    email: response.email,
                    fullName: response.fullName,
                    isEmailVerified: response.emailVerified,
                    isMobileVerified: false,
                    userType: 'USER',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } as any
                this.isAuthenticated = true

                return response
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Login user
         */
        async login(data: { email: string; password: string }) {
            this.loading = true
            try {
                const response = await authApi.login(data)

                // Set user info from login response
                // Don't fetch profile - use data from login response
                this.user = {
                    userId: response.userId,
                    email: response.email,
                    fullName: response.fullName,
                    isEmailVerified: response.emailVerified,
                    isMobileVerified: false,
                    userType: 'USER',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } as any
                this.isAuthenticated = true

                return response
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch current user profile
         */
        async fetchProfile() {
            this.loading = true
            try {
                const profile = await authApi.getProfile()
                this.user = profile
                this.isAuthenticated = true
            } catch (error) {
                // If fetch fails, user is not authenticated
                this.isAuthenticated = false
                this.user = null
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Logout user
         */
        async logout() {
            try {
                await authApi.logout()
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                // Clear state regardless of API call result
                this.isAuthenticated = false
                this.user = null
            }
        },

        /**
         * Check if user is authenticated (on app load)
         * This runs when the app starts - don't fetch profile here
         * Just check if we have persisted auth state
         */
        async checkAuth() {
            // If we have a user and isAuthenticated from persisted state, we're good
            // Don't try to fetch profile because that requires the user to already exist
            // The cookie-based auth will handle authentication automatically
            if (this.user && this.isAuthenticated) {
                console.log('User already authenticated from persisted state')
            }
        }
    },

    persist: true
})
