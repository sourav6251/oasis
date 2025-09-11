import './styles/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

const getCssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

// const vuetify = createVuetify({
//   components,
//   directives,
// })
const vuetify = createVuetify({
  components,
  directives,
   icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: getCssVar('--color-primary'),
          secondary: getCssVar('--color-secondary'),
          accent: getCssVar('--color-accent'),
          background: getCssVar('--color-neutral'),
          surface: getCssVar('--color-neutral'),
          info: getCssVar('--color-scroll'),
          dark: getCssVar('--color-dark'),
          error: '#EE3D3D',
        },
      },
    },
  },
})

const app = createApp(App)

app.use(MotionPlugin)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
/**
 
info

success

warning

error

background

surface

dark


 */