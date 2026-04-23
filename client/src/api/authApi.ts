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

export interface UpdateProfileRequest {
    email?: string
    fullName?: string
}

export interface AuthResponse {
    token?: string
    userId?: string
    _id?: string
    email?: string
    fullName?: string
    username?: string
    emailVerified?: boolean
    isVerified?: boolean
    image?: string
    role?: string
    message?: string
    requiresOtp?: boolean
}

export interface VerifyOtpRequest {
    email: string
    otp: string
}

export interface VerifyOtpResponse {
    message: string
    _id: string
    email: string
    fullName: string
    username: string
    role: string
    image: string
    isVerified: boolean
    token: string
}

export interface UserProfile {
    userId: string
    email: string
    fullName: string
    username: string
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
 * Verify OTP
 */
export const verifyOtp = async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await axiosInstance.post<VerifyOtpResponse>('/auth/verify-otp', data)
    return response.data
}

/**
 * Get current user profile
 */
export const getProfile = async (): Promise<UserProfile> => {
    const response = await axiosInstance.get<UserProfile>('/auth/profile')
    return response.data
}

/**
 * Upload profile photo
 */
export const uploadProfilePhoto = async (formData: FormData): Promise<{ message: string; image: string }> => {
    const response = await axiosInstance.post<{ message: string; image: string }>('/auth/upload-photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

/**
 * Update user profile
 */
export const updateProfile = async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await axiosInstance.put<UserProfile>('/auth/profile', data)
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
