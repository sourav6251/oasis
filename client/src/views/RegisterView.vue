<template>
  <div class="min-h-screen flex items-center justify-center bg-[#fdf5eb] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white py-10 px-12 rounded-2xl shadow-2xl border border-[#eaa636]/20">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-[#eaa636] to-[#d4952b] rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
        <h2 class="text-4xl font-extrabold text-[#1e1916]">Create Account</h2>
        <p class="mt-2 text-sm text-[#545454]">Join us today</p>
      </div>

      <!-- Register Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-5">
          <!-- Full Name Input -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-[#1e1916] mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              v-model="fullName"
              type="text"
              required
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eaa636] focus:border-[#eaa636] transition"
              placeholder="John Doe"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-[#1e1916] mb-1">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eaa636] focus:border-[#eaa636] transition"
              placeholder="you@example.com"
            />
          </div>

          <!-- Mobile Number Input (Optional) -->
          <div>
            <label for="mobile" class="block text-sm font-medium text-[#1e1916] mb-1">
              Mobile Number <span class="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              id="mobile"
              v-model="mobileNumber"
              type="tel"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eaa636] focus:border-[#eaa636] transition"
              placeholder="+1234567890"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-[#1e1916] mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="6"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eaa636] focus:border-[#eaa636] transition"
              placeholder="••••••••"
            />
            <p class="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
          </div>
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

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-[#eaa636] to-[#d4952b] hover:from-[#d4952b] hover:to-[#c48726] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#eaa636] transition-all duration-300 shadow-lg shadow-[#eaa636]/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!loading">Create Account</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center text-sm">
          <span class="text-[#545454]">Already have an account? </span>
          <router-link to="/login" class="font-medium text-[#eaa636] hover:text-[#d4952b] transition-colors">
            Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const mobileNumber = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await authStore.register({
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      mobileNumber: mobileNumber.value || undefined
    })

    success.value = response.message || 'Registration successful!'
    
    // Redirect to OTP verification page
    setTimeout(() => {
      router.push({ name: 'verify-otp', query: { email: email.value } })
    }, 1500)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
    console.error('Registration error:', err)
  } finally {
    loading.value = false
  }
}
</script>
