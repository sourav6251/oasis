import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ServicesView from '@/views/ServicesView.vue'
import BookingView from '@/views/BookingView.vue'
import GalleryView from '@/views/GalleryView.vue'
import BeautyView from '@/views/BeautyView.vue'
import ContactView from '@/views/ContactView.vue'
import ReviewsView from '@/views/ReviewsView.vue'
import PoliciesView from '@/views/PoliciesView.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true }
    },
    {
      path: '/verify-otp',
      name: 'verify-otp',
      component: () => import('@/views/VerifyOtpView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/service',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView,
      meta: { requiresAuth: true }
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: GalleryView,
    },
    {
      path: '/beauty-tips',
      name: 'Beauty',
      component: BeautyView,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView,
    },
    {
      path: '/review',
      name: 'Reviews',
      component: ReviewsView,
    },
    {
      path: '/policies',
      name: 'Policies',
      component: PoliciesView,
    },
    {
      path: '/update',
      name: 'Admin',
      component: AdminView,
      // meta: { requiresAuth: true, requiresAdmin: true }
    },
  ],
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login' })
  }
  // Check if route requires guest (login/register pages)
  else if (to.meta.requiresGuest && authStore.isLoggedIn) {
    next({ name: 'home' })
  }
  // Check if route requires admin
  else if (to.meta.requiresAdmin && authStore.currentUser?.userType !== 'ADMIN') {
    next({ name: 'home' })
  }
  else {
    next()
  }
})

export default router
