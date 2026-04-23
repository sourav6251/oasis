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
        userUsername: (state) => state.user?.username || '',
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
                // Do not set isAuthenticated here. Wait for OTP verification.
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
                
                if (response.requiresOtp === false) {
                    this.user = {
                        userId: response._id || response.userId || '',
                        email: response.email || '',
                        fullName: response.fullName || '',
                        username: response.username || '',
                        isEmailVerified: response.isVerified || false,
                        isMobileVerified: false,
                        profileImageUrl: response.image || '',
                        userType: response.role ? response.role.toUpperCase() : 'USER',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    } as any
                    this.isAuthenticated = true
                    
                    if (response.token) {
                        localStorage.setItem('authToken', response.token)
                        document.cookie = `AccessToken=${response.token}; path=/; max-age=86400;`
                    }
                }
                
                return response
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Verify OTP
         */
        async verifyOtp(data: { email: string; otp: string }) {
            this.loading = true
            try {
                const response = await authApi.verifyOtp(data)
                
                // Now set the user and authentication state
                this.user = {
                    userId: response._id,
                    email: response.email,
                    fullName: response.fullName || '',
                    username: response.username || '',
                    isEmailVerified: response.isVerified,
                    isMobileVerified: false,
                    profileImageUrl: response.image || '',
                    userType: response.role.toUpperCase(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } as any
                this.isAuthenticated = true
                
                // Save token in both localStorage and cookie
                if (response.token) {
                    localStorage.setItem('authToken', response.token)
                    document.cookie = `AccessToken=${response.token}; path=/; max-age=86400;`
                }
                
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
         * Upload profile photo
         */
        async uploadProfilePhoto(file: File) {
            this.loading = true
            try {
                const formData = new FormData()
                formData.append('photo', file)
                const response = await authApi.uploadProfilePhoto(formData)
                
                // Update local user state
                if (this.user) {
                    this.user.profileImageUrl = response.image
                }
                
                return response
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Update user profile
         */
        async updateProfile(data: { email?: string; fullName?: string }) {
            this.loading = true
            try {
                const updatedProfile = await authApi.updateProfile(data)
                this.user = updatedProfile
                return updatedProfile
            } catch (error: any) {
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
                // Clear state and token
                this.isAuthenticated = false
                this.user = null
                localStorage.removeItem('authToken')
                document.cookie = 'AccessToken=; path=/; max-age=0;'
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
