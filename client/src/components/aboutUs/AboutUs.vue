<template>
  <section class="about-stitch">

    <!-- ─── HERO ─────────────────────────────────────────────── -->
    <div class="hero-section">
      <div class="hero-bg">
        <img src="/redesign/hero_orchids_candles.png" alt="Luxury Spa" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <p class="hero-tagline">Welcome to Oasis, where beauty meets tranquility in the heart of Tamluk. We blend cutting-edge artists with wellness to offer an unparalleled experience.</p>
        <h1 class="hero-title">The Oasis Story</h1>
      </div>
    </div>

    <!-- ─── OUR EXCELLENCE STATS ─────────────────────────────── -->
    <div class="excellence-section">
      <h2 class="excellence-title">Our Excellence</h2>
      <div class="stats-row">

        <!-- Happy Clients -->
        <div class="stat-badge fade-up" style="animation-delay:0ms">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="16" r="8" stroke="#c9a96e" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#c9a96e" stroke-width="2.2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="stat-number">2500+</div>
          <div class="stat-label">Happy Clients</div>
        </div>

        <!-- Pro Services -->
        <div class="stat-badge fade-up" style="animation-delay:150ms">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="18" width="32" height="22" rx="3" stroke="#c9a96e" stroke-width="2.2"/>
              <path d="M16 18V14a8 8 0 0 1 16 0v4" stroke="#c9a96e" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="24" y1="26" x2="24" y2="32" stroke="#c9a96e" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="21" y1="29" x2="27" y2="29" stroke="#c9a96e" stroke-width="2.2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="stat-number">50+</div>
          <div class="stat-label">Pro Services</div>
        </div>

        <!-- Expert Years -->
        <div class="stat-badge fade-up" style="animation-delay:300ms">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="20" r="10" stroke="#c9a96e" stroke-width="2.2"/>
              <path d="M16 28.5l-4 10 12-5 12 5-4-10" stroke="#c9a96e" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M21 20l2 2 4-4" stroke="#c9a96e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-number">10+</div>
          <div class="stat-label">Expert Years</div>
        </div>

        <!-- Satisfaction -->
        <div class="stat-badge fade-up" style="animation-delay:450ms">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="15" stroke="#c9a96e" stroke-width="2.2"/>
              <path d="M17 24l5 5 9-9" stroke="#c9a96e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-number">100%</div>
          <div class="stat-label">Satisfaction</div>
        </div>

      </div>
    </div>

    <!-- ─── WHY OASIS ─────────────────────────────────────────── -->
    <div class="why-section">
      <h2 class="section-label dark-label">Why Oasis?</h2>
      <div class="why-grid">

        <!-- 1: Expert Professionals (light) -->
        <div class="why-card fade-up" style="animation-delay:0ms">
          <div class="why-icon">
            <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="10" r="5.5" stroke="#8a6a3a" stroke-width="1.8"/><path d="M5 28c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="#8a6a3a" stroke-width="1.8" stroke-linecap="round"/></svg>
          </div>
          <h3 class="why-title">Expert<br/>Professionals</h3>
          <p class="why-desc">Expert team treatments and professional stilers inner wellness and outer radiance.</p>
        </div>

        <!-- 2: Premium Products (DARK highlighted) -->
        <div class="why-card why-card--highlight fade-up" style="animation-delay:100ms">
          <div class="why-icon">
            <svg viewBox="0 0 32 32" fill="none"><polygon points="16,3 20,11 29,12.5 22.5,19 24,28 16,23.5 8,28 9.5,19 3,12.5 12,11" stroke="#d4a84b" stroke-width="1.8" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="why-title">Premium Products</h3>
          <p class="why-desc">Premium products for tone and anthylic endtime quality products.</p>
        </div>

        <!-- 3: Modern Techniques (light) -->
        <div class="why-card fade-up" style="animation-delay:200ms">
          <div class="why-icon">
            <svg viewBox="0 0 32 32" fill="none"><line x1="6" y1="26" x2="26" y2="6" stroke="#8a6a3a" stroke-width="1.8" stroke-linecap="round"/><circle cx="24" cy="8" r="3" stroke="#8a6a3a" stroke-width="1.7"/><circle cx="8" cy="24" r="3" stroke="#8a6a3a" stroke-width="1.7"/></svg>
          </div>
          <h3 class="why-title">Modern Techniques</h3>
          <p class="why-desc">Modern techniques with mesical activities and tumarations and untigra cte solutions.</p>
        </div>

        <!-- 4: Personalized Care (light) -->
        <div class="why-card fade-up" style="animation-delay:300ms">
          <div class="why-icon">
            <svg viewBox="0 0 32 32" fill="none"><path d="M16 27S5 20 5 12a7 7 0 0 1 11-5.74A7 7 0 0 1 27 12c0 8-11 15-11 15z" stroke="#8a6a3a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="why-title">Personalized Care</h3>
          <p class="why-desc">We owur same quallis teamingto adver thering our personalised care.</p>
        </div>

        <!-- 5: Hygienic Environment (light) -->
        <div class="why-card fade-up" style="animation-delay:400ms">
          <div class="why-icon">
            <svg viewBox="0 0 32 32" fill="none"><path d="M16 4 L27 9v7c0 7-5 12-11 14C10 28 5 23 5 16V9z" stroke="#8a6a3a" stroke-width="1.8" stroke-linejoin="round"/><path d="M11 16 l3 3 7-7" stroke="#8a6a3a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="why-title">Hygienic<br/>Environment</h3>
          <p class="why-desc">Hygienic environment, oer profhodiced and pieramdement and coemtenance.</p>
        </div>

        <!-- 6: Flexible Booking (DARK highlighted) -->
        <div class="why-card why-card--highlight fade-up" style="animation-delay:500ms">
          <div class="why-icon">
            <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="22" rx="3" stroke="#d4a84b" stroke-width="1.8"/><line x1="4" y1="13" x2="28" y2="13" stroke="#d4a84b" stroke-width="1.8"/><line x1="10" y1="3" x2="10" y2="9" stroke="#d4a84b" stroke-width="1.8" stroke-linecap="round"/><line x1="22" y1="3" x2="22" y2="9" stroke="#d4a84b" stroke-width="1.8" stroke-linecap="round"/><rect x="9" y="17" width="4" height="4" rx="1" fill="#d4a84b"/><rect x="19" y="17" width="4" height="4" rx="1" fill="#d4a84b"/></svg>
          </div>
          <h3 class="why-title">Flexible Booking</h3>
          <p class="why-desc">Booking ocerr-chitersesorcties creates sondtic tms ffor your timelines.</p>
        </div>

      </div>
    </div>

    <!-- ─── OUR PROMISE ─────────────────────────────── -->
    <div class="promise-section">
      <!-- Background image -->
      <img class="promise-bg" src="/redesign/luxury_salon_promise.png" alt="Our Promise" />
      <!-- Dark gradient overlay -->
      <div class="promise-overlay"></div>
      <!-- Centered content -->
      <div class="promise-content">
        <span class="promise-eyebrow">The Oasis Guarantee</span>
        <h2 class="promise-title">Our Promise</h2>
        <p class="promise-desc">
          At Oasis, we believe that beauty comes from harmony between inner
          wellness and outer radiance. Our holistic approach combines premium
          treatments with personalized care, ensuring every client leaves feeling
          restored, confident, and more beautifully themselves.
        </p>
        <div class="promise-divider"></div>
        <!-- CTA buttons overlaid on the image -->
        <div class="promise-actions">
          <button class="cta-book-btn" @click="bookNow">Book Your Experience</button>
          <button class="cta-explore-btn" @click="exploreServices">Explore Services</button>
        </div>
      </div>
    </div>


  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Stats are now rendered statically in the template with inline SVGs

// Features rendered statically in template with inline SVGs

const bookNow = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

const exploreServices = () => {
  const el = document.getElementById('services');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,600&family=Inter:wght@300;400;500;600&display=swap');

/* ── KEYFRAME ANIMATIONS ─────────────────────────────── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  opacity: 0;
  animation: fadeUp 0.65s ease forwards;
}

/* ── TOKENS ──────────────────────────────────────────── */
.about-stitch {
  --gold:        #c9a96e;
  --gold-light:  #e8c98a;
  --cream:       #f5f0e8;
  --cream-mid:   #ede7db;
  --dark:        #2c2217;
  --dark-card:   #3a2d1e;
  --text-body:   #6b5e4e;
  --text-muted:  #9e8e7e;
  --white:       #ffffff;

  font-family: 'Inter', sans-serif;
  background: var(--cream);
  overflow-x: hidden;
}

/* ── HERO ────────────────────────────────────────────── */
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 480px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  padding-bottom: 3rem;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(44, 34, 23, 0.25) 0%,
    rgba(44, 34, 23, 0.65) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  padding: 0 1.5rem;
}

.hero-tagline {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  font-weight: 400;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 800;
  color: var(--white);
  line-height: 1.1;
  margin: 0;
}

/* ── OUR EXCELLENCE ──────────────────────────────────── */
.excellence-section {
  background: var(--cream);
  padding: 4rem 2rem 3.5rem;
  text-align: center;
}

.excellence-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 2.5rem;
  letter-spacing: 0.01em;
}

.section-label {
  font-family: 'Playfair Display', serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.dark-label {
  color: var(--dark);
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 860px;
  margin: 0 auto;
}

.stat-badge {
  /* Warm beige radial gradient — lighter centre, warmer rim */
  background: radial-gradient(circle at 40% 35%, #fdf8f0 0%, #f0e6d0 60%, #e8d8b8 100%);
  /* Double-ring: outer soft gold, inner tighter line */
  border: 3px solid rgba(201, 169, 110, 0.55);
  outline: 6px solid rgba(201, 169, 110, 0.18);
  border-radius: 50%;
  width: 175px;
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.10),
    inset 0 2px 8px rgba(255, 255, 255, 0.6);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  cursor: default;
}

.stat-badge:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow:
    0 20px 50px rgba(201, 169, 110, 0.22),
    inset 0 2px 8px rgba(255, 255, 255, 0.6);
  border-color: var(--gold);
  outline-color: rgba(201, 169, 110, 0.3);
}

.stat-icon-wrap {
  width: 46px;
  height: 46px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrap svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 1px 2px rgba(201, 169, 110, 0.35));
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--dark);
  line-height: 1;
}

.stat-label {
  font-size: 0.7rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--text-body);
  font-weight: 600;
  margin-top: 0.35rem;
}

/* ── WHY OASIS SECTION ──────────────────────────────── */
.why-section {
  background: var(--cream);
  padding: 3.5rem 2rem 5rem;
  text-align: center;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 900px;
  margin: 2rem auto 0;
}

/* Light card — sandy warm beige, matches image */
.why-card {
  background: #c8b99a;
  border-radius: 14px;
  padding: 1.6rem 1.4rem 1.75rem;
  text-align: left;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 160px;
}

.why-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.12);
}

/* Dark highlighted card — deep charcoal/brown, matches image */
.why-card--highlight {
  background: #2c2010;
}

.why-card--highlight .why-title {
  color: #ffffff;
}

.why-card--highlight .why-desc {
  color: rgba(255, 255, 255, 0.6);
}

/* SVG icon — small, top-left */
.why-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 0.85rem;
  display: flex;
  align-items: flex-start;
}

.why-icon svg {
  width: 100%;
  height: 100%;
}

.why-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #2c2010;
  margin-bottom: 0.5rem;
  line-height: 1.25;
}

.why-desc {
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(44, 32, 16, 0.7);
}

/* ── OUR PROMISE ─────────────────────────────────────── */
/* ── OUR PROMISE ──────────────────────────────────── */
.promise-section {
  position: relative;
  min-height: 480px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Full-bleed background image */
.promise-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
}

/* Dark gradient overlay for readability */
.promise-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(20, 12, 4, 0.62) 0%,
    rgba(20, 12, 4, 0.78) 60%,
    rgba(20, 12, 4, 0.85) 100%
  );
}

/* Centered text content — sits above overlay */
.promise-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 5rem 2rem;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* Eyebrow label above title */
.promise-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 0.85rem;
}

.promise-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.4rem;
  line-height: 1.15;
}

.promise-desc {
  font-size: 1rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.72);
  max-width: 560px;
}

/* Decorative gold line below text */
.promise-divider {
  width: 56px;
  height: 2px;
  background: var(--gold);
  margin-top: 2rem;
  border-radius: 2px;
  opacity: 0.8;
}

/* Buttons centered over the background image */
.promise-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

/* ── CTA FOOTER ──────────────────────────────────────── */
.cta-footer {
  background: var(--dark);
  border-top: 1px solid rgba(201, 169, 110, 0.2);
  padding: 1.6rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.cta-book-btn {
  background: var(--gold);
  color: var(--dark);
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  white-space: nowrap;
}

.cta-book-btn:hover {
  background: var(--gold-light);
  transform: scale(1.04);
  box-shadow: 0 8px 28px rgba(201, 169, 110, 0.28);
}

.cta-explore-btn {
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
  white-space: nowrap;
}

.cta-explore-btn:hover {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.55);
}

.social-links {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-link {
  color: rgba(255, 255, 255, 0.6);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  text-decoration: none;
}

.social-link svg {
  width: 100%;
  height: 100%;
}

.social-link:hover {
  color: var(--gold-light);
}

.social-handle {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
}

/* ── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 900px) {
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .promise-section {
    min-height: 400px;
  }

  .promise-content {
    padding: 4rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .hero-section {
    height: 52vh;
    min-height: 360px;
  }

  .hero-tagline {
    font-size: 0.82rem;
  }

  .stats-row {
    gap: 1rem;
  }

  .stat-badge {
    width: 130px;
    height: 130px;
  }

  .stat-number {
    font-size: 1.4rem;
  }

  .why-grid {
    grid-template-columns: 1fr;
  }

  .cta-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .social-links {
    margin-left: 0;
  }
}
</style>
