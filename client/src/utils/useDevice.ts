import { ref, onMounted, onUnmounted } from 'vue'

export function useDevice() {
  const isMobile = ref(false)
  
  const checkDevice = () => {
    isMobile.value = window.innerWidth <= 768 // Standard mobile breakpoint
  }

  onMounted(() => {
    checkDevice() // Check on mount
    window.addEventListener('resize', checkDevice)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkDevice)
  })

  return {
    isMobile
  }
}
