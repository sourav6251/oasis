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

        <!-- Grid -->
        <div class="reviews-grid">
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

            <!-- Service tag -->
            <span class="review-card__tag">{{ review.service }}</span>

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
        <div v-if="!filteredReviews.length" class="empty-state">
          <v-icon icon="mdi-comment-remove-outline" size="52" color="#eaa636"></v-icon>
          <p>No reviews found for this filter combination.</p>
          <button class="btn-gold" @click="resetFilters">Clear Filters</button>
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
          <form class="form-card__form" @submit.prevent="submitReview">
            <!-- Rating -->
            <div class="form-group">
              <label class="form-label">Your Rating *</label>
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

            <!-- Name + email -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder="Priya Sharma"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="priya@example.com"
                />
              </div>
            </div>

            <!-- Service -->
            <div class="form-group">
              <label class="form-label">Service Received *</label>
              <select v-model="form.service" class="form-input form-select" required>
                <option value="" disabled selected>Select a service…</option>
                <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
              </select>
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

            <!-- Submit -->
            <button type="submit" class="btn-gold form-submit">
              <v-icon icon="mdi-send" size="18"></v-icon>
              Submit Review
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
import { defineComponent, ref, computed, nextTick, watch, onMounted, type ComponentPublicInstance } from 'vue';
import { reviews, type Review } from '@/sampleData/BlogData';

export default defineComponent({
  name: 'ClientReviews',

  setup() {
    /* ── DATA ─────────────────────────────────────────── */
    const reviewData = ref<Review[]>([...reviews]);

    const stats = [
      { value: '4.9',  label: 'Average Rating',    icon: 'mdi-star'           },
      { value: '500+', label: 'Happy Clients',      icon: 'mdi-account-group'  },
      { value: '98%',  label: 'Would Recommend',    icon: 'mdi-thumb-up'       },
      { value: '250+', label: '5-Star Reviews',     icon: 'mdi-certificate'    },
    ];

    const perks = [
      'Takes under 2 minutes',
      'Completely anonymous option available',
      'Helps future clients choose wisely',
      'We personally respond to every review',
    ];

    const services = [
      'Bridal Makeup', 'Party Makeup', 'Hair Styling', 'Hair Coloring',
      'Hair Spa', 'Keratin Treatment', 'Facial', 'Manicure',
      'Pedicure', 'Nail Art', 'Full Body Spa', 'Aromatherapy Spa',
      'Waxing', 'Mehndi', 'Makeover', 'Hair Cut',
    ];

    /* ── FILTER ───────────────────────────────────────── */
    const filterOptions = ['All', 'Bridal', 'Hair', 'Makeup', 'Nails', 'Spa'];
    const activeFilter  = ref<string>('All');
    const starFilter    = ref<number | null>(null);
    const visibleCount  = ref<number>(6);
    const loadingMore   = ref<boolean>(false);
    const sentinelRef   = ref<HTMLElement | null>(null);
    let   observer: IntersectionObserver | null = null;

    const serviceCategory = (service: string) => {
      const s = service.toLowerCase();
      if (s.includes('bridal') || s.includes('mehndi') || s.includes('makeover')) return 'Bridal';
      if (s.includes('hair')) return 'Hair';
      if (s.includes('makeup') || s.includes('facial')) return 'Makeup';
      if (s.includes('mani') || s.includes('pedi') || s.includes('nail')) return 'Nails';
      if (s.includes('spa') || s.includes('aroma') || s.includes('wax') || s.includes('keratin')) return 'Spa';
      return 'Other';
    };

    const filteredReviews = computed(() => {
      let list = reviewData.value;
      if (activeFilter.value !== 'All')
        list = list.filter(r => serviceCategory(r.service) === activeFilter.value);
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

    const form = ref({
      name: '', email: '', rating: 0, service: '', review: '',
    });

    const ratingLabel = computed(() => {
      const labels: Record<number, string> = {
        1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent',
      };
      return labels[form.value.rating] || '';
    });

    const submitReview = () => {
      submitted.value = true;
      form.value = { name: '', email: '', rating: 0, service: '', review: '' };
      setTimeout(() => (submitted.value = false), 5000);
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
    onMounted(() => {
      setTimeout(() => { updateSlider(0); setupObserver(); }, 200);
    });

    // Re-attach observer when filter changes (sentinel re-renders)
    watch([activeFilter, starFilter], async () => {
      visibleCount.value = 6;
      await nextTick();
      setupObserver();
    });

    return {
      stats, perks, services, filterOptions, activeFilter, starFilter,
      filteredReviews, visibleReviews, visibleCount, loadingMore, sentinelRef,
      hoverRating, form, ratingLabel, submitted,
      sliderStyle, setFilterRef, setFilter, resetFilters,
      submitReview, formatDate, cardClass,
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
  background: linear-gradient(180deg,#fdf3e3 0%,#fff8ee 40%,#fffcf7 75%,#fdf5eb 100%);
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

/* Infinite scroll */
.scroll-sentinel { height: 1px; }
.loading-more { display: flex; justify-content: center; padding: 2rem 0; }
.review-spinner {
  width: 32px; height: 32px;
  border: 3px solid #fdf5eb; border-left-color: #eaa636;
  border-radius: 50%; animation: spin 0.9s linear infinite;
}
.empty-state p { margin: 1rem 0 1.5rem; font-size: 1rem; }

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
