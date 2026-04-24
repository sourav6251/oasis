<template>
  <div class="min-h-screen flex items-center justify-center bg-[#fdf5eb] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white py-10 px-12 rounded-2xl shadow-2xl border border-[#eaa636]/20">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-[#eaa636] to-[#d4952b] rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <h2 class="text-4xl font-extrabold text-[#1e1916]">Welcome Back</h2>
        <p class="mt-2 text-sm text-[#545454]">Sign in to your account</p>
      </div>

      <!-- Login Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-5">
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
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eaa636] focus:border-[#eaa636] transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <!-- Login Button -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex items-center justify-center gap-3 py-4 px-6 text-base font-bold rounded-xl text-white bg-gradient-to-r from-[#eaa636] via-[#d4952b] to-[#c48726] hover:from-[#d4952b] hover:via-[#c48726] hover:to-[#b37b1f] focus:outline-none focus:ring-4 focus:ring-[#eaa636]/30 transition-all duration-300 shadow-lg shadow-[#eaa636]/40 hover:shadow-xl hover:shadow-[#eaa636]/50 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
          >
            <!-- Loading Spinner -->
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            
            <!-- Login Icon -->
            <svg
              v-else
              class="w-5 h-5 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            
            <span class="font-extrabold tracking-wide">{{ loading ? 'Signing In...' : 'Sign In' }}</span>
            
            <!-- Arrow Icon -->
            <svg
              v-if="!loading"
              class="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <!-- Register Link -->
        <div class="text-center text-sm">
          <span class="text-[#545454]">Don't have an account? </span>
          <router-link to="/register" class="font-medium text-[#eaa636] hover:text-[#d4952b] transition-colors">
            Sign up
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
import { toast } from 'vue-sonner'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await authStore.login({
      email: email.value,
      password: password.value
    })

    if (response.requiresOtp !== false) {
      toast.success(response.message || 'OTP sent to your email. Please verify to complete login.')
      // Redirect to OTP verification page after successful login
      router.push({ name: 'verify-otp', query: { email: email.value } })
    } else {
      toast.success(response.message || 'Logged in successfully.')
      // Redirect to home or dashboard
      router.push('/')
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed. Please try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>
