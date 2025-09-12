    <template>
    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>Oasis Salon</h3>
            <p>Oasis is a best beauty premium in Tamluk. We expertise in Makeup,Skin Care,Hair,Spa and Many More.
                All Type of Bridal Makeup,Party Makeup,Weeding,Pre Weeding Makeup,Hair Stylish,Hair Smoothning,Spa done here.</p>
            <div class="social-links">
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/oasismakeover?mibextid=ZbWKwL"><i class="fab fa-facebook-f"></i></a>
              <!-- <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a> -->
              <a target="_blank" rel="noopener noreferrer" href="https://youtube.com/@Oasismakeover?si=HIspPYpV68fnXtZo"><i class="fab fa-youtube"></i></a>
              
            </div>
          </div>
          <div class="footer-column">
            <h3>Contact Info</h3>
            <p><i class="fas fa-map-marker-alt"></i> 2nd Floor,Left Side of Rupasree Cinema Hall,Tamluk</p>
            <p><i class="fas fa-phone"></i> 9531500843 / 9932269688</p>
            <!-- <p><i class="fas fa-phone"></i> 9932269688</p> -->
            <p><i class="fas fa-envelope"></i> oasismakeover@gmail.com</p>
            <p><i class="fas fa-clock"></i> Open: Tue-Sun 9AM-7PM</p>
          </div>
          <div class="footer-column grid grid-cols-2 gap-4">
            <div>
              <h3>Main Links</h3>
              <router-link to="/" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Home</router-link>
              <router-link to="/service" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Services</router-link>
              <router-link to="/packages" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Packages</router-link>
              <router-link to="/gallery" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Gallery</router-link>
              <router-link to="/booking" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Booking</router-link>
              <router-link to="/contact" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Contact</router-link>
            </div>
            <div>
              <h3>More Info</h3>
              <router-link to="/about" class="block mb-2 text-gray-300 hover:text-primary transition-colors">About Us</router-link>
              <router-link to="/beauty-tips" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Beauty Tips</router-link>
              <router-link to="/review" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Reviews</router-link>
              <router-link to="/offers" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Offers</router-link>
              <router-link to="/faq" class="block mb-2 text-gray-300 hover:text-primary transition-colors">FAQ</router-link>
              <router-link to="/policies" class="block mb-2 text-gray-300 hover:text-primary transition-colors">Policies</router-link>
            </div>
          </div>
          <div class="footer-column rounded-sm">
             <h3>Location</h3>
           <!-- <p>Subscribe to our newsletter for special offers and updates.</p>
            <form @submit.prevent>
              <input type="email" class="form-control" placeholder="Your Email Address" style="margin-bottom: 10px;" />
              <button type="submit" class="btn-submit">Subscribe</button>
            </form> -->
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d366.42324932308657!2d88.68091799580972!3d22.606555644676863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02070071efcef7%3A0x988499263ccb9b78!2sRupashree%20Cinema%20hall!5e0!3m2!1sen!2sin!4v1757653176008!5m2!1sen!2sin" 
            width="100%" 
            height="90%"
             style="border:0;"
              :allowfullscreen="true"
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
                class=" rounded-sm">
            </iframe>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; 2023 Glamour Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Footer',
  setup() {
    const router = useRouter()
    return { router }
  }
})
</script>

<style scoped>
:root {
  --color-primary: #9DC9C7;
  --color-secondary: #FFD1C8;
  --color-accent: #E6C8A4;
  --color-neutral: #F0F5F3;
  --color-dark: #2A363B;
  --color-light: #FFFFFF;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--color-dark);
  background-color: var(--color-neutral);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
header {
  background-color: var(--color-light);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
}

.logo span {
  color: var(--color-accent);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

nav a {
  text-decoration: none;
  color: var(--color-dark);
  font-weight: 500;
  transition: var(--transition);
}

nav a:hover {
  color: var(--color-primary);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  padding: 80px 0;
  text-align: center;
  color: var(--color-light);
}

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
}

/* Reviews Section */
.reviews-section {
  padding: 80px 0;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  text-align: center;
  margin-bottom: 50px;
  color: var(--color-dark);
  position: relative;
}

.section-title:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  margin: 15px auto;
}

.reviews-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.review-card {
  background: var(--color-light);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: var(--transition);
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.client-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 3px solid var(--color-primary);
}

.client-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.client-info p {
  color: #777;
  font-size: 14px;
}

.rating {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.review-content {
  line-height: 1.8;
  color: #555;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: #999;
  font-size: 14px;
}

.service-tag {
  background: var(--color-secondary);
  color: var(--color-dark);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  display: inline-block;
  margin-top: 15px;
}

/* Review Form */
.add-review {
  margin-top: 50px;
  background: var(--color-light);
}

.text-h4 {
  font-family: 'Playfair Display', serif;
  color: var(--color-dark);
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  padding: 60px 0;
  color: var(--color-light);
  text-align: center;
  margin-top: 80px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-item h2 {
  font-size: 42px;
  margin-bottom: 10px;
}

.stat-item p {
  font-size: 18px;
}

/* Footer */
footer {
  background: var(--color-dark);
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
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  margin-bottom: 20px;
  color: var(--color-primary);
}

.footer-column p,
.footer-column a {
  color: #ccc;
  margin-bottom: 10px;
  display: block;
  text-decoration: none;
  transition: var(--transition);
}

.footer-column a:hover {
  color: var(--color-primary);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.social-links a:hover {
  background: var(--color-primary);
  transform: translateY(-3px);
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #999;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  nav ul {
    margin-top: 20px;
    justify-content: center;
  }

  .hero h1 {
    font-size: 36px;
  }

  .reviews-container {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  nav ul {
    flex-direction: column;
    gap: 10px;
  }

  .hero {
    padding: 60px 0;
  }

  .hero h1 {
    font-size: 28px;
  }

  .section-title {
    font-size: 28px;
  }

  .review-header {
    flex-direction: column;
    text-align: center;
  }

  .client-image {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>