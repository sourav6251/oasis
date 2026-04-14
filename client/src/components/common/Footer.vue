<template>
  <footer style="padding-top: 20px;" class="relative bg-[#1e1916] text-[#d1d1d1] pb-10 overflow-hidden font-['Open_Sans',sans-serif]">
    <!-- Decorative Glows -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-[#eaa636]/5 rounded-full blur-[100px] -ml-48 -mt-48"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-[#eaa636]/5 rounded-full blur-[80px] -mr-32 -mb-32"></div>

    <div class="max-w-[1240px] mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 ">
        
        <!-- About Column -->
        <div class="space-y-6">
          <div class="flex items-center gap-2">
            <h2 class="text-3xl font-[Playfair_Display,serif] font-bold text-white tracking-tight">Oasis<span class="text-[#eaa636]">.</span></h2>
          </div>
          <p class="text-sm leading-relaxed text-gray-400">
            Expertly curating beauty in Tamluk. We combine premium artistry with high-end luxury in Makeup, Skin Care, Hair, and Spa rituals. Your ultimate destination for elegance.
          </p>
          <div class="flex gap-4 pt-2">
            <a 
              v-for="social in socials" 
              :key="social.icon"
              :href="social.link"
              target="_blank"
              class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#eaa636] hover:border-[#eaa636] transition-all duration-300 group"
            >
              <v-icon :icon="social.icon" size="18" class="text-gray-400 group-hover:text-black transition-colors"></v-icon>
            </a>
          </div>
        </div>

        <!-- Contact Column -->
        <div class="space-y-6">
          <h3 class="text-xl font-[Playfair_Display,serif] font-bold text-white relative inline-block pb-5">
            Get In Touch
            <span class="absolute bottom-4 left-0 w-8 h-[2px] bg-[#eaa636]"></span>
          </h3>
          <ul class="space-y-4 pt-2">
            <li v-for="contact in contactInfo" :key="contact.text" class="flex items-center gap-3 group ">
              <div class="mt-1 w-8 h-8 rounded-lg bg-[#eaa636]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#eaa636] transition-colors duration-300">
                <v-icon :icon="contact.icon" size="14" class="text-[#eaa636] group-hover:text-black transition-colors"></v-icon>
              </div>
              <span class="text-sm leading-snug ">{{ contact.text }}</span>
            </li>
          </ul>
        </div>

        <!-- Quick Links Column -->
        <div class="space-y-6">
          <h3 class="text-xl font-[Playfair_Display,serif] font-bold text-white relative inline-block pb-5">
            Quick Navigation
            <span class="absolute bottom-4 left-0 w-8 h-[2px] bg-[#eaa636]"></span>
          </h3>
          <div class="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
            <template v-for="link in navigationLinks" :key="link.name">
              <router-link :to="link.path" class="text-sm text-gray-400 hover:text-[#eaa636] transition-all duration-300 flex items-center group hover:translate-x-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#eaa636] scale-0 group-hover:scale-100 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                {{ link.name }}
              </router-link>
            </template>
          </div>
        </div>

        <!-- Maps Column -->
        <div class="space-y-6">
          <h3 class="text-xl font-[Playfair_Display,serif] font-bold text-white relative inline-block pb-5">
            Find Us
            <span class="absolute bottom-4 left-0 w-8 h-[2px] bg-[#eaa636]"></span>
          </h3>
          <div class="rounded-xl overflow-hidden border-2 border-white/5 h-48 w-full group pt-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.7835859964234!2d87.9229940317383!3d22.286186264583712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0295966a336347%3A0x779f2f1d1f0a722f!2sOasis%20Makeover-Professional%20Beauty%20Premium%20%26%20Academy!5e0!3m2!1sen!2sin!4v1760371225912!5m2!1sen!2sin"
              width="100%" 
              height="100%"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              class="opacity-70 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
        <p>&copy; {{ new Date().getFullYear() }} Oasis Makeover. Designed with Elegance.</p>
        <div class="flex gap-6">
          <router-link to="/policies" class="hover:text-[#eaa636] transition-colors">Privacy Policy</router-link>
          <router-link to="/faq" class="hover:text-[#eaa636] transition-colors">Terms of Service</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = [
  { icon: 'mdi-facebook', link: 'https://www.facebook.com/oasismakeover?mibextid=ZbWKwL' },
  { icon: 'mdi-youtube', link: 'https://youtube.com/@Oasismakeover?si=HIspPYpV68fnXtZo' },
  { icon: 'mdi-instagram', link: '#' }, // Added for layout balance
  { icon: 'mdi-whatsapp', link: 'https://wa.me/919531500843' }
];

const contactInfo = [
  { icon: 'mdi-map-marker', text: '2nd Floor, Left Side of Rupasree Cinema Hall, Tamluk' },
  { icon: 'mdi-phone', text: '9531500843 / 9932269688' },
  { icon: 'mdi-email', text: 'oasismakeover@gmail.com' },
  { icon: 'mdi-clock-outline', text: 'Open: Tue-Sun 9AM - 7PM' }
];

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/service' },
  { name: 'Packages', path: '/packages' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Booking', path: '/booking' },
  { name: 'Contact', path: '/contact' },
  { name: 'About Us', path: '/about' },
  { name: 'Reviews', path: '/review' }
];
</script>

<style scoped>
/* Scoped styles kept to minimum as Tailwind drives the layout */
.tracking-tight {
  letter-spacing: -0.025em;
}
</style>