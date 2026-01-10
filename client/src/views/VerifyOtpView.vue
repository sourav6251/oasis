<template>
  <div class="min-h-screen flex items-center justify-center bg-[#fdf5eb] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white py-10 px-12 rounded-2xl shadow-2xl border border-[#eaa636]/20">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-[#eaa636] to-[#d4952b] rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h2 class="text-4xl font-extrabold text-[#1e1916]">Verify Your Email</h2>
        <p class="mt-2 text-sm text-[#545454]">We sent a code to <span class="font-semibold text-[#eaa636]">{{ email }}</span></p>
      </div>

      <!-- OTP Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleVerifyOtp">
        <!-- OTP Input -->
        <div>
          <label for="otp" class="block text-sm font-medium text-[#1e1916] mb-2 text-center">
            Enter 6-Digit Code
          </label>
          <input
            id="otp"
            v-model="otp"
            type="text"
            required
            maxlength="6"
            pattern="[0-9]{6}"
            class="appearance-none relative block w-full px-4 py-4 border-2 border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eaa636] focus:border-[#eaa636] transition text-center text-2xl font-bold tracking-widest"
            placeholder="000000"
          />
          <p class="mt-2 text-xs text-center text-gray-500">Check your email inbox for the verification code</p>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          {{ success }}
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ error }}
        </div>

        <!-- Verify Button -->
        <div>
          <button
            type="submit"
            :disabled="loading || otp.length !== 6"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-[#eaa636] to-[#d4952b] hover:from-[#d4952b] hover:to-[#c48726] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#eaa636] transition-all duration-300 shadow-lg shadow-[#eaa636]/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!loading">Verify Email</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          </button>
        </div>

        <!-- Resend Code -->
        <div class="text-center text-sm">
          <span class="text-[#545454]">Didn't receive the code? </span>
          <button
            type="button"
            @click="handleResendOtp"
            :disabled="resendLoading || resendCooldown > 0"
            class="font-medium text-[#eaa636] hover:text-[#d4952b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
          </button>
        </div>

        <!-- Skip for now -->
        <div class="text-center text-sm">
          <router-link to="/" class="font-medium text-gray-500 hover:text-gray-700 transition-colors">
            I'll verify later
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import axiosInstance from '@/api/apiInstance'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref(route.query.email as string || authStore.userEmail)
const otp = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
const resendLoading = ref(false)
const resendCooldown = ref(0)

// Redirect if no email
onMounted(() => {
  if (!email.value) {
    router.push('/login')
  }
})

const handleVerifyOtp = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await axiosInstance.post('/auth/verify-otp', {
      email: email.value,
      otp: otp.value
    })

    success.value = response.data.message || 'Email verified successfully!'
    
    // Update user verification status in store
    if (authStore.user) {
      authStore.user.isEmailVerified = true
    }

    // Redirect to home after 1.5 seconds
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Verification failed. Please try again.'
    console.error('OTP verification error:', err)
  } finally {
    loading.value = false
  }
}

const handleResendOtp = async () => {
  resendLoading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await axiosInstance.post('/auth/resend-otp', null, {
      params: { email: email.value }
    })

    success.value = response.data.message || 'Code resent successfully!'
    
    // Start 60 second cooldown
    resendCooldown.value = 60
    const interval = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(interval)
      }
    }, 1000)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to resend code.'
    console.error('Resend OTP error:', err)
  } finally {
    resendLoading.value = false
  }
}
</script>
