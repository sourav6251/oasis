<template>
  <div class="min-h-screen bg-[#fdf5eb] py-8 px-4">
    <div class="max-w-4xl mx-auto flex gap-6 flex-col">
      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="h-32 bg-gradient-to-r from-[#eaa636] to-[#d4952b]"></div>
        <div class="px-8 pb-8">
          <div class="flex items-end gap-6 -mt-16">
            <!-- Profile Image -->
            <div v-if="authStore.userImage" class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img :src="authStore.userImage" :alt="authStore.userName" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center text-[#eaa636] font-bold text-5xl">
              {{ getInitials(authStore.userName) }}
            </div>
            
            <!-- User Info -->
            <div class="flex-1 mt-8">
              <div class="flex items-center gap-3">
                <h1 class="text-3xl font-bold text-[#1e1916]">{{ authStore.userName }}</h1>
                <div v-if="authStore.isEmailVerified" class="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Verified
                </div>
              </div>
              <p class="text-[#545454] mt-1">{{ authStore.userEmail }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Details Grid -->
      <div class="grid md:grid-cols-2 gap-8 ">
        <!-- Personal Information -->
        <div class="bg-white rounded-2xl shadow-lg px-6 py-6">
          <h2 class="text-xl font-bold text-[#1e1916] mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-[#eaa636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-[#545454]">Full Name</label>
              <p class="text-[#1e1916] font-medium mt-1">{{ authStore.userName || 'Not set' }}</p>
            </div>
            
            <div>
              <label class="text-sm font-medium text-[#545454]">Email Address</label>
              <p class="text-[#1e1916] font-medium mt-1">{{ authStore.userEmail || 'Not set' }}</p>
            </div>
            
            <div>
              <label class="text-sm font-medium text-[#545454]">User ID</label>
              <p class="text-[#1e1916] font-mono text-sm mt-1 bg-gray-50 px-3 py-2 rounded">{{ authStore.user?.userId || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Account Status -->
        <div class="bg-white rounded-2xl shadow-lg px-6 py-6">
          <h2 class="text-xl font-bold text-[#1e1916] mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-[#eaa636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Account Status
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium text-[#545454]">Email Verification</span>
              <span v-if="authStore.isEmailVerified" class="flex items-center gap-1 text-green-600 font-medium text-sm">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Verified
              </span>
              <router-link v-else to="/verify-otp" class="text-[#eaa636] hover:text-[#d4952b] font-medium text-sm">
                Verify Now →
              </router-link>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium text-[#545454]">Account Type</span>
              <span class="text-[#1e1916] font-medium text-sm">{{ authStore.user?.userType || 'USER' }}</span>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium text-[#545454]">Member Since</span>
              <span class="text-[#1e1916] font-medium text-sm">{{ formatDate(authStore.user?.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-2xl shadow-lg px-6 py-6">
        <h2 class="text-xl font-bold text-[#1e1916] mb-4">Quick Actions</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link
            to="/booking"
            class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#eaa636] hover:bg-[#fdf5eb] transition-colors"
          >
            <svg class="w-6 h-6 text-[#eaa636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div class="font-medium text-[#1e1916]">My Bookings</div>
              <div class="text-xs text-[#545454]">View appointments</div>
            </div>
          </router-link>
          
          <button
            @click="handleLogout"
            class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
          >
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <div>
              <div class="font-medium text-red-600">Logout</div>
              <div class="text-xs text-[#545454]">Sign out</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const authStore = useAuthStore()
const router = useRouter()

const getInitials = (name: string): string => {
  if (!name) return 'U'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const handleLogout = async () => {
  await authStore.logout()
  toast.success('Logged out successfully')
  router.push('/')
}
</script>
