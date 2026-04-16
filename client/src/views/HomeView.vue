<template>
  <div class=" home-page font-[Open_Sans,sans-serif] text-base text-[#545454] bg-white m-0">

    <!-- Header Start -->
    <div class="hero-banner w-full relative overflow-hidden flex items-center bg-[#1e1916]">
      <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1140px]">
        <div class="flex flex-wrap -mx-4 items-center">
          <div class="w-full lg:w-7/12 px-4" v-motion :initial="{ opacity: 0, x: -100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="100" :duration="1000">
            <p class="text-[#eaa636] uppercase mb-2 font-bold tracking-[2px]">Welcome To Oasis</p>
            <h1 class="mb-3 text-[#eaa636] font-extrabold text-[40px] md:text-[55px] leading-[1.2] font-[Playfair_Display,serif]">The Best Professional Beauty Premium & Academy</h1>
            <p class="text-white/80 mb-6 text-base max-w-[600px] ">All Type of Bridal Makeup, Party Makeup, Weeding, Pre Weeding Makeup, Hair Stylish, Hair Smoothing, Spa done here.</p>
            <div class="flex items-center gap-4">
              <!-- <a href="#" class="inline-block font-semibold leading-normal text-center cursor-pointer select-none bg-[#eaa636] border border-[#eaa636] text-[#1e1916] rounded-md px-4 py-2 transition-all duration-500 hover:bg-[#d6942a] hover:border-[#d6942a] hover:text-black">Explore More</a> -->
              <button class="relative overflow-hidden z-[1] bg-[#d8c72f] text-[#ff0000] font-[Playfair_Display,serif] font-bold uppercase tracking-[1px] px-3 py-2 rounded-[10px] border-none transition-all duration-400 ease-[ease]  hover:text-white hover:-translate-y-[3px]  before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#1e1916] before:transition-all before:duration-400 before:ease-[ease] before:-z-[1] before:rounded-[10px] hover:before:w-full">Explore More</button>
              <a href="https://wa.me/9932269688" class="inline-flex justify-center items-center ml-3 w-[50px] h-[50px] rounded-full bg-[#198754] text-white hover:bg-[#157347] transition-all duration-500">
                <v-icon icon="mdi-whatsapp" size="24" color="white"></v-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header End -->

    <!-- About Start -->
    <section id="about" class="py-24 pt-10 overflow-hidden relative" style="background: linear-gradient(135deg, #fffdf7 0%, #fdf5eb 40%, #fff9f0 70%, #ffffff 100%);">
      <!-- Decorative gold glows -->
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 0% 0%, rgba(234,166,54,0.12) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(234,166,54,0.08) 0%, transparent 50%);"></div>
      <div class="max-w-[1140px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div class="flex flex-wrap -mx-4 items-center">
          <!-- Left: Image Section -->
          <div class="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            <div class="relative group">
              <!-- Decorative background shape -->
              <div 
                v-motion 
                :initial="{ opacity: 0, scale: 0.8, rotate: -10 }" 
                :visibleOnce="{ opacity: 1, scale: 1, rotate: 0 }" 
                :delay="200"
                class="absolute -top-10 -left-10 w-64 h-64 bg-[#eaa636] rounded-full -z-10 blur-3xl opacity-10"
              ></div>
              
              <!-- Main Image -->
              <div 
                v-motion 
                :initial="{ opacity: 0, x: -50 }" 
                :visibleOnce="{ opacity: 1, x: 0 }" 
                :duration="1200"
                class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[1.02] transition-transform duration-500"
              >
                <img src="/logocov.png" alt="Oasis Studio" class="w-full h-auto object-cover min-h-[400px]">
              </div>

              <!-- Overlapping Image -->
              <div 
                v-motion 
                :initial="{ opacity: 0, y: 50, rotate: 5 }" 
                :visibleOnce="{ opacity: 1, y: 0, rotate: -5 }" 
                :delay="400"
                :duration="1000"
                class="absolute -bottom-10 -left-6 md:-left-12 w-1/2 z-20 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group-hover:rotate-0 transition-all duration-700"
              >
                <img src="/5.jpg" alt="Our Work" class="w-full h-auto object-cover">
              </div>

              <!-- Floating badge -->
              <div 
                v-motion 
                :initial="{ opacity: 0, scale: 0.5 }" 
                :visibleOnce="{ opacity: 1, scale: 1 }" 
                :delay="800"
                class="absolute top-10 right-8 md:right-12 transform -translate-y-1/2 z-999 bg-[#f3c7801f] text-[#f0b261] p-6 rounded-[5px] shadow-xl flex flex-col items-center justify-center animate-bounce"
                style="animation-duration: 3s;padding:0.2rem 0.5rem 0.2rem 0.5rem;"
              >
                <span class="text-3xl font-bold">10+</span>
                <span class="text-xs uppercase tracking-wider font-semibold">Years Exp.</span>
              </div>
            </div>
          </div>

          <!-- Right: Content Section -->
          <div class="w-full lg:w-1/2 px-4">
            <div class="lg:pl-10">
              <div v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="800">
                <div class="flex items-center gap-3 mb-4">
                  <span class="w-12 h-[2px] bg-[#eaa636]"></span>
                  <span class="text-[#eaa636] uppercase font-bold tracking-[2px] text-sm">About Oasis</span>
                </div>
                <h2 class="text-[32px] md:text-[45px] font-[Playfair_Display,serif] font-bold text-[#1e1916] mb-6 leading-tight">
                  Creative Expertise for Your <span class="text-[#eaa636]">Perfect Look</span>
                </h2>
                <p class="text-[#545454] text-lg mb-6 leading-relaxed">
                  Welcome to Oasis, the premium beauty sanctuary in Tamluk. Our mission is to blend artistry with wellness, transforming your vision into reality through bespoke makeovers and cutting-edge hair designs.
                </p>
                <p class="text-[#545454] mb-8 leading-relaxed">
                  As a leading Studio & Academy, we don't just provide services—we set standards. Our team of certified professionals is dedicated to bringing out your inner radiance in a serene, luxurious environment.
                </p>
              </div>

              <!-- Features Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <template v-for="(feature, index) in [
                  { title: 'Quality Work', icon: 'mdi-check-decagram' },
                  { title: 'Premium Service', icon: 'mdi-gem' },
                  { title: 'Online Booking', icon: 'mdi-calendar-check' },
                  { title: 'Expert Stylists', icon: 'mdi-content-cut' }
                ]" :key="index">
                  <div 
                    v-motion 
                    :initial="{ opacity: 0, x: 20 }" 
                    :visibleOnce="{ opacity: 1, x: 0 }" 
                    :delay="200 + (index * 100)"
                    class="flex items-center gap-4 py-1 px-2 rounded-md bg-[#fdf5eb] hover:bg-[#eaa636]/10 transition-colors group cursor-default"
                  >
                    <div class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <v-icon :icon="feature.icon" color="#eaa636" size="20"></v-icon>
                    </div>
                    <span class="font-semibold text-[#1e1916]">{{ feature.title }}</span>
                  </div>
                </template>
              </div>

              <!-- <div v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="800">
                <a 
                  href="about.html" 
                  class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold text-white transition-all duration-300 bg-[#eaa636] rounded-full group hover:shadow-2xl hover:shadow-[#eaa636]/40 active:scale-95"
                >
                  <span class="absolute inset-0 w-full h-full text-white duration-300 -translate-x-full bg-[#1e1916] group-hover:translate-x-0 ease"></span>
                  <span class="relative flex items-center gap-2">
                    Read Our Story
                    <v-icon icon="mdi-arrow-right" size="20" class="group-hover:translate-x-1 transition-transform"></v-icon>
                  </span>
                </a>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Why We Start -->
    <div class="why-section relative overflow-hidden py-24" style="background: linear-gradient(135deg, #fffcf7 0%, #fdf5eb 35%, #fff9f0 70%, #ffffff 100%);">
      <!-- Background layers -->
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 20% 50%, rgba(234,166,54,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(234,166,54,0.06) 0%, transparent 50%);"></div>
      <!-- Decorative line -->
      <div class="absolute top-0 left-0 right-0 h-[1px]" style="background: linear-gradient(90deg, transparent, rgba(234,166,54,0.3), transparent);"></div>
      <div class="absolute bottom-0 left-0 right-0 h-[1px]" style="background: linear-gradient(90deg, transparent, rgba(234,166,54,0.3), transparent);"></div>

      <div class="relative z-10 max-w-[1140px] mx-auto py-5 px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16" v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900">
          <span class="inline-block text-[#eaa636] uppercase tracking-[4px] text-xs font-bold mb-4">Why Choose Us</span>
          <h2 class="text-[2rem] md:text-[3rem] font-[Playfair_Display,serif] font-bold text-[#1e1916] leading-tight">
            The Best Parlour<br><span class="text-[#eaa636]">You Have Ever Seen</span>
          </h2>
          <div class="flex items-center justify-center gap-3 mt-5">
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#eaa636]"></span>
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
          </div>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(card, index) in whyCards"
            :key="card.num"
            v-motion
            :initial="{ opacity: 0, y: 60 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            :delay="150 + index * 150"
            :duration="900"
            class="why-card group relative rounded-2xl overflow-hidden cursor-default transition-all duration-500"
            :class="[
              card.featured ? 'card-premium-bg-featured md:-mt-6' : 'card-premium-bg'
            ]"
            :style="card.featured
              ? 'padding: 2rem; border: 1px solid rgba(234,166,54,0.4); box-shadow: 0 20px 60px rgba(234,166,54,0.15);'
              : 'padding: 2rem; border: 1px solid rgba(234,166,54,0.15); backdrop-filter: blur(8px);'"
          >
            <!-- Hover glow overlay -->
            <div
              class="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              :style="card.featured
                ? 'background: linear-gradient(135deg, rgba(234,166,54,0.08) 0%, transparent 70%);'
                : 'background: linear-gradient(135deg, rgba(234,166,54,0.05) 0%, transparent 70%);'"
            ></div>
            <!-- Top border line -->
            <div
              class="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style="background: linear-gradient(90deg, transparent, #eaa636, transparent);"
            ></div>
            <!-- Decorative number -->
            <span
              class="absolute -top-4 -right-2 text-[8rem] font-bold font-[Playfair_Display,serif] leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110"
              :style="`color: rgba(234,166,54,${card.featured ? '0.12' : '0.08'});`"
            >{{ card.num }}</span>
            <!-- Icon badge -->
            <div
              class="relative z-10 mb-6 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6"
              :style="card.featured
                ? 'background: linear-gradient(135deg, #eaa636, #d4962e); box-shadow: 0 8px 24px rgba(234,166,54,0.45);'
                : 'background: linear-gradient(135deg, #eaa636, #c5a675); box-shadow: 0 8px 24px rgba(234,166,54,0.35);'"
            >
              <v-icon :icon="card.icon" color="white" size="26"></v-icon>
            </div>
            <!-- Content -->
            <div class="relative z-10">
              <h3
                class="font-[Playfair_Display,serif] font-bold text-[1.4rem] mb-3 transition-colors duration-300"
                :class="card.featured ? 'text-[#eaa636]' : 'text-[#1e1916] group-hover:text-[#eaa636]'"
              >{{ card.title }}</h3>
              <p
                class="text-sm leading-relaxed transition-colors duration-300"
                :class="card.featured ? 'text-[#545454]/90' : 'text-[#545454]/80 group-hover:text-[#545454]'"
              >{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Why We End -->

    <!-- Service Start -->
    <section class="relative py-24 pt-10 overflow-hidden" style="background: linear-gradient(160deg, #fff8ee 0%, #fdf3e3 30%, #fffcf5 70%, #fff6e8 100%);">
      <!-- Subtle background decoration -->
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 50% 0%, rgba(234,166,54,0.14) 0%, transparent 65%), radial-gradient(ellipse at 0% 100%, rgba(234,166,54,0.08) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(197,131,30,0.06) 0%, transparent 50%);"></div>

      <div class="relative z-10 max-w-[1140px] mx-auto px-4 md:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16" v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900">
          <span class="inline-block text-[#eaa636] uppercase tracking-[4px] text-xs font-bold mb-4">Our Services</span>
          <h2 class="text-[2rem] md:text-[2.8rem] font-[Playfair_Display,serif] font-bold text-[#1e1916] leading-tight">
            We Provide <span class="text-[#eaa636]">Best Professional</span> Services
          </h2>
          <div class="flex items-center justify-center gap-3 mt-5">
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#eaa636]/50"></span>
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
          </div>
        </div>

        <!-- Service Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(service, index) in services"
            :key="service.title"
            v-motion
            :initial="{ opacity: 0, y: 70 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            :delay="100 + index * 120"
            :duration="900"
            class="service-card group relative overflow-hidden rounded-2xl cursor-pointer"
            :class="index % 2 !== 0 ? 'lg:mt-8' : ''"
            style="height: 420px; box-shadow: 0 8px 32px rgba(30,25,22,0.12);"
          >
            <!-- Background Image -->
            <img
              :src="service.image"
              :alt="service.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >

            <!-- Permanent dark gradient at bottom -->
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(30,25,22,0.85) 0%, rgba(30,25,22,0.2) 45%, transparent 100%);"></div>

            <!-- Hover gold overlay (slides up) -->
            <div
              class="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
              style="background: linear-gradient(to top, rgba(234,166,54,0.92) 0%, rgba(197,131,30,0.80) 20%, transparent 40%);"
            ></div>

            <!-- Icon badge (top-right) -->
            <div
              class="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center z-20 transition-all duration-500 group-hover:scale-110"
              style="background: rgba(255,255,255,0.15); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.3);"
            >
              <v-icon :icon="service.icon" color="white" size="20"></v-icon>
            </div>

            <!-- Card content -->
            <div class="absolute bottom-0 left-0 right-0 z-20 p-6 px-10 text-white">
              <!-- Always-visible title -->
              <h4
                class="font-[Playfair_Display,serif] font-bold text-[1.35rem] mb-0 transition-all duration-500 group-hover:mb-3 group-hover:text-[#1e1916]"
              >{{ service.title }}</h4>

              <!-- Revealed on hover -->
              <div class="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 delay-75">
                <div class="w-10 h-[2px] bg-[#1e1916]/40 mb-2 mt-1"></div>
                <p class="text-[#1e1916]/80 text-sm leading-snug">{{ service.tagline }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <!-- <div class="text-center mt-14" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="600" :duration="800">
          <button class="relative overflow-hidden z-[1] bg-[#eaa636] text-[#ffffff] font-[Playfair_Display,serif] font-bold uppercase tracking-[2px] px-10 py-4 rounded-full border-none transition-all duration-400 ease-[ease] shadow-[0_5px_15px_rgba(234,166,54,0.35)] hover:text-white hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(234,166,54,0.55)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#1e1916] before:transition-all before:duration-400 before:ease-[ease] before:-z-[1] before:rounded-[50px] hover:before:w-full">Explore All Services</button>
        </div> -->
      </div>
    </section>
    <!-- Service End -->

    <!-- Project Start -->
    <section class="py-24 pt-10 overflow-hidden relative" style="background: linear-gradient(180deg, #fdf3e3 0%, #fff8ee 35%, #fffcf7 65%, #fdf5eb 100%);">
      <div class="max-w-[1140px] mx-auto px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-5" v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900">
          <span class="inline-block text-[#eaa636] uppercase tracking-[4px] text-xs font-bold mb-4">Our Gallery</span>
          <h2 class="text-[2rem] md:text-[2.8rem] font-[Playfair_Display,serif] font-bold text-[#1e1916] leading-tight">
            Discover Our <span class="text-[#eaa636]">Creative Masterpieces</span>
          </h2>
          <div class="flex items-center justify-center gap-3 mt-5">
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#eaa636]"></span>
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
          </div>
        </div>

        <!-- Filter Tabs -->
        <!-- <div class="flex flex-wrap justify-center gap-4 mb-12" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="200">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeFilter = cat"
            class="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border"
            :class="activeFilter === cat 
              ? 'bg-[#eaa636] border-[#eaa636] text-white shadow-lg' 
              : 'bg-transparent border-black/10 text-[#545454] hover:border-[#eaa636] hover:text-[#eaa636]'"
          >
            {{ cat }}
          </button>
        </div> -->

        <!-- Mosaic Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          <div 
            v-for="(project, index) in filteredProjects" 
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :visibleOnce="{ opacity: 1, scale: 1 }"
            :delay="index * 100"
            class="group relative overflow-hidden rounded-2xl bg-[#1e1916]"
            :class="{
              'lg:col-span-2 lg:row-span-2': project.size === 'large',
              'lg:row-span-2': project.size === 'medium' && project.id % 2 === 0,
              'lg:col-span-1': project.size === 'small'
            }"
          >
            <!-- Project Image -->
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
            >

            <!-- Decorative Border -->
            <div class="absolute inset-4 border border-white/20 rounded-xl pointer-events-none transition-all duration-500 group-hover:inset-6 group-hover:border-[#eaa636]/50"></div>

            <!-- Glass Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-[#1e1916]/40 backdrop-blur-[2px]">
              <div class="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span class="text-[#eaa636] text-xs uppercase tracking-[3px] font-bold mb-2 block">{{ project.category }}</span>
                <h3 class="text-white text-xl md:text-2xl font-[Playfair_Display,serif] font-bold mb-4">{{ project.title }}</h3>
                <div class="w-10 h-10 rounded-full bg-[#eaa636] flex items-center justify-center mx-auto text-[#1e1916] cursor-pointer hover:bg-white transition-colors duration-300">
                  <v-icon icon="mdi-magnify-plus" size="20"></v-icon>
                </div>
              </div>
            </div>

            <!-- Subtle Label (Always Visible) -->
            <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end group-hover:opacity-0 transition-opacity duration-300">
              <div>
                <p class="text-white/60 text-[10px] uppercase tracking-widest mb-1">{{ project.category }}</p>
                <h4 class="text-white font-[Playfair_Display,serif] font-medium text-lg leading-none">{{ project.title }}</h4>
              </div>
              <div class="w-8 h-[1px] bg-[#eaa636]"></div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <!-- <div class="text-center mt-16" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="400">
          <button class="group relative overflow-hidden px-12 py-4 bg-[#eaa636] rounded-full transition-all duration-500 hover:shadow-[0_15px_30px_rgba(234,166,54,0.3)]">
            <span class="absolute inset-0 w-0 bg-[#1e1916] transition-all duration-500 ease-out group-hover:w-full"></span>
            <span class="relative flex items-center gap-2 text-[#1e1916] font-bold uppercase tracking-widest text-sm group-hover:text-white">
              Explore More Works
              <v-icon icon="mdi-arrow-right" size="18" class="group-hover:translate-x-1 transition-transform"></v-icon>
            </span>
          </button>
        </div> -->
      </div>
    </section>
    <!-- Project End -->

    <!-- Testimonial Start -->
    <section class="py-24 bg-[#fdf5eb]/20 relative overflow-hidden">
      <!-- Grid Background Overlay -->
      <div class="absolute inset-0 grid-pattern pointer-events-none"></div>

      <!-- Decorative background glows -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-[#eaa636]/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#eaa636]/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
      
      <div class="max-w-[1140px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-10">
        <!-- Section Header -->
        <div class="text-center mb-3" v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900">
          <span class="inline-block text-[#eaa636] font-bold uppercase tracking-[4px] text-xs mb-4">Client's Review</span>
          <h2 class="text-[2rem] md:text-[2.8rem] font-[Playfair_Display,serif] font-bold text-[#1e1916] leading-tight">
            Our Satisfied <span class="text-[#eaa636]">Clients Say</span>
          </h2>
          <div class="flex items-center justify-center gap-3 mt-5">
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#eaa636]"></span>
            <span class="w-16 h-[1px] bg-[#eaa636]/40"></span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(item, index) in testimonials" 
            :key="item.name"
            v-motion 
            :initial="{ opacity: 0, y: 50 }" 
            :visibleOnce="{ opacity: 1, y: 0 }" 
            :delay="200 + (index * 150)"
            style="padding: 20px;"
            class="group card-hover relative glass-effect shimmer-effect rounded-[10px] p-6 shadow-[0_10px_40px_rgba(30,25,22,0.05)] hover:shadow-[0_20px_60px_rgba(234,166,54,0.15)] transition-all duration-500 border border-white hover:border-[#eaa636]/30 overflow-hidden"
          >
            <!-- Quote Icon -->
            <div class="absolute top-6 right-8 text-[#eaa636]/10 group-hover:text-[#eaa636]/20 transition-colors">
              <v-icon icon="mdi-format-quote-close" size="64"></v-icon>
            </div>

            <!-- Client Info -->
            <div class="flex items-center gap-4 mb-6 relative z-10">
              <div class="relative">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-[#eaa636] p-1 shadow-inner bg-white">
                  <img :src="item.photo" :alt="item.name" class="w-full h-full object-cover rounded-full">
                </div>
                <div class="absolute -bottom-1 -right-1 bg-[#eaa636] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  <v-icon icon="mdi-star" size="10"></v-icon>
                </div>
              </div>
              <div>
                <h5 class="text-[1.15rem] font-[Playfair_Display,serif] font-bold text-[#1e1916] mb-1 line-height-none capitalize">{{ item.name }}</h5>
                <div class="flex gap-0.5">
                  <v-icon v-for="star in 5" :key="star" 
                    icon="mdi-star" 
                    :color="star <= item.rating ? '#eaa636' : '#e2e2e2'" 
                    size="14"
                  ></v-icon>
                </div>
              </div>
            </div>

            <!-- Review Text -->
            <div class="mb-8 relative z-10">
              <p class="text-[#545454] leading-relaxed italic text-[0.95rem]">"{{ item.review }}"</p>
            </div>

            <!-- Satisfaction Preview -->
            <div class="mt-auto pt-6 border-t border-[#eaa636]/10">
              <p class="text-[10px] uppercase tracking-widest text-[#eaa636] font-bold mb-3 flex items-center gap-2">
                <span class="w-4 h-[1px] bg-[#eaa636]"></span>
                Service Excellence
              </p>
              <div class="relative overflow-hidden rounded-[10px] h-32 group/img border border-[#eaa636]/5">
                <img :src="item.satisfactionPhoto" alt="Service Result" class="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover/img:opacity-20 transition-opacity duration-500"></div>
                <div class="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[#1e1916] shadow-sm">
                  Satisfied Client
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- CTA -->
        <!-- <div class="text-center mt-16" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="800">
          <button class="relative overflow-hidden group px-10 py-4 bg-[#1e1916] text-white rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#eaa636]/20">
            <span class="absolute inset-0 w-0 bg-[#eaa636] transition-all duration-300 ease-out group-hover:w-full"></span>
            <span class="relative z-10 flex items-center gap-3 font-bold uppercase tracking-widest text-xs group-hover:text-[#1e1916]">
              View All Reviews
              <v-icon icon="mdi-arrow-right" size="16" class="transition-transform group-hover:translate-x-1"></v-icon>
            </span>
          </button>
        </div> -->
      </div>
    </section>
    <!-- Testimonial End -->

    <!-- Testimonial End -->


  </div>
  <Footer/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Footer from '@/components/common/Footer.vue';

const activeFilter = ref('All');
const categories = ['All', 'Bridal', 'Makeup', 'Hair', 'Special'];

const projects = [
  { id: 1, title: 'Royal Bridal', category: 'Bridal', image: '/10.jpg', size: 'large' },
  { id: 2, title: 'Golden Glamour', category: 'Makeup', image: '/11.jpeg', size: 'small' },
  { id: 3, title: 'Silk Waves', category: 'Hair', image: '/12.jpg', size: 'medium' },
  { id: 4, title: 'Classic Ethnic', category: 'Bridal', image: '/13.jpg', size: 'small' },
  { id: 5, title: 'Celestial Glow', category: 'Bridal', image: '/14.jpg', size: 'medium' },
  { id: 6, title: 'Precision Cut', category: 'Hair', image: '/15.jpg', size: 'small' },
  { id: 7, title: 'Agamoni Look', category: 'Special', image: '/16.jpg', size: 'large' },
  { id: 8, title: 'Party Radiant', category: 'Makeup', image: '/17.jpg', size: 'medium' },
];

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects;
  return projects.filter(p => p.category === activeFilter.value);
});

const testimonials = [
  {
    name: "Diya De",
    photo: "/1.jpg",
    review: "Exquisite transformations await at this beauty parlour! Expert treatments, skilled stylists, and a welcoming atmosphere combine for an unforgettable pampering experience.",
    rating: 5,
    satisfactionPhoto: "/10.jpg"
  },
  {
    name: "Shreya Mondal",
    photo: "/2.jpeg",
    review: "Thrilled with my hair service! The parlour's expertise shone through, leaving me with stunning results. A top-notch experience I'll rave about!",
    rating: 4,
    satisfactionPhoto: "/15.jpg"
  },
  {
    name: "Sujata Maity",
    photo: "/3.jpg",
    review: "Oasis Makeover worked magic on my bridal look! Impeccable makeup that lasted all day. I felt truly radiant. Grateful for their exceptional artistry!",
    rating: 5,
    satisfactionPhoto: "/16.jpg"
  }
];

const whyCards = [
  {
    num: '01',
    icon: 'mdi-star-four-points',
    title: 'Best Service',
    description: 'Experience the ultimate in beauty services at Oasis. We are committed to providing our clients with the very best service and exceptional results.',
    featured: false,
  },
  {
    num: '02',
    icon: 'mdi-diamond-stone',
    title: 'Premium Work',
    description: "Experience the pinnacle of beauty at Oasis: where clients receive premium, top-quality services. Discover Tamluk's finest beauty parlour today.",
    featured: true,
  },
  {
    num: '03',
    icon: 'mdi-emoticon-happy-outline',
    title: '100% Satisfaction',
    description: 'At Oasis, we guarantee 100% client satisfaction. Experience our exceptional beauty services and leave feeling truly satisfied.',
    featured: false,
  },
];

const services = [
  {
    title: 'Makeup',
    tagline: 'Bridal, party & everyday glam tailored just for you.',
    image: '/6.jpg',
    icon: 'mdi-brush',
  },
  {
    title: 'Hair',
    tagline: 'Cuts, colour, smoothing & styles for every occasion.',
    image: '/7.jpg',
    icon: 'mdi-content-cut',
  },
  {
    title: 'Skin',
    tagline: 'Advanced facials & treatments for radiant, healthy skin.',
    image: '/8.jpg',
    icon: 'mdi-face-woman-shimmer',
  },
  {
    title: 'Spa',
    tagline: 'Relax, unwind and restore with our luxury spa rituals.',
    image: '/9.jpg',
    icon: 'mdi-spa',
  },
];
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

.grid-pattern {
  background-image: 
    radial-gradient(#eaa636 0.5px, transparent 0.5px), 
    radial-gradient(#eaa636 0.5px, transparent 0.5px);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  opacity: 0.1;
}

.glass-effect {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 250, 245, 0.9) 100%);
  backdrop-blur: 10px;
}

.card-premium-bg {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 250, 245, 0.8) 100%);
  background-image: 
    linear-gradient(135deg, rgba(234, 166, 54, 0.02) 0%, transparent 70%),
    linear-gradient(rgba(234, 166, 54, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234, 166, 54, 0.04) 1px, transparent 1px);
  background-size: 100% 100%, 20px 20px, 20px 20px;
}

.card-premium-bg-featured {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(254, 249, 235, 0.9) 100%);
  background-image: 
    linear-gradient(135deg, rgba(234, 166, 54, 0.06) 0%, transparent 70%),
    linear-gradient(rgba(234, 166, 54, 0.07) 1.5px, transparent 1.5px),
    linear-gradient(90deg, rgba(234, 166, 54, 0.07) 1.5px, transparent 1.5px);
  background-size: 100% 100%, 25px 25px, 25px 25px;
}

.shimmer-effect {
  position: relative;
  overflow: hidden;
}

.shimmer-effect::after {
  content: '';
  position: absolute;
  top: -150%;
  left: -150%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(234, 166, 54, 0.1) 50%,
    transparent 55%
  );
  transition: all 0.8s ease;
  pointer-events: none;
}

.card-hover:hover .shimmer-effect::after {
  top: 100%;
  left: 100%;
}

.hero-banner {
  min-height: 100vh;
  background-image: linear-gradient(to right, rgba(30, 25, 22, 1) 0%, rgba(30, 25, 22, 0.85) 50%, rgba(30, 25, 22, 0) 100%), url('/homeban.png');
  background-size: auto 100%;
  background-position: right center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .hero-banner {
    background-image: linear-gradient(to bottom, rgba(30, 25, 22, 0.8) 0%, rgba(30, 25, 22, 0.4) 100%), url('/homeban.png');
    background-size: cover;
    background-position: 80% center;
  }
}
</style>
