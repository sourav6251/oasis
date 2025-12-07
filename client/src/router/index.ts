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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    },
  ],
})

export default router
