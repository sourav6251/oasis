<template>
    <div>
      <!-- Gallery Hero -->
      <section class="gallery-hero">
        <div class="container">
          <h1 v-motion :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000">
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
              class="filter-btn"
              :class="{ active: activeFilter === filter.id }"
              @click="setActiveFilter(filter.id, index)"
              v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :delay="index * 100"
              :ref="el => setFilterButtonRef(el, index)"
            >
              <i :class="filter.icon"></i>
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
                    <button class="view-btn" @click.stop="openLightbox(work, index)">
                      <i class="fas fa-expand"></i>
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
            <i class="fas fa-times"></i>
          </button>
          <button class="lightbox-nav lightbox-prev" @click="prevImage">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="lightbox-nav lightbox-next" @click="nextImage">
            <i class="fas fa-chevron-right"></i>
          </button>
          
          <div class="lightbox-image">
            <img :src="currentWork.image" :alt="currentWork.title" />
          </div>
          <div class="lightbox-info">
            <h3>{{ currentWork.title }}</h3>
            <p class="lightbox-category">{{ currentWork.category }}</p>
            <p class="lightbox-description">{{ currentWork.description }}</p>
            <div class="lightbox-meta">
              <span><i class="far fa-clock"></i> {{ currentWork.duration }}</span>
              <span><i class="fas fa-user"></i> {{ currentWork.stylist }}</span>
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
  
      <!-- Footer -->
      <footer>
        <div class="container footer-content">
          <div class="footer-column">
            <h3>Glamour Salon</h3>
            <p>
              Your premier destination for beauty and wellness. We're dedicated to enhancing your natural beauty and providing an exceptional experience.
            </p>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-pinterest"></i></a>
            </div>
          </div>
          <div class="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Hair Styling</a></li>
              <li><a href="#">Makeup</a></li>
              <li><a href="#">Skincare</a></li>
              <li><a href="#">Nail Art</a></li>
              <li><a href="#">Spa Treatments</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contact Info</h3>
            <p><i class="fas fa-map-marker-alt"></i> 123 Beauty Street, City, State 12345</p>
            <p><i class="fas fa-phone"></i> (123) 456-7890</p>
            <p><i class="fas fa-envelope"></i> info@glamoursalon.com</p>
            <p><i class="fas fa-clock"></i> Mon-Sat: 9:00 AM - 8:00 PM</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2023 Glamour Salon. All Rights Reserved. | Designed with <i class="fas fa-heart"></i></p>
        </div>
      </footer>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted, nextTick, type ComponentPublicInstance } from 'vue';
  
  interface GalleryWork {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    duration: string;
    stylist: string;
  }
  
  interface Filter {
    id: string;
    name: string;
    icon: string;
  }
  
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
  
      const filters = ref<Filter[]>([
        { id: 'all', name: 'All Works', icon: 'fas fa-star' },
        { id: 'hair', name: 'Hair', icon: 'fas fa-cut' },
        { id: 'makeup', name: 'Makeup', icon: 'fas fa-palette' },
        { id: 'nails', name: 'Nails', icon: 'fas fa-hand-sparkles' },
        { id: 'skincare', name: 'Skincare', icon: 'fas fa-spa' },
        { id: 'bridal', name: 'Bridal', icon: 'fas fa-heart' }
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
  
      const galleryWorks = ref<GalleryWork[]>([
        {
          id: 1,
          title: 'Elegant Bridal Makeover',
          category: 'Bridal',
          image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Complete bridal transformation with natural makeup and elegant hair styling for a summer wedding.',
          duration: '3 hours',
          stylist: 'Sarah Johnson'
        },
        {
          id: 2,
          title: 'Vibrant Hair Coloring',
          category: 'Hair',
          image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Vibrant balayage with caramel tones and deep conditioning treatment for healthy, shiny hair.',
          duration: '2.5 hours',
          stylist: 'Mike Chen'
        },
        {
          id: 3,
          title: 'Classic French Manicure',
          category: 'Nails',
          image: 'https://images.unsplash.com/photo-1607779044265-60d8017d3c48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Elegant French manicure with gel polish for long-lasting wear and perfect finish.',
          duration: '45 minutes',
          stylist: 'Emma Davis'
        },
        {
          id: 4,
          title: 'Evening Glam Makeup',
          category: 'Makeup',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Dramatic evening makeup with smoky eyes and bold lips for a special night out.',
          duration: '1 hour',
          stylist: 'Lisa Rodriguez'
        },
        {
          id: 5,
          title: 'Hydrating Facial Treatment',
          category: 'Skincare',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Deep hydrating facial with hyaluronic acid and collagen boost for radiant skin.',
          duration: '75 minutes',
          stylist: 'Dr. Maria Gonzalez'
        },
        {
          id: 6,
          title: 'Bohemian Braids',
          category: 'Hair',
          image: 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Beautiful bohemian-style braids with floral accessories for a festival look.',
          duration: '1.5 hours',
          stylist: 'Jessica Brown'
        },
        {
          id: 7,
          title: 'Natural Day Makeup',
          category: 'Makeup',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Fresh, natural makeup look enhancing natural features with minimal products.',
          duration: '45 minutes',
          stylist: 'Amanda Wilson'
        },
        {
          id: 8,
          title: 'Gel Nail Art',
          category: 'Nails',
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Creative gel nail art with floral patterns and glitter accents.',
          duration: '1 hour',
          stylist: 'Sophia Lee'
        },
        {
          id: 9,
          title: 'Anti-Aging Facial',
          category: 'Skincare',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Advanced anti-aging facial with retinol and vitamin C for youthful glow.',
          duration: '90 minutes',
          stylist: 'Dr. Maria Gonzalez'
        },
        {
          id: 10,
          title: 'Traditional Bridal Look',
          category: 'Bridal',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Traditional bridal makeup and hairstyle with intricate jewelry and accessories.',
          duration: '4 hours',
          stylist: 'Sarah Johnson'
        },
        {
          id: 11,
          title: 'Bold Haircut Transformation',
          category: 'Hair',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Dramatic haircut transformation from long to chic bob with textured layers.',
          duration: '2 hours',
          stylist: 'Mike Chen'
        },
        {
          id: 12,
          title: 'Acne Treatment Results',
          category: 'Skincare',
          image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: '12-week acne treatment program showing remarkable skin clearance and healing.',
          duration: '12 weeks',
          stylist: 'Dr. Maria Gonzalez'
        },
        {
          id: 13,
          title: 'Creative Nail Design',
          category: 'Nails',
          image: 'https://images.unsplash.com/photo-1607779044265-60d8017d3c48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Abstract nail art design with geometric patterns and metallic accents.',
          duration: '1.5 hours',
          stylist: 'Sophia Lee'
        },
        {
          id: 14,
          title: 'Editorial Makeup',
          category: 'Makeup',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'High-fashion editorial makeup with bold colors and artistic techniques.',
          duration: '2 hours',
          stylist: 'Lisa Rodriguez'
        },
        {
          id: 15,
          title: 'Modern Bridal Updo',
          category: 'Bridal',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Modern bridal updo with loose curls and delicate hair accessories.',
          duration: '1.5 hours',
          stylist: 'Jessica Brown'
        }
      ]);
  
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
          width: `${sliderWidth.value}px`
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
  
  /* Gallery Hero */
  .gallery-hero {
    background: linear-gradient(rgba(42, 54, 59, 0.85), rgba(42, 54, 59, 0.9)),
      url('https://images.unsplash.com/photo-1595475884562-073c30d45670?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
    background-size: cover;
    background-position: center;
    color: var(--color-light);
    text-align: center;
    padding: 120px 0 80px;
    margin-bottom: 60px;
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
    flex-wrap: wrap;
    gap: 15px;
    position: relative;
    background: var(--color-light);
    padding: 10px;
    border-radius: 50px;
    box-shadow: var(--shadow);
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
    background: var(--color-primary);
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
    background: var(--color-accent);
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
    transition: var(--transition);
  }
  
  .load-more-btn:hover {
    background: var(--color-accent);
    transform: translateY(-2px);
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
    background: var(--color-secondary);
    color: var(--color-dark);
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    min-width: 200px;
    border: 2px solid var(--color-secondary);
  }
  
  .cta-btn:hover {
    background: var(--color-dark);
    color: var(--color-light);
    border-color: var(--color-dark);
    transform: translateY(-3px);
  }
  
  /* Footer */
  footer {
    background-color: var(--color-dark);
    color: var(--color-light);
    padding: 60px 0 30px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .footer-column h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
    color: var(--color-light);
  }
  
  .footer-column h3:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background: var(--color-primary);
  }
  
  .footer-column p {
    margin-bottom: 15px;
    color: var(--color-neutral);
    opacity: 0.9;
  }
  
  .footer-column ul {
    list-style: none;
  }
  
  .footer-column ul li {
    margin-bottom: 10px;
  }
  
  .footer-column ul li a {
    color: var(--color-neutral);
    text-decoration: none;
    transition: var(--transition);
    opacity: 0.9;
  }
  
  .footer-column ul li a:hover {
    color: var(--color-primary);
    opacity: 1;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }
  
  .social-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(157, 201, 199, 0.1);
    border-radius: 50%;
    color: var(--color-light);
    text-decoration: none;
    transition: var(--transition);
  }
  
  .social-links a:hover {
    background: var(--color-primary);
    color: var(--color-dark);
    transform: translateY(-3px);
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid rgba(157, 201, 199, 0.1);
    color: var(--color-neutral);
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  /* Responsive Design */
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
  
  @media (max-width: 768px) {
    .gallery-hero {
      padding: 100px 0 60px;
    }
    
    .gallery-filters {
      flex-direction: column;
      border-radius: var(--radius);
      padding: 15px;
    }
    
    .filter-btn {
      width: 100%;
      justify-content: center;
    }
    
    .filter-slider {
      display: none;
    }
    
    .filter-btn.active {
      background: var(--color-primary);
      color: var(--color-dark);
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
  }
  </style>