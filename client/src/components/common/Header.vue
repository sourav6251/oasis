<template>
  <header
    class="header"
    :class="{ 'header-scrolled': y > 0 }"
  >
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="logo-group">
        <div class="logo-content">
          <img src="/logo.png" alt="Oasis Logo" class="logo-img" />
          <span class="logo-text">Oasis</span>
        </div>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <div class="nav-links">
          <template v-for="link in mainLinks" :key="link.name">
            <router-link
              :to="link.link"
              class="nav-item"
              active-class="nav-item-active"
            >
              {{ link.name }}
              <span class="nav-underline"></span>
            </router-link>
          </template>
          
          <!-- More Dropdown -->
          <!-- <div class="dropdown">
            <button class="dropdown-trigger">
              More <v-icon icon="mdi-chevron-down" size="14" class="dropdown-icon"></v-icon>
            </button>
            
            <div class="dropdown-menu">
               <template v-for="link in secondaryLinks" :key="link.name">
                <router-link
                  :to="link.link"
                  class="dropdown-item"
                  active-class="dropdown-item-active"
                >
                  {{ link.name }}
                </router-link>
              </template>
            </div>
          </div> -->
        </div>
      </nav>

      <!-- Action Area -->
      <div class="action-area">
        <!-- Login Button -->
        <button
          v-if="!authStore.isLoggedIn"
          @click="login"
          class="btn-primary"
        >
          Login
        </button>
        
        <!-- Profile Toggle -->
        <button 
          v-else 
          @click="profileSidebar = true"
          class="profile-toggle"
        >
          <div class="avatar-wrap">
            <div v-if="authStore.userImage" class="avatar-img-box">
              <img :src="authStore.userImage" :alt="authStore.userName" class="avatar-img" />
            </div>
            <div v-else class="avatar-placeholder">
              {{ getInitials(authStore.userName) }}
            </div>
            <div v-if="authStore.isEmailVerified" class="verify-badge">
              <v-icon icon="mdi-check" size="10" color="white"></v-icon>
            </div>
          </div>
          
          <div class="user-meta">
            <span class="user-name">{{ authStore.userName || 'User' }}</span>
            <span class="user-role">Member</span>
          </div>
        </button>

        <!-- Mobile Toggle -->
        <button class="mobile-toggle" @click="drawer = !drawer">
          <div class="hamburger" :class="{ 'is-active': drawer }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Teleport to="body">
      <div
        class="drawer-overlay"
        :class="{ 'is-visible': drawer }"
        @click="drawer = false"
      >
      <div
        class="drawer-content"
        :class="{ 'is-open': drawer }"
        @click.stop
      >
        <div class="drawer-header">
          <span class="drawer-title">Oasis</span>
          <button @click="drawer = false" class="drawer-close">
            <v-icon icon="mdi-close" size="24"></v-icon>
          </button>
        </div>

        <div class="drawer-body">
          <div class="drawer-links">
            <template v-for="link in allLinks" :key="link.name">
              <router-link
                :to="link.link"
                class="drawer-link"
                active-class="drawer-link-active"
                @click="drawer = false"
              >
                {{ link.name.replace('* ', '') }}
              </router-link>
            </template>
          </div>
        </div>

        <div class="drawer-footer">
           <button
              v-if="!authStore.isLoggedIn"
              @click="handleLoginMobile"
              class="btn-primary full-width"
            >
              Login
            </button>
            <div v-else class="drawer-user-info">
              <div class="drawer-profile-card" @click="profileSidebar = true; drawer = false" style="cursor: pointer;">
                <div class="avatar-wrap">
                   <img v-if="authStore.userImage" :src="authStore.userImage" class="avatar-img" />
                   <div v-else class="avatar-placeholder big">{{ getInitials(authStore.userName) }}</div>
                </div>
                <div class="drawer-user-details">
                  <div class="name">{{ authStore.userName }}</div>
                  <div class="email">{{ authStore.userEmail }}</div>
                </div>
              </div>
              
              <button @click="handleLogoutMobile" class="btn-outline full-width">
                Logout
              </button>
            </div>
        </div>
      </div>
    </div>
    </Teleport>

    <!-- Profile Sidebar -->
    <Teleport to="body">
      <div
        class="sidebar-overlay"
        :class="{ 'is-visible': profileSidebar }"
        @click="profileSidebar = false"
      >
      <div
        class="sidebar-content"
        :class="{ 'is-open': profileSidebar }"
        @click.stop
      >
        <div class="sidebar-header">
          <div class="sidebar-user-hero">
            <div class="avatar-container">
              <img v-if="authStore.userImage" :src="authStore.userImage" class="sidebar-avatar" />
              <div v-else class="sidebar-avatar-placeholder">{{ getInitials(authStore.userName) }}</div>
              <div v-if="authStore.isEmailVerified" class="verified-badge-large">
                 <v-icon icon="mdi-check-decagram" size="18" color="#eaa636"></v-icon>
              </div>
            </div>
            <div class="sidebar-user-text">
              <h3 class="sidebar-name">{{ authStore.userName }}</h3>
              <p class="sidebar-email">{{ authStore.userEmail }}</p>
              <router-link v-if="!authStore.isEmailVerified" to="/verify-otp" class="verify-link" @click="profileSidebar = false">
                Verify Email →
              </router-link>
            </div>
          </div>
          <button @click="profileSidebar = false" class="sidebar-close">
            <v-icon icon="mdi-close" size="20"></v-icon>
          </button>
        </div>

        <div class="sidebar-menu">
          <router-link to="/profile" @click="profileSidebar = false" class="menu-item">
            <v-icon icon="mdi-account-outline" size="20" class="menu-icon"></v-icon>
            <span>My Profile</span>
          </router-link>

          <!-- <router-link to="/booking" @click="profileSidebar = false" class="menu-item">
            <v-icon icon="mdi-calendar-check-outline" size="20" class="menu-icon"></v-icon>
            <span>My Bookings</span>
          </router-link> -->

          <div class="menu-divider"></div>

          <button @click="handleSidebarLogout" class="menu-item logout">
            <v-icon icon="mdi-logout" size="20" class="menu-icon"></v-icon>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
    </Teleport>
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

    const allLinksRaw = [
      { name: "Home",        link: "/" },
      { name: "Services",   link: "/service" },
      { name: "Gallery",    link: "/gallery" },
      { name: "Reviews",    link: "/review" },
      // { name: "Booking",    link: "/booking" },
      { name: "Contact",    link: "/contact" },
      { name: "Beauty Tips", link: "/beauty-tips" },
      // { name: "Policies",   link: "/policies" },
      { name: "About Us",   link: "/about" },
    ];

    const mainLinks      = allLinksRaw.slice(0, 7);   // Home → Contact
    const secondaryLinks = allLinksRaw.slice(7);       // Beauty Tips, Policies
    const allLinks       = allLinksRaw;

    const login = () => {
      router.push('/login');
    };

    const logout = async () => {
      await authStore.logout();
      toast.success('Logout Successfully');
      router.push('/');
    };
    
    const handleLoginMobile = () => {
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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@600;700;800&display=swap');

:global(:root) {
  --gold: #eaa636;
  --gold-hover: #d4952b;
  --dark: #1e1916;
  --cream: #fdf5eb;
  --text-main: #1e1916;
  --text-soft: #545454;
  --white: #ffffff;
  --transition: all 0.3s ease;
  --header-height: 70px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: var(--header-height, 70px);
  background: rgba(253, 245, 235, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(234, 166, 54, 0.1);
  transition: var(--transition);
  display: flex;
  align-items: center;
}

.header-scrolled {
  height: 60px;
  background: #fdf5eb;
  box-shadow: 0 10px 30px rgba(30, 25, 22, 0.08);
}

.nav-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo Styles */
.logo-group {
  text-decoration: none;
}

.logo-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  height: 40px;
  width: auto;
  transition: var(--transition);
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e1916;
  transition: var(--transition);
}

.logo-group:hover .logo-text {
  color: #eaa636;
}

/* Desktop Nav Styles */
.desktop-nav {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: block;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-item {
  position: relative;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #545454;
  padding: 8px 0;
  transition: var(--transition);
}

.nav-item:hover, .nav-item-active {
  color: #eaa636;
}

.nav-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #eaa636;
  transition: var(--transition);
}

.nav-item:hover .nav-underline, .nav-item-active .nav-underline {
  width: 100%;
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-trigger {
  background: none;
  border: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #545454;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  transition: var(--transition);
}

.dropdown-trigger:hover {
  color: #eaa636;
}

.dropdown-icon {
  transition: var(--transition);
}

.dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  padding: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: var(--transition);
  border: 1px solid rgba(234, 166, 54, 0.1);
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #545454;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  transition: var(--transition);
}

.dropdown-item:hover, .dropdown-item-active {
  background: #fdf5eb;
  color: #eaa636;
}

/* Action Area */
.action-area {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-primary {
  background: linear-gradient(135deg, #eaa636, #d4952b);
  color: #ffffff;
  padding: 5px 20px;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(234, 166, 54, 0.3);
  transition: var(--transition);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(234, 166, 54, 0.4);
}

.btn-primary.full-width {
  width: 100%;
}

.btn-outline {
  background: transparent;
  color: #eaa636;
  border: 2px solid #eaa636;
  padding: 10px 25px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: var(--transition);
}

.btn-outline:hover {
  background: #eaa636;
  color: #ffffff;
}

.btn-outline.full-width {
  width: 100%;
}

/* User Profile Toggle */
.profile-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
  border-radius: 50px;
  transition: var(--transition);
}

.profile-toggle:hover {
  background: rgba(234, 166, 54, 0.05);
}

.avatar-wrap {
  position: relative;
}

.avatar-img-box {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #eaa636;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-cover: cover;
}

.avatar-placeholder {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #eaa636, #d4952b);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  border: 2px solid white;
  box-shadow: 0 4px 10px rgba(234, 166, 54, 0.2);
}

.avatar-placeholder.big {
  width: 60px;
  height: 60px;
  font-size: 1.4rem;
}

.verify-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: #4caf50;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-meta {
  display: none;
  flex-direction: column;
  text-align: left;
}

@media (min-width: 768px) {
  .user-meta {
    display: flex;
  }
}

.user-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: #1e1916;
}

.user-role {
  font-size: 0.75rem;
  color: #545454;
}

/* Mobile Toggle Hamburger */
.mobile-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: block;
}

@media (min-width: 1024px) {
  .mobile-toggle {
    display: none;
  }
}

.hamburger {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #1e1916;
  border-radius: 2px;
  transition: var(--transition);
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}
.hamburger.is-active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Drawer Overlay & Content */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.drawer-overlay.is-visible {
  opacity: 1;
  visibility: visible;
}

.drawer-content {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 85%;
  max-width: 350px;
  background: #ffffff;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-content.is-open {
  transform: translateX(0);
}

.drawer-header {
  padding: 24px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e1916;
}

.drawer-close {
  background: none;
  border: none;
  color: #545454;
  cursor: pointer;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 10px;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer-link {
  padding: 14px 20px;
  text-decoration: none;
  color: #545454;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 12px;
  transition: var(--transition);
}

.drawer-link:hover, .drawer-link-active {
  background: #fdf5eb;
  color: #eaa636;
}

.drawer-footer {
  padding: 24px;
  border-top: 1px solid #f5f5f5;
}

.drawer-profile-card {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #fdf5eb;
  border-radius: 16px;
}

.drawer-user-details .name {
  font-weight: 700;
  color: #1e1916;
}

.drawer-user-details .email {
  font-size: 0.8rem;
  color: #545454;
}

/* Sidebar Profile */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2100;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.sidebar-overlay.is-visible {
  opacity: 1;
  visibility: visible;
}

.sidebar-content {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 90%;
  max-width: 400px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar-content.is-open {
  transform: translateX(0);
}

.sidebar-header {
  position: relative;
  background: linear-gradient(135deg, #1e1916, #3a2e28);
  padding: 60px 30px 40px;
  color: white;
}

.sidebar-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.sidebar-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-user-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
}

.avatar-container {
  position: relative;
}

.sidebar-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid #eaa636;
  object-fit: cover;
}

.sidebar-avatar-placeholder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
  color: #eaa636;
  font-size: 2.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #eaa636;
}

.verified-badge-large {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.sidebar-name {
  font-size: 1.4rem;
  font-family: 'Playfair Display', serif;
  margin: 0;
}

.sidebar-email {
  font-size: 0.9rem;
  opacity: 0.7;
}

.verify-link {
  color: #eaa636;
  font-size: 0.8rem;
  text-decoration: underline;
  margin-top: 5px;
  display: inline-block;
}

.sidebar-menu {
  flex: 1;
  padding: 30px 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  text-decoration: none;
  color: #1e1916;
  font-weight: 600;
  border-radius: 12px;
  transition: var(--transition);
  margin-bottom: 5px;
}

.menu-item:hover {
  background: #fdf5eb;
  color: #eaa636;
}

.menu-item.logout {
  color: #ff5252;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-item.logout:hover {
  background: #fff5f5;
}

.menu-icon {
  opacity: 0.7;
}

.menu-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 15px 20px;
}
</style>