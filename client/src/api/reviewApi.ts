import axiosInstance from './apiInstance'

export interface ReviewData {
    name: string
    image: string
    rating: number
    text: string
    services: string[]
    date: string
    images?: string[]
}

/**
 * Fetch all reviews
 */
export const getReviews = async (): Promise<ReviewData[]> => {
    const response = await axiosInstance.get<ReviewData[]>('/reviews')
    return response.data
}

/**
 * Create a new review
 */
export const createReview = async (formData: FormData): Promise<ReviewData> => {
    const response = await axiosInstance.post<ReviewData>('/reviews', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}
