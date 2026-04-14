import axiosInstance from './apiInstance'

export interface RegisterRequest {
    email: string
    password: string
    fullName: string
    mobileNumber?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    token: string
    userId: string
    email: string
    fullName: string
    emailVerified: boolean
    message: string
}

export interface UserProfile {
    userId: string
    email: string
    fullName: string
    mobileNumber?: string
    dateOfBirth?: string
    profileImageUrl?: string
    userType: string
    isEmailVerified: boolean
    isMobileVerified: boolean
    createdAt: string
    updatedAt: string
}

/**
 * Register a new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data)
    return response.data
}

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data)
    return response.data
}

/**
 * Get current user profile
 */
export const getProfile = async (): Promise<UserProfile> => {
    const response = await axiosInstance.get<UserProfile>('/api/user/profile')
    return response.data
}

/**
 * Logout user (optional - can just clear frontend state and cookies)
 */
export const logout = async (): Promise<void> => {
    // If you have a backend logout endpoint:
    // await axiosInstance.post('/auth/logout')

    // For now, we'll just clear the cookie by setting it to expired
    document.cookie = 'AccessToken=; Max-Age=0; path=/;'
}
