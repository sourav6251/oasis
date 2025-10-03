import { createVuetify } from 'vuetify'
import 'vuetify/styles'

// Function to get CSS variable value
const getCssVar = (variable: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable) || ''
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#9DC9C7',
          secondary: '#FFD1C8',
          accent: '#E6C8A4',
          background: '#F0F5F3',
          surface: '#F0F5F3',
          info: '#9DC9C7',
          dark: '#2A363B',
          error: '#EE3D3D',
        }
      }
    }
  }
})