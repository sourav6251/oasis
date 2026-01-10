<template>
  <header
    class="sticky top-0 z-[999] w-full bg-[#fdf5eb]/95 backdrop-blur-sm border-b border-[#eaa636]/20 transition-all duration-300"
    :class="{ 'shadow-md': y > 0 }"
  >
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group">
        <!-- Optional: Add an icon or logo image here if available -->
         <!-- <img src="/logo.png" alt="Oasis Logo" class="h-10 w-auto" /> -->
        <span class="text-3xl flex font-bold font-playfair text-[#1e1916] group-hover:text-[#eaa636] transition-colors duration-300">
         <img src="/logo.png" class="h-10"/>
          Oasis
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-8">
        <template v-for="link in mainLinks" :key="link.name">
          <router-link
            :to="link.link"
            class="text-[#545454] font-medium hover:text-[#eaa636] transition-colors duration-300 font-sans text-base relative group py-2"
            active-class="text-[#eaa636] font-semibold"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#eaa636] transition-all duration-300 group-hover:w-full"></span>
          </router-link>
        </template>
        
        <!-- More Dropdown for secondary links -->
        <div class="relative group">
          <button class="text-[#545454] font-medium hover:text-[#eaa636] transition-colors duration-300 font-sans text-base flex items-center gap-1 py-2">
            More <i class="fas fa-chevron-down text-xs ml-1 transition-transform group-hover:rotate-180"></i>
          </button>
          
          <div class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 border border-[#fdf5eb]">
             <template v-for="link in secondaryLinks" :key="link.name">
              <router-link
                :to="link.link"
                class="block px-4 py-2 text-sm text-[#545454] hover:bg-[#fdf5eb] hover:text-[#eaa636] transition-colors"
                active-class="text-[#eaa636] font-semibold bg-[#fdf5eb]"
              >
                {{ link.name }}
              </router-link>
            </template>
          </div>
        </div>
      </nav>

      <!-- Auth Buttons & Mobile Toggle -->
      <div class="flex items-center gap-4">
        <!-- Login Button (when not logged in) -->
        <button
          v-if="!authStore.isLoggedIn"
          @click="login"
          class="inline-flex items-center justify-center px-6 py-2.5 bg-[#eaa636] text-white font-medium rounded-full hover:bg-[#d4952b] transition-all duration-300 shadow-lg shadow-[#eaa636]/30 transform hover:-translate-y-0.5"
        >
          Login
        </button>
        
        <!-- Profile Button (when logged in) -->
        <button 
          v-else 
          @click="profileSidebar = true"
          class="flex items-center gap-3 p-2 rounded-full hover:bg-[#fdf5eb] transition-colors"
        >
          <!-- User Avatar -->
          <div class="relative">
            <div v-if="authStore.userImage" class="w-10 h-10 rounded-full overflow-hidden border-2 border-[#eaa636]">
              <img :src="authStore.userImage" :alt="authStore.userName" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-[#eaa636] to-[#d4952b] flex items-center justify-center text-white font-bold text-lg border-2 border-[#eaa636]">
              {{ getInitials(authStore.userName) }}
            </div>
            <!-- Verification Badge -->
            <div v-if="authStore.isEmailVerified" class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          
          <!-- User Name (hidden on small screens) -->
          <div class="hidden md:block text-left">
            <div class="text-sm font-bold text-[#1e1916]">{{ authStore.userName || 'User' }}</div>
            <div class="text-xs text-[#545454]">{{ authStore.userEmail }}</div>
          </div>
        </button>


        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden text-[#1e1916] hover:text-[#eaa636] p-2 focus:outline-none"
          @click="drawer = !drawer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      class="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
      :class="drawer ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'"
      @click="drawer = false"
    >
      <div
        class="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#fff] shadow-2xl transform transition-transform duration-300 flex flex-col"
        :class="drawer ? 'translate-x-0' : 'translate-x-full'"
        @click.stop
      >
        <div class="p-5 flex justify-between items-center border-b border-gray-100">
          <span class="text-2xl font-bold font-playfair text-[#1e1916]">Oasis</span>
          <button @click="drawer = false" class="text-gray-500 hover:text-[#eaa636]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto py-4 px-2">
          <div class="flex flex-col gap-1">
            <template v-for="link in allLinks" :key="link.name">
              <router-link
                :to="link.link"
                class="px-4 py-3 text-[#545454] hover:bg-[#fdf5eb] hover:text-[#eaa636] rounded-lg transition-colors font-medium text-lg"
                active-class="text-[#eaa636] bg-[#fdf5eb] font-semibold"
                @click="drawer = false"
              >
                {{ link.name.replace('* ', '') }}
              </router-link>
            </template>
          </div>
        </div>

        <div class="p-5 border-t border-gray-100">
           <button
              v-if="!authStore.isLoggedIn"
              @click="handleLoginMobile"
              class="w-full py-3 bg-[#eaa636] text-white font-bold rounded-lg hover:bg-[#d4952b] transition-colors shadow-lg shadow-[#eaa636]/30"
            >
              Login
            </button>
            <div v-else class="space-y-3">
              <!-- User Info in Mobile -->
              <div class="flex items-center gap-3 p-3 bg-[#fdf5eb] rounded-lg">
                <div v-if="authStore.userImage" class="w-12 h-12 rounded-full overflow-hidden border-2 border-[#eaa636]">
                  <img :src="authStore.userImage" :alt="authStore.userName" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-12 h-12 rounded-full bg-gradient-to-br from-[#eaa636] to-[#d4952b] flex items-center justify-center text-white font-bold text-lg border-2 border-[#eaa636]">
                  {{ getInitials(authStore.userName) }}
                </div>
                <div class="flex-1">
                  <div class="text-sm font-bold text-[#1e1916]">{{ authStore.userName }}</div>
                  <div class="text-xs text-[#545454]">{{ authStore.userEmail }}</div>
                </div>
              </div>
              
              <button
                @click="handleLogoutMobile"
                class="w-full py-3 border-2 border-[#eaa636] text-[#eaa636] font-bold rounded-lg hover:bg-[#eaa636] hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
        </div>
      </div>
    </div>

    <!-- Profile Sidebar -->
    <div
      class="fixed inset-0 z-[1001] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      :class="profileSidebar ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'"
      @click="profileSidebar = false"
    >
      <div
        class="absolute right-0 top-0 h-screen w-[90%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 flex flex-col"
        :class="profileSidebar ? 'translate-x-0' : 'translate-x-full'"
        @click.stop
      >
        <!-- Sidebar Header -->
        <div class="p-6 bg-gradient-to-r from-[#eaa636] to-[#d4952b] text-white">
          <button @click="profileSidebar = false" class="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="flex items-center gap-4 mt-8">
            <div v-if="authStore.userImage" class="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
              <img :src="authStore.userImage" :alt="authStore.userName" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#eaa636] font-bold text-3xl border-4 border-white">
              {{ getInitials(authStore.userName) }}
            </div>
            
            <div class="flex-1">
              <h3 class="text-xl font-bold">{{ authStore.userName }}</h3>
              <p class="text-sm opacity-90">{{ authStore.userEmail }}</p>
              <div v-if="authStore.isEmailVerified" class="mt-1 flex items-center gap-1 text-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Verified
              </div>
              <router-link v-else to="/verify-otp" class="mt-1 text-xs underline hover:no-underline" @click="profileSidebar = false">
                Verify Email →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <div class="flex-1 overflow-y-auto py-4">
          <router-link
            to="/profile"
            @click="profileSidebar = false"
            class="flex items-center gap-3 px-6 py-3 text-[#545454] hover:bg-[#fdf5eb] hover:text-[#eaa636] transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="font-medium">My Profile</span>
          </router-link>

          <router-link
            to="/booking"
            @click="profileSidebar = false"
            class="flex items-center gap-3 px-6 py-3 text-[#545454] hover:bg-[#fdf5eb] hover:text-[#eaa636] transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-medium">My Bookings</span>
          </router-link>

          <div class="border-t border-gray-200 my-2"></div>

          <button
            @click="handleSidebarLogout"
            class="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { useWindowScroll } from '@vueuse/core'

export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const drawer = ref(false);
    const profileSidebar = ref(false);
    const { y } = useWindowScroll()

    // Organize links
    const allLinksRaw = [
      { name: "Home", link: "/" },
      { name: "About Us", link: "/about" },
      { name: "Services", link: "/service" },
      { name: "Gallery", link: "/gallery" },
      { name: "Booking", link: "/booking" },
      { name: "Contact", link: "/contact" },
      { name: "Beauty Tips", link: "/beauty-tips" },
      { name: "Reviews", link: "/review" },
      { name: "Policies", link: "/policies" }
    ];

    // Priority links for desktop navbar
    const mainLinks = allLinksRaw.slice(0, 6);
    // Secondary links for dropdown
    const secondaryLinks = allLinksRaw.slice(6);
    
    // All links for mobile
    const allLinks = allLinksRaw;

    const login = () => {
      // Navigate to login page
      router.push('/login');
    };

    const logout = async () => {
      await authStore.logout();
      toast.success('Logout Successfully');
      router.push('/');
    };
    
    const handleLoginMobile = () => {
        // Navigate to login page and close drawer
        router.push('/login');
        drawer.value = false;
    }
    
    const handleLogoutMobile = () => {
        logout();
        drawer.value = false;
    }
    
    const handleSidebarLogout = () => {
        logout();
        profileSidebar.value = false;
    }
    
    const getInitials = (name: string): string => {
      if (!name) return 'U';
      const parts = name.split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };

    return {
      authStore,
      login,
      logout,
      handleLoginMobile,
      handleLogoutMobile,
      handleSidebarLogout,
      router,
      mainLinks,
      secondaryLinks,
      allLinks,
      drawer,
      profileSidebar,
      y,
      getInitials
    };
  }
});
</script>

<style scoped>
.font-playfair {
  font-family: 'Playfair Display', serif;
}
.font-sans {
  font-family: 'Open Sans', sans-serif;
}
</style>