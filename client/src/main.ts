// import './styles/style.css'
// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import 'vue-sonner/style.css'
// // main.js
// import '@mdi/font/css/materialdesignicons.min.css'
// import 'font-awesome/css/font-awesome.min.css'

// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// import { MotionPlugin } from '@vueuse/motion'

// import App from './App.vue'
// import router from './router'
// import '@mdi/font/css/materialdesignicons.css'

// // import vuetify from './plugins/vuetify'
// const getCssVar = (name: string) =>
//   getComputedStyle(document.documentElement).getPropertyValue(name).trim()

// // const vuetify = createVuetify({
// //   components,
// //   directives,
// // })
// const vuetify = createVuetify({
//   components,
//   directives,
//    icons: {
//     defaultSet: 'mdi',
//   },
//   theme: {
//     defaultTheme: 'customTheme',
//     themes: {
//       customTheme: {
//         dark: false,
//         colors: {
//           primary: getCssVar('--color-primary'),
//           secondary: getCssVar('--color-secondary'),
//           accent: getCssVar('--color-accent'),
//           background: getCssVar('--color-neutral'),
//           surface: getCssVar('--color-neutral'),
//           info: getCssVar('--color-scroll'),
//           dark: getCssVar('--color-dark'),
//           error: '#EE3D3D',
//         },
//       },
//     },
    
//   },
// })

// const app = createApp(App)

// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
// app.use(MotionPlugin)
// app.use(pinia)
// app.use(router)
// app.use(vuetify)
// app.mount('#app')
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { MotionPlugin } from '@vueuse/motion'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa'

import '@mdi/font/css/materialdesignicons.min.css'
import 'vuetify/styles'
import './styles/style.css'
import 'vue-sonner/style.css'

import App from './App.vue'
import router from './router'

const getCssVar = (name:any) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi, fa },
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
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(MotionPlugin)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
