<template>
  <div class="review-page">

    <!-- ── HERO ──────────────────────────────────────── -->
    <section class="review-hero">
      <div class="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
          alt="Reviews hero"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="container hero-content">
        <span
          class="eyebrow"
          v-motion :initial="{ opacity:0, y:20 }" :enter="{ opacity:1, y:0 }" :duration="800"
        >Client Reviews</span>
        <h1
          v-motion :initial="{ opacity:0, y:40 }" :enter="{ opacity:1, y:0 }" :duration="1000" :delay="150"
        >
          Stories of <span class="gold">Transformation</span>
        </h1>
        <p
          v-motion :initial="{ opacity:0, y:30 }" :enter="{ opacity:1, y:0 }" :duration="900" :delay="300"
        >
          Real words from the clients who trusted us with their most important moments.
        </p>
        <div
          class="hero-divider"
          v-motion :initial="{ opacity:0 }" :enter="{ opacity:1 }" :duration="800" :delay="500"
        >
          <span></span><span class="dot"></span><span></span>
        </div>

        <!-- Stat pills -->
        <div
          class="hero-pills"
          v-motion :initial="{ opacity:0, y:20 }" :enter="{ opacity:1, y:0 }" :duration="800" :delay="600"
        >
          <div class="hero-pill">
            <v-icon icon="mdi-star" size="18" color="#eaa636"></v-icon>
            <span>4.9 / 5 Average Rating</span>
          </div>
          <div class="hero-pill">
            <v-icon icon="mdi-account-group" size="18" color="#eaa636"></v-icon>
            <span>500+ Happy Clients</span>
          </div>
          <div class="hero-pill">
            <v-icon icon="mdi-thumb-up" size="18" color="#eaa636"></v-icon>
            <span>98% Would Recommend</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STAT BAR ───────────────────────────────────── -->
    <section class="stat-bar">
      <div class="container stat-bar__grid">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="stat-bar__item"
          v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :delay="i*100" :duration="700"
        >
          <v-icon :icon="s.icon" size="28" color="#eaa636"></v-icon>
          <div class="stat-bar__text">
            <span class="stat-bar__num">{{ s.value }}</span>
            <span class="stat-bar__label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FILTER + REVIEWS ───────────────────────────── -->
    <section class="reviews-section">
      <div class="container">

        <!-- Section header -->
        <div
          class="section-head"
          v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700"
        >
          <span class="eyebrow">What They Say</span>
          <h2>Client <span class="gold">Testimonials</span></h2>
          <div class="section-divider">
            <span></span><span class="dot"></span><span></span>
          </div>
        </div>

        <!-- Filter tabs -->
        <div
          class="filter-wrap"
          v-motion :initial="{ opacity:0, y:16 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700" :delay="100"
        >
          <button
            v-for="(f, index) in filterOptions"
            :key="f"
            class="filter-btn"
            :class="{ active: activeFilter === f }"
            @click="setFilter(f, index)"
            :ref="(el) => setFilterRef(el, index)"
          >{{ f }}</button>
          <div class="filter-slider" :style="sliderStyle"></div>
        </div>

        <!-- Star filter -->
        <div
          class="star-filter"
          v-motion :initial="{ opacity:0 }" :visibleOnce="{ opacity:1 }" :duration="600" :delay="200"
        >
          <span class="star-filter__label">Filter by stars:</span>
          <button
            v-for="n in [5,4,3,2,1]"
            :key="n"
            class="star-btn"
            :class="{ active: starFilter === n }"
            @click="starFilter = starFilter === n ? null : n"
          >
            <v-icon icon="mdi-star" size="14"></v-icon> {{ n }}
          </button>
          <button v-if="starFilter" class="star-btn star-btn--clear" @click="starFilter = null">
            <v-icon icon="mdi-close" size="13"></v-icon> Clear
          </button>
        </div>

        <!-- Loading / Error -->
        <div v-if="loadingReviews" class="loading-state">
          <v-spinner color="#eaa636" size="48"></v-spinner>
          <p>Gathering testimonials...</p>
        </div>

        <div v-else-if="fetchError" class="error-state">
          <v-icon icon="mdi-alert-circle-outline" size="48" color="#e57373"></v-icon>
          <p>{{ fetchError }}</p>
          <button class="btn-gold mt-4" @click="fetchReviews">Retry</button>
        </div>

        <!-- Grid -->
        <div v-else class="reviews-grid">
          <div
            v-for="(review, index) in visibleReviews"
            :key="review.name + index"
            class="review-card"
            :class="cardClass(index)"
            v-motion :initial="{ opacity:0, y:28 }" :visibleOnce="{ opacity:1, y:0 }" :delay="(index%6)*80" :duration="700"
          >
            <!-- Quote mark -->
            <div class="review-card__quote" aria-hidden="true">"</div>

            <!-- Stars -->
            <div class="review-card__stars">
              <v-icon
                v-for="n in 5"
                :key="n"
                :icon="n <= review.rating ? 'mdi-star' : 'mdi-star-outline'"
                size="17"
                :color="n <= review.rating ? '#eaa636' : 'rgba(180,160,130,.5)'"
              ></v-icon>
              <span class="review-card__rating">{{ review.rating }}.0</span>
            </div>

            <!-- Text -->
            <p class="review-card__text">"{{ review.text }}"</p>

            <!-- Images gallery -->
            <div v-if="review.images && review.images.length" class="review-card__gallery">
              <div v-for="(img, i) in review.images.slice(0, 3)" :key="i" class="gallery-item">
                <img :src="img" alt="Review photo" />
                <div v-if="i === 2 && review.images.length > 3" class="gallery-more">
                  +{{ review.images.length - 3 }}
                </div>
              </div>
            </div>

            <!-- Service tag -->
            <div class="review-card__tags">
              <span v-for="s in review.services" :key="s" class="review-card__tag">{{ s }}</span>
            </div>

            <!-- Footer -->
            <div class="review-card__footer">
              <img :src="review.image" :alt="review.name" class="review-card__avatar" />
              <div>
                <p class="review-card__name">{{ review.name }}</p>
                <p class="review-card__date">{{ formatDate(review.date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <!-- Infinite-scroll sentinel -->
        <div ref="sentinelRef" class="scroll-sentinel" aria-hidden="true"></div>
        <div v-if="loadingMore" class="loading-more">
          <div class="review-spinner"></div>
        </div>

        <!-- Empty -->
        <div v-if="!filteredReviews.length" class="empty-state-minimal" v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }">
          <img src="/no_reviews.png" alt="No reviews yet - Be the first to share your experience" class="empty-state-img" />
          <div class="empty-state-overlay" @click="resetFilters" title="Click to reset filters"></div>
        </div>
      </div>
    </section>

    <!-- ── WRITE REVIEW ───────────────────────────────── -->
    <section class="form-section">
      <div class="form-bg" aria-hidden="true"></div>
      <div class="container">
        <div
          class="form-card"
          v-motion :initial="{ opacity:0, y:40 }" :visibleOnce="{ opacity:1, y:0 }" :duration="900"
        >
          <!-- Left column -->
          <div class="form-card__left">
            <span class="eyebrow">Your Voice Matters</span>
            <h2>Share Your <span class="gold">Experience</span></h2>
            <div class="section-divider section-divider--left">
              <span></span><span class="dot"></span><span></span>
            </div>
            <p>
              Your honest feedback helps us grow and helps other clients choose confidently.
              We read every single review.
            </p>
            <ul class="form-card__perks">
              <li v-for="p in perks" :key="p">
                <div class="perk-icon"><v-icon icon="mdi-check" size="14" color="#1e1916"></v-icon></div>
                {{ p }}
              </li>
            </ul>
          </div>

          <!-- Right column: form -->
          <div v-if="!isLoggedIn" class="form-card__form login-prompt">
            <v-icon icon="mdi-lock-outline" size="48" color="#eaa636" class="mb-4"></v-icon>
            <h3>Please Log In</h3>
            <p>You must be a registered user to share your experience with us.</p>
            <router-link to="/login" class="btn-gold mt-4">
              Log In to Review
            </router-link>
          </div>

          <form v-else class="form-card__form" @submit.prevent="submitReview">
            <!-- Rating -->
            <div class="form-group">
              <label class="form-label">Overall Service Rating *</label>
              <div class="star-picker">
                <v-icon
                  v-for="n in 5"
                  :key="n"
                  :icon="n <= (hoverRating || form.rating) ? 'mdi-star' : 'mdi-star-outline'"
                  size="32"
                  :color="n <= (hoverRating || form.rating) ? '#eaa636' : '#c8b89a'"
                  style="cursor:pointer; transition:transform 0.2s;"
                  @mouseover="hoverRating = n"
                  @mouseleave="hoverRating = 0"
                  @click="form.rating = n"
                ></v-icon>
                <span v-if="form.rating" class="star-picker__label">{{ ratingLabel }}</span>
              </div>
            </div>

            <!-- Name + email (Read Only) -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-input form-input--readonly"
                  readonly
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-input form-input--readonly"
                  readonly
                />
              </div>
            </div>

            <!-- Services (Multi-select) -->
            <div class="form-group">
              <label class="form-label">Services Received * (Select one or more)</label>
              <div class="services-selector-container">
                <div class="services-checkbox-grid">
                  <label v-for="cat in availableCategories" :key="cat" class="service-checkbox-item" :class="{ selected: form.services.includes(cat) }">
                    <input 
                      type="checkbox" 
                      :value="cat" 
                      v-model="form.services"
                      class="hidden-checkbox"
                    />
                    <div class="checkbox-ui">
                      <v-icon :icon="form.services.includes(cat) ? 'mdi-check-circle' : 'mdi-plus-circle-outline'" size="16"></v-icon>
                      <span>{{ cat }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Review text -->
            <div class="form-group">
              <label class="form-label">Your Review *</label>
              <textarea
                v-model="form.review"
                class="form-input form-textarea"
                rows="4"
                maxlength="500"
                placeholder="Tell us about your experience at Oasis…"
                required
              ></textarea>
              <span class="form-char">{{ form.review.length }}/500</span>
            </div>

            <!-- Images -->
            <div class="form-group">
              <label class="form-label">Add Images (Optional)</label>
              <div class="file-upload-wrap">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleImageUpload"
                  class="form-input file-input"
                  id="review-images"
                />
                <label for="review-images" class="file-upload-label">
                  <v-icon icon="mdi-camera-plus" size="20"></v-icon>
                  <span>Choose Images</span>
                </label>
              </div>
              <div class="image-previews" v-if="imagePreviews.length">
                <div class="preview-wrap" v-for="(img, idx) in imagePreviews" :key="idx">
                  <img :src="img" class="preview-img" alt="Preview" />
                  <button type="button" @click="removeImage(idx)" class="remove-btn">
                    <v-icon icon="mdi-close" size="12"></v-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn-gold form-submit" :disabled="submitting">
              <v-icon v-if="!submitting" icon="mdi-send" size="18"></v-icon>
              <v-icon v-else icon="mdi-loading" class="mdi-spin" size="18"></v-icon>
              {{ submitting ? 'Submitting...' : 'Submit Review' }}
            </button>

            <!-- Success msg -->
            <Transition name="fade">
              <div v-if="submitted" class="form-success">
                <v-icon icon="mdi-check-circle" size="20" color="#2e7d32"></v-icon>
                Thank you! Your review has been submitted.
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="cta-bg">
        <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80" alt="cta" />
        <div class="cta-overlay"></div>
      </div>
      <div class="container cta-content">
        <span
          class="eyebrow eyebrow--light"
          v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700"
        >Ready to Create Your Story?</span>
        <h2
          v-motion :initial="{ opacity:0, y:40 }" :visibleOnce="{ opacity:1, y:0 }" :duration="900" :delay="150"
        >Book Your <span class="gold">Session</span> Today</h2>
        <p
          v-motion :initial="{ opacity:0 }" :visibleOnce="{ opacity:1 }" :duration="800" :delay="300"
        >Join 500+ happy clients and experience the Oasis difference.</p>
        <div
          class="cta-btns"
          v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="800" :delay="450"
        >
          <button class="btn-gold">Book Appointment</button>
          <a href="https://wa.me/9932269688" class="btn-whatsapp" target="_blank" rel="noopener">
            <v-icon icon="mdi-whatsapp" size="20" color="white"></v-icon> WhatsApp Us
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, nextTick, watch, onMounted, type ComponentPublicInstance } from 'vue';
import * as reviewApi from '@/api/reviewApi';
import serviceApi from '@/api/serviceApi';
import type { Service, ServiceCategory } from '@/types/Services';
import { useAuthStore } from '@/stores/authStore';

export default defineComponent({
  name: 'ReviewComponent',
  setup() {
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.isLoggedIn);
    const currentUser = computed(() => authStore.currentUser);

    /* ── DATA ─────────────────────────────────────────── */
    const reviewData = ref<reviewApi.ReviewData[]>([]);
    const loadingReviews = ref(false);
    const fetchError = ref<string | null>(null);

    const stats = computed(() => {
      const total = reviewData.value.length;
      if (total === 0) {
        return [
          { value: '5.0',  label: 'Average Rating',    icon: 'mdi-star'           },
          { value: '100+', label: 'Happy Clients',      icon: 'mdi-account-group'  },
          { value: '100%', label: 'Would Recommend',    icon: 'mdi-thumb-up'       },
          { value: '0',    label: '5-Star Reviews',     icon: 'mdi-certificate'    },
        ];
      }

      const sum = reviewData.value.reduce((acc, r) => acc + r.rating, 0);
      const avg = (sum / total).toFixed(1);
      const fiveStars = reviewData.value.filter(r => r.rating === 5).length;
      const recommendCount = reviewData.value.filter(r => r.rating >= 4).length;
      const recommendPercent = Math.round((recommendCount / total) * 100);

      return [
        { value: avg,           label: 'Average Rating',    icon: 'mdi-star'           },
        { value: `${total}+`,   label: 'Happy Clients',      icon: 'mdi-account-group'  },
        { value: `${recommendPercent}%`, label: 'Would Recommend',    icon: 'mdi-thumb-up'       },
        { value: fiveStars.toString(), label: '5-Star Reviews',     icon: 'mdi-certificate'    },
      ];
    });

    const perks = [
      'Takes under 2 minutes',
      'Completely anonymous option available',
      'Helps future clients choose wisely',
      'We personally respond to every review',
    ];

    const availableCategories = ref<string[]>([]);

    /* ── FILTER ───────────────────────────────────────── */
    const filterOptions = ref<string[]>(['All']);
    const activeFilter  = ref<string>('All');
    const starFilter    = ref<number | null>(null);
    const visibleCount  = ref<number>(6);
    const loadingMore   = ref<boolean>(false);
    const sentinelRef   = ref<HTMLElement | null>(null);
    let   observer: IntersectionObserver | null = null;

    const serviceCategory = (serviceName: string) => {
      // If the serviceName is actually one of our categories, return it as is
      if (availableCategories.value.includes(serviceName)) return serviceName;
      
      // Otherwise fallback to searching in services (for older data)
      const service = allServicesData.value.find(s => s.name === serviceName);
      return service?.category?.name || 'Other';
    };
    
    const allServicesData = ref<Service[]>([]);

    const filteredReviews = computed(() => {
      let list = reviewData.value;
      if (activeFilter.value !== 'All') {
        list = list.filter(r => r.services.some(s => serviceCategory(s) === activeFilter.value));
      }
      if (starFilter.value !== null)
        list = list.filter(r => r.rating === starFilter.value);
      return list;
    });

    const visibleReviews = computed(() => filteredReviews.value.slice(0, visibleCount.value));

    const resetFilters = () => {
      activeFilter.value = 'All';
      starFilter.value   = null;
      visibleCount.value = 6;
    };

    /* ── INFINITE SCROLL ──────────────────────────────── */
    const loadMore = async () => {
      if (loadingMore.value || visibleCount.value >= filteredReviews.value.length) return;
      loadingMore.value = true;
      await new Promise((r) => setTimeout(r, 500));
      visibleCount.value += 6;
      loadingMore.value = false;
    };

    const setupObserver = () => {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) loadMore(); },
        { rootMargin: '200px' },
      );
      if (sentinelRef.value) observer.observe(sentinelRef.value);
    };

    /* ── FILTER SLIDER ────────────────────────────────── */
    const filterRefs     = ref<(HTMLElement | null)[]>([]);
    const sliderLeft     = ref<number>(0);
    const sliderWidth_   = ref<number>(0);
    const sliderHeight_  = ref<number>(0);
    const sliderTop_     = ref<number>(0);

    const sliderStyle = computed(() => ({
      transform:  `translateX(${sliderLeft.value}px)`,
      width:      `${sliderWidth_.value}px`,
      height:     `${sliderHeight_.value}px`,
      top:        `${sliderTop_.value}px`,
    }));

    const setFilterRef = (el: Element | ComponentPublicInstance | null, i: number) => {
      if (el instanceof HTMLElement) filterRefs.value[i] = el;
      else if (el && '$el' in (el as object)) filterRefs.value[i] = (el as ComponentPublicInstance).$el as HTMLElement;
      else filterRefs.value[i] = null;
    };

    const updateSlider = async (i: number) => {
      await nextTick();
      const btn = filterRefs.value[i];
      if (btn) {
        const bRect = btn.getBoundingClientRect();
        const cRect = btn.parentElement!.getBoundingClientRect();
        sliderLeft.value    = bRect.left - cRect.left;
        sliderWidth_.value  = bRect.width;
        sliderHeight_.value = bRect.height;
        sliderTop_.value    = bRect.top  - cRect.top;
      }
    };

    const setFilter = async (f: string, i: number) => {
      activeFilter.value = f;
      visibleCount.value = 6;
      await updateSlider(i);
    };

    /* ── FORM ─────────────────────────────────────────── */
    const hoverRating = ref<number>(0);
    const submitted   = ref<boolean>(false);

    const submitting = ref<boolean>(false);
    const imagePreviews = ref<string[]>([]);

    const form = reactive({
      name: '', email: '', rating: 0, services: [] as string[], review: '', images: [] as File[]
    });

    // Watch for user login to prepopulate
    watch(currentUser, (user) => {
      if (user) {
        form.name = user.fullName || '';
        form.email = user.email || '';
      }
    }, { immediate: true });

    const handleImageUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        Array.from(target.files).forEach(file => {
          form.images.push(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              imagePreviews.value.push(e.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        });
      }
      // reset input
      target.value = '';
    };

    const removeImage = (index: number) => {
      form.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };

    const ratingLabel = computed(() => {
      const labels: Record<number, string> = {
        1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent',
      };
      return labels[form.rating] || '';
    });

    const submitReview = async () => {
      if (!isLoggedIn.value) return;
      if (form.rating === 0) return;
      
      if (form.services.length === 0) {
        alert('Please select at least one service received.');
        return;
      }
      
      submitting.value = true;
      try {
        const formData = new FormData();
        formData.append('rating', form.rating.toString());
        
        form.services.forEach(s => {
          formData.append('services', s);
        });
        
        formData.append('review', form.review);
        
        form.images.forEach((img) => {
          formData.append('images', img);
        });

        const newReview = await reviewApi.createReview(formData);
        
        // Update local data
        reviewData.value.unshift(newReview);
        
        submitted.value = true;
        
        // Reset form
        form.rating = 0;
        form.services = [];
        form.review = '';
        form.images = [];
        
        imagePreviews.value = [];
        setTimeout(() => (submitted.value = false), 5000);
      } catch (error: any) {
        console.error('Failed to submit review:', error);
        alert(error.response?.data?.message || 'Failed to submit review. Please try again.');
      } finally {
        submitting.value = false;
      }
    };

    /* ── HELPERS ──────────────────────────────────────── */
    const formatDate = (d: string) =>
      new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    /* ── CARD VARIANT ─────────────────────────────────── */
    const cardClass = (index: number) => {
      const pos = index % 7;
      if (pos === 0) return 'review-card--gold';   // gold gradient, spans 2 rows
      if (pos === 3) return 'review-card--dark';   // dark gradient
      return '';                                    // default cream
    };

    /* ── INIT ────────────────────────────────────────────── */
    const fetchReviews = async () => {
      loadingReviews.value = true;
      fetchError.value = null;
      try {
        const data = await reviewApi.getReviews();
        reviewData.value = data;
      } catch (error: any) {
        console.error('Failed to fetch reviews:', error);
        fetchError.value = 'Could not load reviews. Please try again later.';
      } finally {
        loadingReviews.value = false;
      }
    };

    const fetchServiceData = async () => {
      try {
        const [categories, servicesList] = await Promise.all([
          serviceApi.getAllServiceCategories(),
          serviceApi.getAllServices()
        ]);
        
        filterOptions.value = ['All', ...categories.map(c => c.name)];
        availableCategories.value = categories.map(c => c.name);
        allServicesData.value = servicesList;
      } catch (error) {
        console.error('Failed to fetch service data:', error);
      }
    };

    onMounted(async () => {
      await Promise.all([fetchReviews(), fetchServiceData()]);
      setTimeout(() => { updateSlider(0); setupObserver(); }, 200);
    });

    // Re-attach observer when filter changes (sentinel re-renders)
    watch([activeFilter, starFilter], async () => {
      visibleCount.value = 6;
      await nextTick();
      setupObserver();
    });

    return {
      isLoggedIn, currentUser,
      stats, perks, availableCategories, filterOptions, activeFilter, starFilter,
      filteredReviews, visibleReviews, visibleCount, loadingMore, sentinelRef,
      hoverRating, form, ratingLabel, submitted, submitting,
      imagePreviews, handleImageUpload, removeImage,
      sliderStyle, setFilterRef, setFilter, resetFilters,
      submitReview, formatDate, cardClass,
      loadingReviews, fetchError, fetchReviews
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

/* ── TOKENS ──────────────────────────────────────────── */
* { box-sizing: border-box; margin: 0; padding: 0; }
.review-page { font-family: 'Open Sans', sans-serif; background: #fffdf7; color: #545454; }
.container { max-width: 1140px; margin: 0 auto; padding: 0 1.5rem; }

/* ── SHARED ──────────────────────────────────────────── */
h1, h2, h3 { font-family: 'Playfair Display', serif; color: #1e1916; line-height: 1.15; }
.gold { color: #eaa636; }
.eyebrow {
  display: inline-block; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 4px; text-transform: uppercase; color: #eaa636; margin-bottom: 1rem;
}
.eyebrow--light { color: rgba(234,166,54,.9); }

.hero-divider, .section-divider {
  display: flex; align-items: center; gap: .75rem;
  margin-top: 1.5rem; justify-content: center;
}
.section-divider--left { justify-content: flex-start; }
.hero-divider span:not(.dot), .section-divider span:not(.dot) {
  width: 64px; height: 1px; background: rgba(234,166,54,.4);
}
.hero-divider .dot, .section-divider .dot {
  width: 8px; height: 8px; border-radius: 50%; background: #eaa636;
}

.btn-gold {
  display: inline-flex; align-items: center; gap: .5rem;
  background: #eaa636; color: #1e1916;
  font-family: 'Playfair Display', serif; font-weight: 700;
  font-size: .88rem; letter-spacing: .05em; text-transform: uppercase;
  padding: .85rem 2rem; border: none; border-radius: 50px; cursor: pointer;
  box-shadow: 0 5px 18px rgba(234,166,54,.35); position: relative;
  overflow: hidden; z-index: 1; transition: all .35s ease;
}
.btn-gold::before {
  content: ''; position: absolute; inset: 0; background: #1e1916;
  width: 0; transition: width .35s ease; z-index: -1; border-radius: 50px;
}
.btn-gold:hover { color: #fff; transform: translateY(-3px); box-shadow: 0 8px 28px rgba(234,166,54,.5); }
.btn-gold:hover::before { width: 100%; }

.btn-outline {
  display: inline-flex; align-items: center; gap: .5rem;
  background: transparent; border: 2px solid #eaa636; color: #1e1916;
  font-weight: 700; font-size: .86rem; letter-spacing: .05em; text-transform: uppercase;
  padding: .8rem 2rem; border-radius: 50px; cursor: pointer; transition: all .35s ease;
}
.btn-outline:hover { background: #eaa636; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(234,166,54,.35); }

.btn-whatsapp {
  display: inline-flex; align-items: center; gap: .5rem;
  background: #198754; color: #fff; font-weight: 700;
  font-size: .85rem; letter-spacing: .05em; text-transform: uppercase;
  padding: .85rem 2rem; border-radius: 50px; text-decoration: none; transition: all .35s ease;
}
.btn-whatsapp:hover { background: #157347; transform: translateY(-3px); }

/* ── HERO ────────────────────────────────────────────── */
.review-hero {
  position: relative; min-height: 72vh;
  display: flex; align-items: flex-end; padding-bottom: 5rem; overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg,rgba(30,25,22,.95) 0%,rgba(30,25,22,.75) 55%,rgba(30,25,22,.48) 100%);
}
.hero-content { position: relative; z-index: 2; text-align: center; }
.hero-content h1 { font-size: clamp(2.4rem,6vw,4rem); color: #fff; margin-bottom: 1rem; }
.hero-content > p { color: rgba(255,255,255,.72); font-size: 1.08rem; max-width: 530px; margin: 0 auto; line-height: 1.8; }
.hero-pills { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.75rem; }
.hero-pill {
  display: flex; align-items: center; gap: .5rem;
  padding: .6rem 1.4rem; border-radius: 50px;
  background: rgba(255,255,255,.1); backdrop-filter: blur(8px);
  border: 1px solid rgba(234,166,54,.3);
  font-size: .82rem; color: #fff; font-weight: 600;
}

/* ── STAT BAR ────────────────────────────────────────── */
.stat-bar {
  background: #1e1916;
  padding: 2.5rem 0;
}
.stat-bar__grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem; text-align: center;
}
@media (max-width: 768px) { .stat-bar__grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 480px) { .stat-bar__grid { grid-template-columns: repeat(2,1fr); } }

.stat-bar__item {
  display: flex; flex-direction: column; align-items: center; gap: .6rem;
  padding: 1.25rem; border-radius: 12px;
  border: 1px solid rgba(234,166,54,.12);
  background: rgba(255,255,255,.03);
}
.stat-bar__text { display: flex; flex-direction: column; align-items: center; }
.stat-bar__num { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #eaa636; line-height: 1; }
.stat-bar__label { font-size: .78rem; color: rgba(255,255,255,.55); font-weight: 600; letter-spacing: .5px; margin-top:.25rem; }

/* ── REVIEWS SECTION ─────────────────────────────────── */
.reviews-section {
  padding: 5.5rem 0 4rem;
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), 
              url('/no_reviews.png') center/cover no-repeat fixed;
}
.section-head { text-align: center; margin-bottom: 2.5rem; }
.section-head h2 { font-size: clamp(1.8rem,4vw,2.6rem); margin-bottom: .25rem; }

/* Filter tabs */
.filter-wrap {
  display: flex; align-items: center; gap: .35rem;
  background: #fff; border-radius: 50px; padding: .5rem;
  width: fit-content; margin: 0 auto 1.25rem;
  position: relative; flex-wrap: wrap; justify-content: center;
  box-shadow: 0 2px 16px rgba(30,25,22,.07);
}
.filter-btn {
  background: transparent; border: none; border-radius: 50px;
  padding: .55rem 1.25rem; font-size: .82rem; font-weight: 600;
  color: #545454; cursor: pointer; white-space: nowrap;
  position: relative; z-index: 2; transition: color .3s;
}
.filter-btn.active { color: #1e1916; font-weight: 700; }
.filter-btn:hover:not(.active) { color: #eaa636; }
.filter-slider {
  position: absolute; left: 0; background: #eaa636; border-radius: 50px;
  z-index: 1; box-shadow: 0 4px 16px rgba(234,166,54,.35);
  transition: all .4s cubic-bezier(.4,0,.2,1);
}

/* Star filter */
.star-filter {
  display: flex; align-items: center; gap: .5rem;
  justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem;
}
.star-filter__label { font-size: .8rem; color: #777; font-weight: 600; }
.star-btn {
  display: inline-flex; align-items: center; gap: .25rem;
  padding: .35rem .85rem; border-radius: 50px; border: 1.5px solid #d2c3a8;
  background: transparent; font-size: .78rem; font-weight: 600; cursor: pointer;
  color: #1e1916; transition: all .3s;
}
.star-btn.active, .star-btn:hover { border-color: #eaa636; background: #eaa636; color: #1e1916; }
.star-btn--clear { border-color: #ccc; color: #999; }
.star-btn--clear:hover { border-color: #e57373; background: #e57373; color: #fff; }

/* Reviews grid — masonry-style auto-rows */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 1.4rem;
  margin-bottom: 2.5rem;
  align-items: start;
}
@media (max-width: 900px) { .reviews-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .reviews-grid { grid-template-columns: 1fr; } }

/* Review card — default (cream) */
.review-card {
  position: relative;
  background: linear-gradient(155deg, #fffdf7 0%, #fdf8f0 100%);
  border-radius: 20px;
  padding: 2rem 1.75rem 1.75rem;
  box-shadow: 0 4px 24px rgba(30,25,22,.06), inset 0 1px 0 rgba(255,255,255,.9);
  border: 1px solid rgba(234,166,54,.12);
  transition: transform .35s ease, box-shadow .35s ease;
  display: flex; flex-direction: column; gap: .85rem;
  overflow: hidden;
}
.review-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,166,54,.35), transparent);
}
.review-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(30,25,22,.09), inset 0 1px 0 rgba(255,255,255,.9);
}

/* Gold variant — soft champagne */
.review-card--gold {
  background: linear-gradient(145deg, #fef8ed 0%, #fdf0d0 55%, #fce8b2 100%);
  border: 1px solid rgba(234,166,54,.28);
  box-shadow: 0 6px 28px rgba(234,166,54,.18);
}
.review-card--gold::before {
  background: linear-gradient(90deg, transparent, rgba(234,166,54,.5), transparent);
}
.review-card--gold:hover {
  transform: translateY(-7px);
  box-shadow: 0 18px 44px rgba(234,166,54,.24);
}
.review-card--gold .review-card__quote { color: rgba(234,166,54,.22); }
.review-card--gold .review-card__text  { color: #5a4a2a; }
.review-card--gold .review-card__name  { color: #3a2e10; }
.review-card--gold .review-card__date  { color: #9a8050; }
.review-card--gold .review-card__rating {
  background: rgba(234,166,54,.18); color: #b07d1a;
}
.review-card--gold .review-card__tag {
  background: rgba(234,166,54,.2); color: #8a6010; border: 1px solid rgba(234,166,54,.3);
}
.review-card--gold .review-card__footer { border-top-color: rgba(234,166,54,.2); }
.review-card--gold .review-card__avatar { border-color: #eaa636; }

/* Soft warm taupe variant */
.review-card--dark {
  background: linear-gradient(145deg, #f7f3ee 0%, #f0eae0 60%, #ede4d6 100%);
  border: 1px solid rgba(180,150,110,.2);
  box-shadow: 0 6px 24px rgba(120,90,60,.1);
}
.review-card--dark::before {
  background: linear-gradient(90deg, transparent, rgba(180,140,90,.4), transparent);
}
.review-card--dark:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(120,90,60,.14);
}
.review-card--dark .review-card__quote { color: rgba(180,140,90,.22); }
.review-card--dark .review-card__text  { color: #5a4e40; }
.review-card--dark .review-card__name  { color: #2e2416; }
.review-card--dark .review-card__date  { color: #9a8870; }
.review-card--dark .review-card__rating {
  background: rgba(234,166,54,.14); color: #b07d1a;
}
.review-card--dark .review-card__tag {
  background: rgba(180,140,90,.15); color: #7a5c20; border: 1px solid rgba(180,140,90,.25);
}
.review-card--dark .review-card__footer { border-top-color: rgba(180,140,90,.18); }
.review-card--dark .review-card__avatar { border-color: #d4a84b; }

.review-card__quote {
  position: absolute; top: 1rem; right: 1.5rem;
  font-family: 'Playfair Display', serif;
  font-size: 5rem; line-height: 1; color: rgba(234,166,54,.12);
  pointer-events: none; user-select: none;
}
.review-card__stars {
  display: flex; align-items: center; gap: .15rem;
}
.review-card__rating {
  margin-left: .5rem; font-size: .8rem; font-weight: 700;
  color: #eaa636; background: #fff8eb;
  padding: .1rem .5rem; border-radius: 50px;
}
.review-card__text {
  font-size: .92rem; line-height: 1.75; color: #545454;
  font-style: italic; flex: 1;
}
.review-card__tag {
  display: inline-block; background: #fdf3e3;
  color: #b07d1a; font-size: .72rem; font-weight: 700;
  letter-spacing: .5px; padding: .3rem .85rem; border-radius: 50px;
  width: fit-content;
}
.review-card__footer {
  display: flex; align-items: center; gap: .85rem;
  padding-top: .85rem; border-top: 1px solid #f3ede3;
}
.review-card__avatar {
  width: 46px; height: 46px; border-radius: 50%; object-fit: cover;
  border: 2px solid #eaa636; flex-shrink: 0;
}
.review-card__name { font-weight: 700; font-size: .9rem; color: #1e1916; }
.review-card__date { font-size: .75rem; color: #a09080; margin-top: .1rem; }

/* Review Gallery */
.review-card__gallery {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.gallery-item {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(234, 166, 54, 0.15);
  cursor: pointer;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.gallery-item:hover img { transform: scale(1.1); }
.gallery-more {
  position: absolute;
  inset: 0;
  background: rgba(30,25,22,0.65);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

/* Loading & Error States */
.loading-state, .error-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(234, 166, 54, 0.04);
  border-radius: 20px;
  border: 1px dashed rgba(234, 166, 54, 0.2);
}
.loading-state p, .error-state p {
  margin-top: 1rem;
  font-weight: 600;
  color: #5a4a2a;
}

/* Infinite scroll */
.scroll-sentinel { height: 1px; }
.loading-more { display: flex; justify-content: center; padding: 2rem 0; }
.review-spinner {
  width: 32px; height: 32px;
  border: 3px solid #fdf5eb; border-left-color: #eaa636;
  border-radius: 50%; animation: spin 0.9s linear infinite;
}
/* Minimalist Empty State */
.empty-state-minimal {
  grid-column: 1 / -1;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 3rem auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.12);
  cursor: pointer;
}

.empty-state-img {
  width: 100%;
  display: block;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.empty-state-minimal:hover .empty-state-img {
  transform: scale(1.03);
}

.empty-state-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2));
  z-index: 1;
}

/* ── FORM SECTION ────────────────────────────────────── */
.form-section {
  position: relative; padding: 6rem 0;
  background: #1e1916; overflow: hidden;
}
.form-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 10% 50%, rgba(234,166,54,.1) 0%, transparent 55%),
    radial-gradient(ellipse at 90% 20%, rgba(234,166,54,.07) 0%, transparent 50%);
}
.form-card {
  background: #fff; border-radius: 24px;
  display: grid; grid-template-columns: 1fr 1.4fr; gap: 0;
  overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,.25);
}
@media (max-width: 820px) { .form-card { grid-template-columns: 1fr; } }

.form-card__left {
  background: linear-gradient(160deg,#fdf3e3 0%,#fff8ee 100%);
  padding: 3rem 2.5rem;
  border-right: 1px solid rgba(234,166,54,.15);
  display: flex; flex-direction: column; justify-content: center;
}
.form-card__left h2 { font-size: 1.9rem; margin-bottom: .25rem; }
.form-card__left > p { font-size: .93rem; line-height: 1.8; color: #545454; margin: 1.25rem 0 1.75rem; }

.form-card__perks { list-style: none; display: flex; flex-direction: column; gap: .65rem; }
.form-card__perks li { display: flex; align-items: center; gap: .7rem; font-size: .88rem; color: #1e1916; font-weight: 500; }
.perk-icon {
  width: 22px; height: 22px; border-radius: 50%; background: #eaa636;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.form-card__form { padding: 3rem 2.5rem; display: flex; flex-direction: column; gap: 1.35rem; }

.form-label { display: block; font-size: .8rem; font-weight: 700; color: #1e1916; letter-spacing: .5px; margin-bottom: .5rem; }
.form-input {
  width: 100%; padding: .75rem 1rem; border: 1.5px solid #e8dfd0;
  border-radius: 10px; font-size: .92rem; font-family: 'Open Sans', sans-serif;
  background: #fffdf7; color: #1e1916; transition: border-color .3s, box-shadow .3s;
  outline: none; appearance: none;
}
.form-input:focus { border-color: #eaa636; box-shadow: 0 0 0 3px rgba(234,166,54,.15); }
.form-textarea { resize: vertical; min-height: 120px; }
.form-select { cursor: pointer; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 560px) { .form-row { grid-template-columns: 1fr; } }

.form-char { align-self: flex-end; font-size: .75rem; color: #a09080; margin-top: -.5rem; }

.star-picker { display: flex; align-items: center; gap: .35rem; flex-wrap: wrap; }
.star-picker__label {
  margin-left: .75rem; font-size: .82rem; font-weight: 700;
  color: #eaa636; background: #fff8eb; padding: .2rem .7rem; border-radius: 50px;
}

.form-submit { margin-top: .5rem; }

.form-success {
  display: flex; align-items: center; gap: .6rem;
  background: #e8f5e9; color: #2e7d32;
  font-size: .88rem; font-weight: 600;
  padding: .85rem 1.25rem; border-radius: 10px;
  border: 1px solid #a5d6a7;
}

/* Success transition */
.fade-enter-active, .fade-leave-active { transition: opacity .4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Login Prompt */
.login-prompt {
  align-items: center; justify-content: center; text-align: center;
  padding: 5rem 2.5rem; background: #fffcf8;
}
.login-prompt h3 { font-size: 1.6rem; color: #1e1916; margin-bottom: 0.5rem; }
.login-prompt p { color: #545454; margin-bottom: 1.5rem; line-height: 1.6; }

/* Image Upload */
.file-upload-wrap { position: relative; }
.file-input { display: none; }
.file-upload-label {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.8rem 1rem; border: 1.5px dashed #eaa636; border-radius: 10px;
  color: #eaa636; font-weight: 600; cursor: pointer; transition: all 0.3s ease;
  background: rgba(234, 166, 54, 0.05);
}
.file-upload-label:hover { background: rgba(234, 166, 54, 0.1); }
.image-previews { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1rem; }
.preview-wrap { position: relative; width: 70px; height: 70px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.remove-btn {
  position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.6);
  color: #fff; width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;
  transition: background 0.2s;
}
.remove-btn:hover { background: #d32f2f; }
.form-input--readonly { background: #f5f5f5; cursor: not-allowed; color: #777; }

/* Service Selector Styles */
.services-selector-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
  background: #fdfdfd;
  border: 1.5px solid #e8dfd0;
  border-radius: 12px;
  max-height: 400px;
  overflow-y: auto;
}



.services-checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

.service-checkbox-item {
  cursor: pointer;
}

.hidden-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.checkbox-ui {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  background: #fff;
  border: 1px solid #e8dfd0;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #545454;
  transition: all 0.25s ease;
}

.service-checkbox-item:hover .checkbox-ui {
  border-color: #eaa636;
  background: rgba(234, 166, 54, 0.05);
}

.service-checkbox-item.selected .checkbox-ui {
  background: #eaa636;
  border-color: #eaa636;
  color: #1e1916;
  box-shadow: 0 4px 12px rgba(234, 166, 54, 0.25);
}

/* ── CTA ─────────────────────────────────────────────── */
.cta-section { position: relative; min-height: 460px; display: flex; align-items: center; overflow: hidden; }
.cta-bg { position: absolute; inset: 0; z-index: 0; }
.cta-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.cta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg,rgba(30,25,22,.93) 0%,rgba(30,25,22,.80) 50%,rgba(30,25,22,.62) 100%);
}
.cta-content { position: relative; z-index: 2; text-align: center; padding: 5rem 0; }
.cta-content h2 { font-size: clamp(1.9rem,5vw,2.9rem); color: #fff; margin-bottom: 1rem; margin-top: .5rem; }
.cta-content p { color: rgba(255,255,255,.7); font-size: 1rem; max-width: 520px; margin: 0 auto 2rem; line-height: 1.8; }
.cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
</style>
