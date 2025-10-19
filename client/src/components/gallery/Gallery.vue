<template>
  <div>
    <!-- Gallery Hero -->
    <section class="gallery-hero">
      <div class="container px-4">
        <h1 v-motion :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" class="fleur" >
          Our Gallery
        </h1>
        <p v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
          Discover the artistry and excellence of our work through these stunning transformations
        </p>
      </div>
    </section>

    <!-- Gallery Content -->
    <div class="container">
      <!-- Category Filters with Sliding Indicator -->
      <div class="gallery-filters-container">
        <div class="gallery-filters">
          <button
  v-for="(filter, index) in filters"
  :key="filter.id"
  class="filter-btn group"
  :class="{ active: activeFilter === filter.id }"
  @click="setActiveFilter(filter.id, index)"
  v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :delay="index * 100"
  :ref="el => setFilterButtonRef(el, index)"
>
  <v-icon 
    :icon="filter.icon" 
    color="black" 
    :class="activeFilter !== filter.id ? 'group-hover:!text-[#9DC9C7] transition-colors duration-300' : ''"
  ></v-icon>
  {{ filter.name }}
</button>
          <!-- Sliding Indicator -->
          <div 
            class="filter-slider" 
            :style="sliderStyle"
          ></div>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div class="gallery-grid">
        <div
          v-for="(work, index) in filteredWorks"
          :key="work.id"
          class="gallery-item"
          @click="openLightbox(work, index)"
          v-motion-slide-visible-once-bottom
          :delay="index * 50"
        >
          <div class="gallery-img">
            <img :src="work.image" :alt="work.title" loading="lazy" />
            <div class="gallery-overlay">
              <div class="gallery-info">
                <h4>{{ work.title }}</h4>
                <p>{{ work.category }}</p>
                <div class="gallery-actions">
                  <button class="view-btn " @click.stop="openLightbox(work, index)">
                    <v-icon icon="mdi-arrow-expand"></v-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="load-more-container">
        <button class="load-more-btn" @click="loadMore">
          Load More Works
        </button>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="showLightbox" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">
          <v-icon icon="mdi-close"></v-icon>
        </button>
        <button class="lightbox-nav lightbox-prev" @click="prevImage">
          <v-icon icon="mdi-chevron-left"></v-icon>
        </button>
        <button class="lightbox-nav lightbox-next" @click="nextImage">
          <v-icon icon="mdi-chevron-right"></v-icon>
        </button>
        
        <div class="lightbox-image">
          <img :src="currentWork.image" :alt="currentWork.title" />
        </div>
        <div class="lightbox-info">
          <h3>{{ currentWork.title }}</h3>
          <p class="lightbox-category">{{ currentWork.category }}</p>
          <p class="lightbox-description">{{ currentWork.description }}</p>
          <div class="lightbox-meta">
            <span><v-icon icon="mdi-clock-outline"></v-icon> {{ currentWork.duration }}</span>
            <span><v-icon icon="mdi-account"></v-icon> {{ currentWork.stylist }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <section class="gallery-cta">
      <div class="container">
        <h2 v-motion-slide-visible-once-bottom>Ready for Your Transformation?</h2>
        <p v-motion-slide-visible-once-bottom :delay="100">
          Let us create your own stunning before-and-after story. Book your appointment today!
        </p>
        <button 
          class="cta-btn" 
          @click="bookNow"
          v-motion-slide-visible-once-bottom
          :delay="200"
        >
          Book Your Session
        </button>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { GalleryData } from '@/sampleData/GalleryData';
import type { Filter, GalleryWork } from '@/types/Gallery';
import { defineComponent, ref, computed, onMounted, nextTick, type ComponentPublicInstance } from 'vue';

export default defineComponent({
  name: "Gallery",
  setup() {
    const activeFilter = ref<string>('all');
    const showLightbox = ref<boolean>(false);
    const currentWorkIndex = ref<number>(0);
    const itemsPerLoad = ref<number>(9);
    const visibleItems = ref<number>(9);
    const filterButtons = ref<(HTMLElement | null)[]>([]);
    const sliderPosition = ref<number>(0);
    const sliderWidth = ref<number>(0);
    const sliderHeight = ref<number>(0);
    const sliderTop = ref<number>(0);

    const filters = ref<Filter[]>([
      { id: 'all', name: 'All Works', icon: 'mdi-star' },
      { id: 'hair', name: 'Hair', icon: 'mdi-content-cut' },
      { id: 'makeup', name: 'Makeup', icon: 'mdi-palette' },
      { id: 'nails', name: 'Nails', icon: 'mdi-hand-heart' },
      { id: 'skincare', name: 'Skincare', icon: 'mdi-spa' },
      { id: 'bridal', name: 'Bridal', icon: 'mdi-heart' }
    ]);

    // Fix: Properly type the ref callback
    const setFilterButtonRef = (el: Element | ComponentPublicInstance | null, index: number) => {
      if (el instanceof HTMLElement) {
        filterButtons.value[index] = el;
      } else if (el && typeof el === 'object' && '$el' in el) {
        // Handle ComponentPublicInstance case
        filterButtons.value[index] = (el as ComponentPublicInstance).$el as HTMLElement;
      } else {
        filterButtons.value[index] = null;
      }
    };

    const galleryWorks = ref<GalleryWork[]>(GalleryData);

    // Computed properties
    const filteredWorks = computed(() => {
      let filtered = galleryWorks.value;
      
      if (activeFilter.value !== 'all') {
        filtered = filtered.filter(work => 
          work.category.toLowerCase() === activeFilter.value.toLowerCase()
        );
      }
      
      return filtered.slice(0, visibleItems.value);
    });

    const currentWork = computed(() => {
      return galleryWorks.value[currentWorkIndex.value];
    });

    const showLoadMore = computed(() => {
      if (activeFilter.value === 'all') {
        return visibleItems.value < galleryWorks.value.length;
      }
      const filtered = galleryWorks.value.filter(work => 
        work.category.toLowerCase() === activeFilter.value.toLowerCase()
      );
      return visibleItems.value < filtered.length;
    });

    const sliderStyle = computed(() => {
      return {
        transform: `translateX(${sliderPosition.value}px)`,
        width: `${sliderWidth.value}px`,
        height: `${sliderHeight.value}px`,
        top: `${sliderTop.value}px`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    });

    // Methods
    const updateSliderPosition = async (index: number) => {
      await nextTick();
      
      const button = filterButtons.value[index];
      if (button) {
        const container = button.parentElement;
        
        if (container) {
          const buttonRect = button.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          sliderPosition.value = buttonRect.left - containerRect.left;
          sliderWidth.value = buttonRect.width;
          sliderHeight.value = buttonRect.height;
          sliderTop.value = buttonRect.top - containerRect.top;
        }
      }
    };

    const setActiveFilter = async (filterId: string, index: number) => {
      activeFilter.value = filterId;
      visibleItems.value = itemsPerLoad.value;
      await updateSliderPosition(index);
    };

    const openLightbox = (work: GalleryWork, index: number): void => {
      currentWorkIndex.value = index;
      showLightbox.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = (): void => {
      showLightbox.value = false;
      document.body.style.overflow = 'auto';
    };

    const nextImage = (): void => {
      const filtered = activeFilter.value === 'all' 
        ? galleryWorks.value 
        : galleryWorks.value.filter(work => work.category.toLowerCase() === activeFilter.value.toLowerCase());
      
      currentWorkIndex.value = (currentWorkIndex.value + 1) % filtered.length;
    };

    const prevImage = (): void => {
      const filtered = activeFilter.value === 'all' 
        ? galleryWorks.value 
        : galleryWorks.value.filter(work => work.category.toLowerCase() === activeFilter.value.toLowerCase());
      
      currentWorkIndex.value = (currentWorkIndex.value - 1 + filtered.length) % filtered.length;
    };

    const loadMore = (): void => {
      visibleItems.value += itemsPerLoad.value;
    };

    const bookNow = (): void => {
      alert('Redirecting to booking page...');
    };

    // Initialize
    onMounted(() => {
      setTimeout(() => {
        updateSliderPosition(0);
      }, 100);

      // Close lightbox on ESC key
      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && showLightbox.value) {
          closeLightbox();
        }
      };
      window.addEventListener('keydown', handleKeydown);
    });

    return {
      activeFilter,
      filters,
      filteredWorks,
      showLightbox,
      currentWork,
      showLoadMore,
      sliderStyle,
      setFilterButtonRef,
      setActiveFilter,
      openLightbox,
      closeLightbox,
      nextImage,
      prevImage,
      loadMore,
      bookNow
    };
  }
});
</script>

<style scoped>
/* Gallery Styles */
:root {
  --color-primary: #9DC9C7;
  --color-secondary: #FFD1C8;
  --color-accent: #E6C8A4;
  --color-neutral: #F0F5F3;
  --color-dark: #2A363B;
  --color-text: #2A363B;
  --color-light: #FFFFFF;
  --color-border: #E0E0E0;
  --shadow: 0 4px 6px rgba(42, 54, 59, 0.1);
  --shadow-hover: 0 8px 15px rgba(42, 54, 59, 0.15);
  --radius: 8px;
  --transition: all 0.3s ease;
}

/* .container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
} */

.gallery-hero {
background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
color: var(--color-dark);
text-align: center;
padding: 80px 0;
margin-bottom: 80px;
border-radius: var(--radius);
position: relative;
overflow: hidden;
}

.gallery-hero:before {
content: '';
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: url('https://images.unsplash.com/photo-1595475884562-073c30d45670?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover;
opacity: 0.1;
z-index: 0;
}
.gallery-hero h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 20px;
  color: var(--color-light);
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.gallery-hero p {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Gallery Filters with Sliding Indicator */
.gallery-filters-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  padding: 20px 0;
}

.gallery-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
  background: var(--color-light);
  padding: 10px;
  border-radius: 50px;
  box-shadow: var(--shadow);
  width: fit-content;
  margin: 0 auto;
  flex-wrap: nowrap;
}

.filter-btn {
  background: transparent;
  border: 2px solid transparent;
  color: var(--color-text);
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 2;
  white-space: nowrap;
  flex-shrink: 0;
}

.filter-btn.active {
  color: var(--color-dark);
  font-weight: 600;
}

.filter-btn:hover:not(.active) {
  color: var(--color-primary);
}

/* Sliding Indicator */
.filter-slider {
  position: absolute;
  top: 10px;
  left: 0;
  height: calc(100% - 20px);
  background: var(--color-primary);
  border-radius: 30px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 0 2px 8px rgba(157, 201, 199, 0.3);
}

/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.gallery-item {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  aspect-ratio: 1;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.gallery-img {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.gallery-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.gallery-item:hover .gallery-img img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 40%, rgba(42, 54, 59, 0.9));
  display: flex;
  align-items: flex-end;
  padding: 20px;
  opacity: 0;
  transition: var(--transition);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-info {
  color: var(--color-light);
  transform: translateY(20px);
  transition: var(--transition);
}

.gallery-item:hover .gallery-info {
  transform: translateY(0);
}

.gallery-info h4 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 600;
}

.gallery-info p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 15px;
}

.gallery-actions {
  display: flex;
  gap: 10px;
}

.view-btn {
  /* background: var(--color-primary); */
  color: var(--color-dark);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.view-btn:hover {
  /* background: var(--color-accent); */
  border:solid 1px var(--color-primary) ;
  transform: scale(1.1);
}

/* Load More Button */
.load-more-container {
  text-align: center;
  margin: 40px 0;
}

.load-more-btn {
  background: var(--color-primary);
  color: var(--color-dark);
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(0);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.08);
}

.load-more-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
  border-radius: 30px;
  opacity: 0;
  transition: all 0.5s ease;
  z-index: -1;
  filter: blur(5px);
  transform: scale(0.95);
}

.load-more-btn:hover {
  background: var(--color-accent);
  transform: 
    translateY(-6px) 
    translateZ(10px) 
    rotateX(5deg);
  box-shadow: 
    0 12px 25px rgba(0, 0, 0, 0.2),
    0 8px 20px rgba(0, 0, 0, 0.15);
}

.load-more-btn:hover::after {
  opacity: 0.6;
  transform: scale(1.05);
  filter: blur(8px);
}

.load-more-btn:active {
  transform: 
    translateY(-2px) 
    translateZ(5px);
  transition: all 0.1s ease;
}
/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(42, 54, 59, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.lightbox-content {
  background: var(--color-light);
  border-radius: var(--radius);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.lightbox-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition);
}

.lightbox-close:hover {
  background: var(--color-secondary);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition);
}

.lightbox-prev {
  left: 20px;
}

.lightbox-next {
  right: 20px;
}

.lightbox-nav:hover {
  background: var(--color-primary);
}

.lightbox-image {
  height: 500px;
  overflow: hidden;
}

.lightbox-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox-info {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lightbox-info h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--color-dark);
}

.lightbox-category {
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.lightbox-description {
  color: var(--color-text);
  margin-bottom: 20px;
  line-height: 1.6;
}

.lightbox-meta {
  display: flex;
  gap: 20px;
  color: var(--color-text);
  font-size: 0.9rem;
}

.lightbox-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Gallery CTA */
.gallery-cta {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-dark);
  text-align: center;
  padding: 80px 0;
  margin-top: 60px;
}

.gallery-cta h2 {
  color: var(--color-dark);
  margin-bottom: 20px;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.gallery-cta p {
  max-width: 600px;
  margin: 0 auto 30px;
  color: var(--color-dark);
  opacity: 0.9;
  font-size: 1.1rem;
}
.cta-btn {
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
  color: var(--color-dark);
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-width: 200px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(0);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.08);
}

.cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 30px;
  transform: translateZ(-5px);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  filter: blur(8px);
}

.cta-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border-radius: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.cta-btn:hover {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-light);
  transform: 
    translateY(-8px) 
    translateZ(10px) 
    rotateX(15deg);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.25),
    0 10px 20px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.cta-btn:hover::before {
  opacity: 0.6;
  transform: translateZ(-15px) scale(1.1);
  filter: blur(12px);
}

.cta-btn:hover::after {
  opacity: 1;
}

.cta-btn:active {
  transform: 
    translateY(-4px) 
    translateZ(5px) 
    rotateX(8deg);
  transition: all 0.2s ease;
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.15);
}


/* Enhanced Responsive Design for Filters */
@media (max-width: 1200px) {
  .gallery-filters {
    width: 100%;
    max-width: 800px;
  }
}

@media (max-width: 992px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .lightbox-content {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
  
  .lightbox-image {
    height: 300px;
  }
}

/* Mobile Layout for Filters - Multi-row layout with sliding animation */
@media (max-width: 768px) {
  .gallery-hero {
    padding: 100px 0 60px;
  }
  
  /* Multi-row filter layout for mobile with sliding animation */
  .gallery-filters {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border-radius: var(--radius);
    width: 100%;
    max-width: 500px;
  }
  
  .filter-btn {
    flex: 0 0 calc(33.333% - 8px);
    padding: 10px 15px;
    font-size: 0.9rem;
    justify-content: center;
  }
  
  /* Make the last two items take 50% each in second row */
  .filter-btn:nth-child(4),
  .filter-btn:nth-child(5),
  .filter-btn:nth-child(6) {
    flex: 0 0 calc(50% - 8px);
  }
  
  /* Update slider for mobile - now it will move in 2D */
  .filter-slider {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    /* We'll dynamically set position, width, height, and top via JavaScript */
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .lightbox {
    padding: 10px;
  }
  
  .lightbox-info {
    padding: 20px;
  }
  
  .lightbox-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-column h3:after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .gallery-hero {
    padding: 80px 0 40px;
  }
  
  .gallery-hero h1 {
    font-size: 2rem;
  }
  
  .gallery-cta {
    padding: 60px 0;
  }
  
  .lightbox-nav {
    width: 40px;
    height: 40px;
  }
  
  .lightbox-prev {
    left: 10px;
  }
  
  .lightbox-next {
    right: 10px;
  }
  
  /* Adjust filters for very small screens */
  .gallery-filters {
    gap: 6px;
    padding: 10px;
  }
  
  .filter-btn {
    padding: 8px 12px;
    font-size: 0.85rem;
    flex: 0 0 calc(33.333% - 6px);
  }
  
  .filter-btn:nth-child(4),
  .filter-btn:nth-child(5),
  .filter-btn:nth-child(6) {
    flex: 0 0 calc(50% - 6px);
  }
}

@media (max-width: 480px) {
  .gallery-hero {
    padding: 50px 0 30px;
  }
  
  /* Further adjust filters for extra small screens */
  .gallery-filters {
    gap: 5px;
    padding: 8px;
  }
  
  .filter-btn {
    padding: 8px 10px;
    font-size: 0.8rem;
    flex: 0 0 calc(33.333% - 5px);
  }
  
  .filter-btn:nth-child(4),
  .filter-btn:nth-child(5),
  .filter-btn:nth-child(6) {
    flex: 0 0 calc(50% - 5px);
  }
}

/* Touch device improvements */
@media (hover: none) {
  .gallery-overlay {
    opacity: 1;
  }
  
  .gallery-info {
    transform: translateY(0);
  }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .filter-slider {
    transition: none !important;
  }
}
</style>