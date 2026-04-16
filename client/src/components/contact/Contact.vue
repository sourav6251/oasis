<template>
  <div class="contact-page">

    <!-- ── HERO ──────────────────────────────────────── -->
    <section class="contact-hero">
      <div class="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80"
          alt="Contact Oasis"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="container hero-content">
        <span
          class="eyebrow"
          v-motion :initial="{ opacity:0, y:20 }" :enter="{ opacity:1, y:0 }" :duration="800"
        >We'd Love to Hear From You</span>
        <h1
          v-motion :initial="{ opacity:0, y:40 }" :enter="{ opacity:1, y:0 }" :duration="1000" :delay="150"
        >Get In <span class="gold">Touch</span></h1>
        <p
          v-motion :initial="{ opacity:0, y:30 }" :enter="{ opacity:1, y:0 }" :duration="900" :delay="300"
        >
          Whether it's a booking, a question, or just a hello — our team is here for you.
        </p>
        <div
          class="hero-divider"
          v-motion :initial="{ opacity:0 }" :enter="{ opacity:1 }" :duration="800" :delay="500"
        >
          <span></span><span class="dot"></span><span></span>
        </div>
      </div>
    </section>

    <!-- ── INFO + FORM GRID ───────────────────────────── -->
    <section class="main-section">
      <div class="container main-grid">

        <!-- ── LEFT: INFO CARDS ────────────────────────── -->
        <div class="info-col">

          <div
            class="section-head"
            v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700"
          >
            <span class="eyebrow eyebrow--dark">Contact Details</span>
            <h2>Reach <span class="gold">Oasis</span></h2>
            <div class="section-divider">
              <span></span><span class="dot"></span><span></span>
            </div>
          </div>

          <!-- Info tiles -->
          <div class="info-tiles">
            <div
              v-for="(item, i) in infoItems"
              :key="item.label"
              class="info-tile"
              v-motion :initial="{ opacity:0, x:-30 }" :visibleOnce="{ opacity:1, x:0 }" :delay="i*110" :duration="700"
            >
              <div class="info-tile__icon">
                <v-icon :icon="item.icon" size="22" color="#eaa636"></v-icon>
              </div>
              <div class="info-tile__body">
                <h3>{{ item.label }}</h3>
                <p v-html="item.value"></p>
              </div>
            </div>
          </div>

          <!-- Hours card -->
          <div
            class="hours-card"
            v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700" :delay="450"
          >
            <div class="hours-card__head">
              <v-icon icon="mdi-clock-outline" size="18" color="#eaa636"></v-icon>
              <span>Opening Hours</span>
            </div>
            <div class="hours-row" v-for="h in hours" :key="h.day">
              <span class="day">{{ h.day }}</span>
              <span class="dots"></span>
              <span class="time" :class="{ closed: h.time === 'Closed' }">{{ h.time }}</span>
            </div>
          </div>

          <!-- Social -->
          <div
            class="social-block"
            v-motion :initial="{ opacity:0, y:16 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700" :delay="560"
          >
            <p class="social-block__label">Follow us</p>
            <div class="social-icons">
              <a
                v-for="s in socials"
                :key="s.icon"
                :href="s.href"
                target="_blank"
                rel="noopener"
                class="social-btn"
                :aria-label="s.label"
              >
                <v-icon :icon="s.icon" size="20" color="#eaa636"></v-icon>
              </a>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: FORM ─────────────────────────────── -->
        <div
          class="form-col"
          v-motion :initial="{ opacity:0, x:40 }" :visibleOnce="{ opacity:1, x:0 }" :duration="900" :delay="150"
        >
          <div class="form-card">
            <div class="form-card__head">
              <span class="eyebrow eyebrow--dark">Drop Us a Line</span>
              <h2>Send a <span class="gold">Message</span></h2>
            </div>

            <form @submit.prevent="submitForm" class="the-form">

              <!-- Name + Phone -->
              <div class="f-row">
                <div class="f-group">
                  <label class="f-label">Full Name *</label>
                  <div class="f-input-wrap">
                    <v-icon icon="mdi-account-outline" size="18" class="f-icon" color="#c8a96e"></v-icon>
                    <input
                      v-model="form.name"
                      type="text"
                      class="f-input"
                      placeholder="Priya Sharma"
                      required
                    />
                  </div>
                </div>
                <div class="f-group">
                  <label class="f-label">Phone Number</label>
                  <div class="f-input-wrap">
                    <v-icon icon="mdi-phone-outline" size="18" class="f-icon" color="#c8a96e"></v-icon>
                    <input
                      v-model="form.phone"
                      type="tel"
                      class="f-input"
                      placeholder="+91 99322 69688"
                    />
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="f-group">
                <label class="f-label">Email Address</label>
                <div class="f-input-wrap">
                  <v-icon icon="mdi-email-outline" size="18" class="f-icon" color="#c8a96e"></v-icon>
                  <input
                    v-model="form.email"
                    type="email"
                    class="f-input"
                    placeholder="priya@example.com"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div class="f-group">
                <label class="f-label">Subject *</label>
                <div class="f-input-wrap">
                  <v-icon icon="mdi-help-circle-outline" size="18" class="f-icon" color="#c8a96e"></v-icon>
                  <select v-model="form.subject" class="f-input f-select" required>
                    <option value="" disabled>Select a subject…</option>
                    <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div class="f-group">
                <label class="f-label">Your Message *</label>
                <div class="f-input-wrap f-input-wrap--textarea">
                  <v-icon icon="mdi-message-outline" size="18" class="f-icon f-icon--top" color="#c8a96e"></v-icon>
                  <textarea
                    v-model="form.message"
                    class="f-input f-textarea"
                    rows="5"
                    maxlength="600"
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>
                <span class="f-char">{{ form.message.length }}/600</span>
              </div>

              <!-- Submit -->
              <button type="submit" class="btn-gold form-submit">
                <v-icon icon="mdi-send" size="18"></v-icon>
                Send Message
              </button>

              <!-- Success -->
              <Transition name="fade">
                <div v-if="submitted" class="f-success">
                  <v-icon icon="mdi-check-circle" size="20" color="#2e7d32"></v-icon>
                  Message sent! We'll get back to you within 24 hours.
                </div>
              </Transition>

            </form>
          </div>
        </div>

      </div>
    </section>

    <!-- ── MAP ────────────────────────────────────────── -->
    <section class="map-section">
      <div class="container">
        <div
          class="map-head"
          v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700"
        >
          <span class="eyebrow eyebrow--dark">Find Us</span>
          <h2>Our <span class="gold">Location</span></h2>
          <div class="section-divider section-divider--center">
            <span></span><span class="dot"></span><span></span>
          </div>
          <p>Oasis Makeover · 2nd Floor, Left Side of Rupasree Cinema Hall, Tamluk</p>
        </div>
        <div
          class="map-frame"
          v-motion :initial="{ opacity:0, y:30 }" :visibleOnce="{ opacity:1, y:0 }" :duration="900" :delay="150"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.7835859964234!2d87.9229940317383!3d22.286186264583712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0295966a336347%3A0x779f2f1d1f0a722f!2sOasis%20Makeover-Professional%20Beauty%20Premium%20%26%20Academy!5e0!3m2!1sen!2sin!4v1760371225912!5m2!1sen!2sin"
            width="100%"
            height="440"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Oasis Makeover Location"
          ></iframe>
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
          class="eyebrow"
          v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="700"
        >Ready for a Transformation?</span>
        <h2
          v-motion :initial="{ opacity:0, y:36 }" :visibleOnce="{ opacity:1, y:0 }" :duration="900" :delay="150"
        >Book Your <span class="gold">Appointment</span></h2>
        <p
          v-motion :initial="{ opacity:0 }" :visibleOnce="{ opacity:1 }" :duration="800" :delay="300"
        >Call us or chat on WhatsApp for instant bookings.</p>
        <div
          class="cta-btns"
          v-motion :initial="{ opacity:0, y:20 }" :visibleOnce="{ opacity:1, y:0 }" :duration="800" :delay="450"
        >
          <a href="tel:9932269688" class="btn-gold">
            <v-icon icon="mdi-phone" size="18"></v-icon> Call Now
          </a>
          <a href="https://wa.me/9932269688" class="btn-whatsapp" target="_blank" rel="noopener">
            <v-icon icon="mdi-whatsapp" size="20" color="white"></v-icon> WhatsApp Us
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ContactPage',

  setup() {
    /* ── INFO DATA ────────────────────────────────────── */
    const infoItems = [
      {
        icon: 'mdi-map-marker-outline',
        label: 'Visit Us',
        value: '2nd Floor, Left Side of Rupasree Cinema Hall,<br>Tamluk, West Bengal',
      },
      {
        icon: 'mdi-phone-outline',
        label: 'Call Us',
        value: '<a href="tel:9531500843">9531500843</a> &nbsp;/&nbsp; <a href="tel:9932269688">9932269688</a>',
      },
      {
        icon: 'mdi-email-outline',
        label: 'Email Us',
        value: '<a href="mailto:oasismakeover@gmail.com">oasismakeover@gmail.com</a>',
      },
    ];

    const hours = [
      { day: 'Monday',    time: 'Closed'     },
      { day: 'Tue – Sun', time: '9:00 AM – 7:00 PM' },
    ];

    const socials = [
      { icon: 'mdi-facebook',  href: '#', label: 'Facebook'  },
      { icon: 'mdi-instagram', href: '#', label: 'Instagram' },
      { icon: 'mdi-whatsapp',  href: 'https://wa.me/9932269688', label: 'WhatsApp' },
      { icon: 'mdi-pinterest', href: '#', label: 'Pinterest' },
    ];

    const subjects = [
      'General Inquiry',
      'Appointment Booking',
      'Service Information',
      'Pricing Query',
      'Feedback',
      'Other',
    ];

    /* ── FORM ─────────────────────────────────────────── */
    const form = ref({ name: '', email: '', phone: '', subject: '', message: '' });
    const submitted = ref(false);

    const submitForm = () => {
      submitted.value = true;
      form.value = { name: '', email: '', phone: '', subject: '', message: '' };
      setTimeout(() => (submitted.value = false), 5000);
    };

    return { infoItems, hours, socials, subjects, form, submitted, submitForm };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

/* ── TOKENS ──────────────────────────────────────────── */
* { box-sizing: border-box; margin: 0; padding: 0; }
.contact-page { font-family: 'Open Sans', sans-serif; background: #fffdf7; color: #545454; }
.container { max-width: 1140px; margin: 0 auto; padding: 0 1.5rem; }

h1, h2, h3 { font-family: 'Playfair Display', serif; color: #1e1916; line-height: 1.15; }
.gold { color: #eaa636; }

.eyebrow {
  display: inline-block; font-size: .7rem; font-weight: 700;
  letter-spacing: 4px; text-transform: uppercase; color: #eaa636; margin-bottom: .85rem;
}
.eyebrow--dark { color: #eaa636; }

.hero-divider, .section-divider {
  display: flex; align-items: center; gap: .75rem; margin-top: 1.4rem;
}
.section-divider--center { justify-content: center; }
.hero-divider span:not(.dot), .section-divider span:not(.dot) {
  width: 56px; height: 1px; background: rgba(234,166,54,.4);
}
.hero-divider .dot, .section-divider .dot {
  width: 7px; height: 7px; border-radius: 50%; background: #eaa636;
}

.btn-gold {
  display: inline-flex; align-items: center; gap: .5rem;
  background: #eaa636; color: #1e1916;
  font-family: 'Playfair Display', serif; font-weight: 700;
  font-size: .86rem; letter-spacing: .05em; text-transform: uppercase;
  padding: .85rem 2rem; border: none; border-radius: 50px; cursor: pointer;
  text-decoration: none;
  box-shadow: 0 5px 18px rgba(234,166,54,.32); position: relative; overflow: hidden; z-index: 1;
  transition: all .35s ease;
}
.btn-gold::before {
  content: ''; position: absolute; inset: 0; background: #1e1916;
  width: 0; transition: width .35s ease; z-index: -1; border-radius: 50px;
}
.btn-gold:hover { color: #fff; transform: translateY(-3px); }
.btn-gold:hover::before { width: 100%; }

.btn-whatsapp {
  display: inline-flex; align-items: center; gap: .5rem;
  background: #198754; color: #fff; font-weight: 700;
  font-size: .85rem; letter-spacing: .05em; text-transform: uppercase;
  padding: .85rem 2rem; border-radius: 50px; text-decoration: none; transition: all .35s ease;
}
.btn-whatsapp:hover { background: #157347; transform: translateY(-3px); }

/* ── HERO ────────────────────────────────────────────── */
.contact-hero {
  position: relative; min-height: 64vh;
  display: flex; align-items: flex-end; padding-bottom: 5rem; overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 35%; }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(30,25,22,.94) 0%, rgba(30,25,22,.72) 55%, rgba(30,25,22,.45) 100%);
}
.hero-content { position: relative; z-index: 2; text-align: center; }
.hero-content h1 { font-size: clamp(2.3rem,6vw,3.75rem); color: #fff; margin-bottom: .9rem; }
.hero-content > p { color: rgba(255,255,255,.72); font-size: 1.05rem; max-width: 520px; margin: 0 auto; line-height: 1.8; }

/* ── MAIN SECTION ────────────────────────────────────── */
.main-section {
  padding: 5.5rem 0 4rem;
  background: linear-gradient(180deg, #fdf3e3 0%, #fff8ee 35%, #fffcf7 70%, #fdf5eb 100%);
}
.main-grid {
  display: grid; grid-template-columns: 1fr 1.35fr; gap: 2.75rem; align-items: start;
}
@media (max-width: 900px) { .main-grid { grid-template-columns: 1fr; } }

/* ── SECTION HEAD ────────────────────────────────────── */
.section-head { margin-bottom: 2rem; }
.section-head h2 { font-size: clamp(1.7rem,4vw,2.3rem); }

/* ── INFO TILES ──────────────────────────────────────── */
.info-tiles { display: flex; flex-direction: column; gap: .9rem; margin-bottom: 1.5rem; }

.info-tile {
  display: flex; align-items: flex-start; gap: 1.1rem;
  background: #fff; border-radius: 14px; padding: 1.25rem 1.4rem;
  border: 1px solid rgba(234,166,54,.13);
  box-shadow: 0 3px 18px rgba(30,25,22,.06);
  transition: transform .3s ease, box-shadow .3s ease;
}
.info-tile:hover { transform: translateX(5px); box-shadow: 0 8px 28px rgba(30,25,22,.1); }

.info-tile__icon {
  width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, #fef8ed 0%, #fce8b2 100%);
  border: 1px solid rgba(234,166,54,.25);
  display: flex; align-items: center; justify-content: center;
}
.info-tile__body h3 { font-size: .95rem; color: #1e1916; margin-bottom: .25rem; font-family: 'Playfair Display', serif; }
.info-tile__body p { font-size: .87rem; color: #666; line-height: 1.7; }
.info-tile__body :deep(a) { color: #b07d1a; text-decoration: none; font-weight: 600; }
.info-tile__body :deep(a:hover) { text-decoration: underline; }

/* ── HOURS CARD ──────────────────────────────────────── */
.hours-card {
  background: #1e1916; border-radius: 16px; padding: 1.4rem 1.6rem;
  margin-bottom: 1.5rem; border: 1px solid rgba(234,166,54,.15);
}
.hours-card__head {
  display: flex; align-items: center; gap: .6rem;
  font-size: .78rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  color: #eaa636; margin-bottom: 1.1rem;
}
.hours-row {
  display: flex; align-items: center; gap: .5rem;
  font-size: .88rem; margin-bottom: .6rem;
}
.hours-row:last-child { margin-bottom: 0; }
.day { color: rgba(255,255,255,.7); min-width: 80px; }
.dots { flex: 1; border-bottom: 1px dotted rgba(255,255,255,.15); }
.time { color: #eaa636; font-weight: 600; }
.time.closed { color: rgba(255,255,255,.35); }

/* ── SOCIAL ──────────────────────────────────────────── */
.social-block { display: flex; align-items: center; gap: 1rem; }
.social-block__label { font-size: .78rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #a09080; }
.social-icons { display: flex; gap: .6rem; }
.social-btn {
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(234,166,54,.3);
  background: #fff; display: flex; align-items: center; justify-content: center;
  transition: all .3s ease; text-decoration: none;
}
.social-btn:hover { background: #eaa636; border-color: #eaa636; transform: translateY(-3px); }
.social-btn:hover :deep(.v-icon) { color: #1e1916 !important; }

/* ── FORM CARD ───────────────────────────────────────── */
.form-card {
  background: #fff; border-radius: 22px; padding: 2.75rem 2.5rem;
  box-shadow: 0 12px 50px rgba(30,25,22,.09);
  border: 1px solid rgba(234,166,54,.12);
}
.form-card__head { margin-bottom: 2rem; }
.form-card__head h2 { font-size: clamp(1.5rem,3vw,2rem); }

.the-form { display: flex; flex-direction: column; gap: 1.25rem; }

.f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 540px) { .f-row { grid-template-columns: 1fr; } }

.f-group { display: flex; flex-direction: column; gap: .45rem; }
.f-label { font-size: .78rem; font-weight: 700; color: #1e1916; letter-spacing: .5px; }

.f-input-wrap {
  position: relative; display: flex; align-items: center;
}
.f-input-wrap--textarea { align-items: flex-start; }
.f-icon { position: absolute; left: .95rem; top: 50%; transform: translateY(-50%); pointer-events: none; }
.f-icon--top { top: .9rem; transform: none; }

.f-input {
  width: 100%; padding: .75rem 1rem .75rem 2.75rem;
  border: 1.5px solid #e8dfd0; border-radius: 11px;
  font-size: .92rem; font-family: 'Open Sans', sans-serif;
  background: #fffdf7; color: #1e1916;
  outline: none; appearance: none;
  transition: border-color .3s, box-shadow .3s;
}
.f-input:focus { border-color: #eaa636; box-shadow: 0 0 0 3px rgba(234,166,54,.12); }
.f-select { cursor: pointer; }
.f-textarea { resize: vertical; min-height: 130px; padding-top: .75rem; }
.f-char { align-self: flex-end; font-size: .74rem; color: #a09080; margin-top: -.25rem; }

.form-submit { align-self: flex-start; margin-top: .25rem; }

.f-success {
  display: flex; align-items: center; gap: .6rem;
  background: #e8f5e9; color: #2e7d32;
  font-size: .88rem; font-weight: 600;
  padding: .85rem 1.25rem; border-radius: 10px;
  border: 1px solid #a5d6a7;
}
.fade-enter-active, .fade-leave-active { transition: opacity .4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── MAP ─────────────────────────────────────────────── */
.map-section { padding: 5rem 0; background: #fffdf7; }
.map-head { text-align: center; margin-bottom: 2.25rem; }
.map-head h2 { font-size: clamp(1.8rem,4vw,2.5rem); margin-bottom: .25rem; }
.map-head p { color: #777; font-size: .92rem; margin-top: 1rem; }
.map-frame {
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 10px 48px rgba(30,25,22,.1);
  border: 1px solid rgba(234,166,54,.15);
}

/* ── CTA ─────────────────────────────────────────────── */
.cta-section { position: relative; min-height: 440px; display: flex; align-items: center; overflow: hidden; }
.cta-bg { position: absolute; inset: 0; z-index: 0; }
.cta-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.cta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(30,25,22,.93) 0%, rgba(30,25,22,.78) 50%, rgba(30,25,22,.6) 100%);
}
.cta-content { position: relative; z-index: 2; text-align: center; padding: 5rem 0; }
.cta-content h2 { font-size: clamp(1.9rem,5vw,2.8rem); color: #fff; margin: .5rem 0 1rem; }
.cta-content p { color: rgba(255,255,255,.7); font-size: .97rem; max-width: 480px; margin: 0 auto 2rem; line-height: 1.8; }
.cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
</style>