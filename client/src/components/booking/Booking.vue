<template>
  <div >


    <!-- Hero Section with Animation -->
    <section class="hero">
      <div class="container"  >
        <h1 v-motion :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" class="fleur">
          Book Your Appointment
        </h1>
        <p v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :delay="200" :duration="1000">
          Schedule your beauty treatment with our expert stylists and technicians
        </p>
      </div>
    </section>


    <div class="h-14 w-full  flex justify-end items-center pr-10">
      <v-btn color="primary px-5" depressed @click="showBookingSection=!showBookingSection">
        <v-icon icon="mdi-plus" class="mr-2"></v-icon>
        New Booking
      </v-btn>
    </div>
    <!-- Booking Section -->
    <section class="booking-section" v-if="showBookingSection">
      <div class="container">
        <h2 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :delay="400" :duration="800" class="section-title">
          Schedule Your Visit
        </h2>
        
        <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :delay="600" :duration="800" class="booking-steps">
          <div class="step" :class="{ 'active': currentStep === 1, 'completed': currentStep > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">Service</div>
          </div>
          <div class="step" :class="{ 'active': currentStep === 2, 'completed': currentStep > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">Location</div>
          </div>
          <div class="step" :class="{ 'active': currentStep === 3, 'completed': currentStep > 3 }">
            <div class="step-number">3</div>
            <div class="step-label">Date & Time</div>
          </div>
          <div class="step" :class="{ 'active': currentStep === 4, 'completed': currentStep > 4 }">
            <div class="step-number">4</div>
            <div class="step-label">Payment</div>
          </div>
        </div>
        
        <div class="booking-container ">
          <!-- Booking Form -->
          <div class="booking-form "   >
            <!-- Step 1: Service Selection -->
            <div  v-if="currentStep === 1" v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :delay="200" :duration="500">
              <h3 class="form-title">Select Services</h3>
              
              <div class="service-categories">
                <button v-for="category in categories" :key="category" 
                        :class="['category-btn', { 'active': selectedCategory === category }]"
                        @click="selectedCategory = category">
                  {{ category }}
                </button>
              </div>
              
              <!-- Loading State -->
              <div v-if="serviceStore.isLoading" class="loading-state">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="60"
                  :width="5"
                ></v-progress-circular>
                <p>Loading services...</p>
              </div>

              <!-- Error State -->
              <div v-else-if="serviceStore.getError" class="error-state">
                <v-icon icon="mdi-alert-circle-outline" size="60" color="error"></v-icon>
                <p class="error-message">{{ serviceStore.getError }}</p>
                <v-btn 
                  color="primary" 
                  @click="serviceStore.refreshData()"
                  prepend-icon="mdi-refresh"
                >
                  Retry
                </v-btn>
              </div>

              <!-- Service List -->
              <div v-else-if="filteredServices.length > 0" class="service-list">
                <div v-for="service in filteredServices" :key="service.id" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :delay="100 * service.id" :duration="300"
                     :class="['service-item', { 'selected': isServiceSelected(service.id) }]"
                     @click="toggleService(service)">
                  <div class="service-info">
                    <div class="service-name">{{ service.name }}</div>
                    <div class="service-duration">{{ service.duration }} min</div>
                  </div>
                  <div class="service-price">${{ service.price }}</div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="empty-state">
                <v-icon icon="mdi-emoticon-sad-outline" size="60" color="grey"></v-icon>
                <p>No services available{{ selectedCategory !== 'All' ? ' in this category' : '' }}</p>
              </div>
              
              <div class="form-actions">
                <div></div>
                <button class="btn-primary" @click="goToStep(2)">Continue</button>
              </div>
            </div>
            
            <!-- Step 2: Location Selection -->
            <div v-if="currentStep === 2" v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :delay="200" :duration="500">
              <h3 class="form-title">Select Location</h3>
              
              <div class="location-options">
                <div v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }" :delay="300" :duration="300"
                     class="location-option" 
                     :class="{ 'selected': selectedLocation === 'salon' }"
                     @click="selectedLocation = 'salon'">
                  <div class="location-icon">
                    <v-icon icon="mdi-store"></v-icon>
                  </div>
                  <div class="location-title">At Salon</div>
                  <div class="location-desc">Visit our beautiful salon for the full experience</div>
                </div>
                
                <div v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }" :delay="500" :duration="300"
                     class="location-option" 
                     :class="{ 'selected': selectedLocation === 'home' }"
                     @click="selectedLocation = 'home'">
                  <div class="location-icon">
                    <v-icon icon="mdi-home"></v-icon>
                  </div>
                  <div class="location-title">Home Service</div>
                  <div class="location-desc">Our professionals will come to your location</div>
                  <div class="location-fee">+$15 service fee</div>
                </div>
              </div>
              
              <!-- Address Form for Home Service -->
              <div v-if="selectedLocation === 'home'" v-motion :initial="{ opacity: 0, height: 0 }" :enter="{ opacity: 1, height: 'auto' }" :duration="300" class="address-form">
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" id="address" v-model="bookingInfo.address" class="form-control" placeholder="Enter your full address">
                </div>
                
                <div class="form-group">
                  <label for="apartment">Apartment/Unit (Optional)</label>
                  <input type="text" id="apartment" v-model="bookingInfo.apartment" class="form-control" placeholder="Apartment, unit, suite, etc.">
                </div>
                
                <div class="form-group">
                  <label for="phoneNumber">Phone Number <span class="required">*</span></label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    v-model="bookingInfo.phoneNumber" 
                    class="form-control" 
                    placeholder="Enter your phone number (e.g., 1234567890)"
                    pattern="[0-9]{10}"
                  >
                  <small class="form-hint">📞 We'll use this number to coordinate the home service</small>
                </div>
                
                <div class="form-group">
                  <label for="instructions">Special Instructions (Optional)</label>
                  <textarea id="instructions" v-model="bookingInfo.instructions" class="form-control" placeholder="Any special instructions for our staff..."></textarea>
                </div>
              </div>
              
              <div class="form-actions">
                <button class="btn-outline" @click="goToStep(1)">Back</button>
                <button class="btn-primary" @click="goToStep(3)">Continue</button>
              </div>
            </div>
            
            <!-- Step 3: Date & Time Selection -->
            <div v-if="currentStep === 3" v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :delay="200" :duration="500">
              <h3 class="form-title">Select Date & Time</h3>
              
              <div class="form-group">
                <label>Select Date</label>
                <div class="calendar">
                  <div class="calendar-header">
                    <button class="btn-outline" @click="prevMonth">&lt;</button>
                    <div>{{ currentMonth }} {{ currentYear }}</div>
                    <button class="btn-outline" @click="nextMonth">&gt;</button>
                  </div>
                  
                  <div class="calendar-grid">
                    <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" 
                        :key="day" class="calendar-day">
                      {{ day }}
                  </div>
  
                  <div v-for="(date, index) in calendarDates" 
                      :key="date.date ?? `placeholder-${index}`" 
                      v-motion 
                      :initial="{ opacity: 0, scale: 0.8 }" 
                      :enter="{ opacity: 1, scale: 1 }" 
                      :delay="Math.min(50 * (typeof date.day === 'number' ? date.day : 0), 1000)" 
                      :duration="300"
                      :class="['calendar-date', { 'selected': isDateSelected(date.date), 'disabled': !date.available }]"
                      @click="selectDate(date)">
                    {{ date.day }}
                  </div>
                </div>
                </div>
              </div>
              
              <div class="form-group">
                <label>Select Time</label>
                <div class="time-slots">
                  <div v-for="time in timeSlots" :key="time" v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }" :delay="50 * timeSlots.indexOf(time)" :duration="300"
                       :class="['time-slot', { 'selected': selectedTime === time, 'disabled': !isTimeAvailable(time) }]"
                       @click="selectTime(time)">
                    {{ time }}
                  </div>
                </div>
              </div>
              
              <div class="form-actions">
                <button class="btn-outline" @click="goToStep(2)">Back</button>
                <button class="btn-primary" @click="goToStep(4)">Continue</button>
              </div>
            </div>
            
            <!-- Step 4: Payment -->
            <div class="h-full" v-if="currentStep === 4" v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :delay="200" :duration="500">
              <h3 class="form-title">Payment Details</h3>
              <div class="h-[60%] w-full flex justify-center items-center">
                <v-btn class="w-36  bg-[#9DC9C7]" @click="makePayment">Paynow</v-btn>
              </div>
              </div>
          </div>
          
          <!-- Booking Summary with Animation -->
          <div v-motion :initial="{ opacity: 0, x: 50 }" :enter="{ opacity: 1, x: 0 }" :delay="800" :duration="800" class="booking-summary">
            <h3 class="summary-title">Booking Summary</h3>
            
            <div v-if="selectedServices.length > 0">
              <div v-for="service in selectedServices" :key="service.id" v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }" :delay="100 * selectedServices.indexOf(service)" :duration="300" class="summary-item">
                <div>{{ service.name }}</div>
                <div>${{ service.price }}</div>
              </div>
            </div>
            <div v-else>
              <p>No services selected yet</p>
            </div>
            
            <div v-if="selectedLocation" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :delay="400" :duration="300" class="summary-item">
              <div>Service at: {{ selectedLocation === 'salon' ? 'Salon' : 'Home' }}</div>
              <div v-if="selectedLocation === 'home'">+$15.00</div>
              <div v-else>$0.00</div>
            </div>
            
            <div v-if="selectedDate" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :delay="600" :duration="300" class="summary-item">
              <div>Date</div>
              <div>{{ formatSelectedDate(selectedDate) }}</div>
            </div>
            
            <div v-if="selectedTime" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :delay="800" :duration="300" class="summary-item">
              <div>Time</div>
              <div>{{ selectedTime }}</div>
            </div>
            
            <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :delay="1000" :duration="300" class="summary-total">
              <div>Total</div>
              <div>${{ totalPrice }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <BookingHistory/>

  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useServiceStore } from '@/stores/serviceStore';
import { storeToRefs } from 'pinia';
import { ref, computed, reactive, defineComponent, onMounted } from 'vue';
import BookingHistory from './BookingHistory.vue';
import type { BookingInfo, CalendarDate, PaymentInfo, PaymentMethod, Service } from '@/types/Booking';
import { convertToBookingService } from '@/types/Booking';



export default defineComponent({
  name: 'App',
  components:{BookingHistory},
  setup() {
    // Current step in the booking process
    const currentStep = ref<number>(1);
    const userStore = useUserStore();
    const serviceStore = useServiceStore();
    const showBookingSection=ref(false);
    
    const { getIsLogin, getName, getUserEmail } = storeToRefs(userStore);

    // Service selection - using store
    const categories = computed<string[]>(() => serviceStore.getCategoryNames);
    const selectedCategory = ref<string>('All');

    // Convert backend services to booking format
    const services = computed<Service[]>(() => {
      return serviceStore.getAllServices.map(convertToBookingService);
    });
    
    const selectedServices = ref<Service[]>([]);
    
    const filteredServices = computed<Service[]>(() => {
      if (selectedCategory.value === 'All') return services.value;
      return services.value.filter(service => service.category === selectedCategory.value);
    });

    // Fetch data on component mount
    onMounted(async () => {
      await serviceStore.fetchAllData();
    });
    
    const toggleService = (service: Service): void => {
      const index = selectedServices.value.findIndex(s => s.id === service.id);
      if (index === -1) {
        selectedServices.value.push(service);
      } else {
        selectedServices.value.splice(index, 1);
      }
    };
    
    const isServiceSelected = (serviceId: string): boolean => {
      return selectedServices.value.some(service => service.id === serviceId);
    };
    
    // Location selection
    const selectedLocation = ref<string>('salon');
    const bookingInfo = reactive<BookingInfo>({
      address: '',
      apartment: '',
      phoneNumber: '',
      instructions: ''
    });
    
    // Date and time selection
    const currentDate = new Date();
    const currentMonth = ref<string>(currentDate.toLocaleString('default', { month: 'long' }));
    const currentYear = ref<number>(currentDate.getFullYear());
    
    const selectedDate = ref<string | null>(null);
    const selectedTime = ref<string | null>(null);
    
    const timeSlots = ref<string[]>([
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ]);
    
    const calendarDates = computed<CalendarDate[]>(() => {
      const year = currentYear.value;
      const month = new Date(Date.parse(currentMonth.value + " 1, " + year)).getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      const dates: CalendarDate[] = [];
      const startingDayOfWeek = firstDay.getDay();
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        dates.push({ day: '', date: null, available: false });
      }
      
      // Add days of the month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const dateStr = `${year}-${month + 1}-${i}`;
        const available = true;
        dates.push({ day: i, date: dateStr, available });
      }
      
      return dates;
    });
    
    const prevMonth = (): void => {
      const date = new Date(Date.parse(currentMonth.value + " 1, " + currentYear.value));
      date.setMonth(date.getMonth() - 1);
      currentMonth.value = date.toLocaleString('default', { month: 'long' });
      currentYear.value = date.getFullYear();
    };
    
    const nextMonth = (): void => {
      const date = new Date(Date.parse(currentMonth.value + " 1, " + currentYear.value));
      date.setMonth(date.getMonth() + 1);
      currentMonth.value = date.toLocaleString('default', { month: 'long' });
      currentYear.value = date.getFullYear();
    };
    
    const selectDate = (date: CalendarDate): void => {
      if (date.available) {
        selectedDate.value = date.date;
      }
    };
    
    const isDateSelected = (date: string | null): boolean => {
      return selectedDate.value === date;
    };
    
    const formatSelectedDate = (dateString: string | null): string => {
      if (!dateString) return '';
      const [year, month, day] = dateString.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };
    
    const selectTime = (time: string): void => {
      selectedTime.value = time;
    };
    
    const isTimeAvailable = (time: string): boolean => {
      return true;
    };

    const makePayment = async (): Promise<void> => {
      try {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: totalPrice.value * 100, // paise
          currency: "INR",
          name: "Oasis",
          description: `Booking Payment - ₹${totalPrice.value}`,
          handler: function (response: any): void {
            console.log("Payment response:", response);
            alert(`Payment success 🎉\nPayment ID: ${response.razorpay_payment_id}`);
          },
          prefill: {
            name: getName.value || "Test User",
            email: getUserEmail.value || "test@example.com",
            contact: "9876543210",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        console.log("payment success");
        
        confirmBooking();
      } catch (error) {
        console.error("Payment failed:", error);
      }
    };

    // Payment selection
    const selectedPayment = ref<string>('card');
    const paymentMethods = ref<PaymentMethod[]>([
      { id: 'card', name: 'Credit/Debit Card', icon: 'mdi-credit-card-outline' },
      { id: 'paypal', name: 'PayPal', icon: 'mdi-paypal' },
      { id: 'googlepay', name: 'Google Pay', icon: 'mdi-google' },
      { id: 'applepay', name: 'Apple Pay', icon: 'mdi-apple' }
    ]);
    
    const paymentInfo = reactive<PaymentInfo>({
      name: '',
      number: '',
      expiry: '',
      cvv: ''
    });
    
    const newsletterEmail = ref<string>('');

    // Computed properties
    const totalPrice = computed<number>(() => {
      const servicesTotal = selectedServices.value.reduce((total, service) => total + service.price, 0);
      const homeServiceFee = selectedLocation.value === 'home' ? 15 : 0;
      return servicesTotal + homeServiceFee;
    });
    
    // Methods
    const goToStep = (step: number): void => {
      currentStep.value = step;
    };
    
    const confirmBooking = (): void => {
      console.log('Booking confirmed:', {
        services: selectedServices.value,
        location: selectedLocation.value,
        address: bookingInfo,
        date: selectedDate.value,
        time: selectedTime.value,
        payment: {
          method: selectedPayment.value,
          info: paymentInfo
        }
      });
      
      alert('Your appointment has been booked successfully! You will receive a confirmation email shortly.');
      
      // Reset form
      selectedServices.value = [];
      selectedLocation.value = 'salon';
      bookingInfo.address = '';
      bookingInfo.apartment = '';
      bookingInfo.phoneNumber = '';
      bookingInfo.instructions = '';
      selectedDate.value = null;
      selectedTime.value = null;
      selectedPayment.value = 'card';
      paymentInfo.name = '';
      paymentInfo.number = '';
      paymentInfo.expiry = '';
      paymentInfo.cvv = '';
      currentStep.value = 1;
    };
    
    const subscribeNewsletter = (): void => {
      alert(`Thank you for subscribing with ${newsletterEmail.value}!`);
      newsletterEmail.value = '';
    };
    
    return {
      currentStep,
      categories,
      selectedCategory,
      services,
      selectedServices,
      filteredServices,
      toggleService,
      isServiceSelected,
      selectedLocation,
      bookingInfo,
      currentMonth,
      currentYear,
      selectedDate,
      selectedTime,
      timeSlots,
      calendarDates,
      prevMonth,
      nextMonth,
      selectDate,
      isDateSelected,
      formatSelectedDate,
      selectTime,
      isTimeAvailable,
      selectedPayment,
      paymentMethods,
      paymentInfo,
      newsletterEmail,
      totalPrice,
      goToStep,
      confirmBooking,
      subscribeNewsletter,
      makePayment,
      showBookingSection,
      BookingHistory,
      serviceStore, // Make store accessible in template
    };
  }
});
</script>

<style scoped>
:root {
  --color-primary: #9DC9C7;
  --color-secondary: #FFD1C8;
  --color-accent: #E6C8A4;
  --color-neutral: #F0F5F3;
  --color-dark: #2A363B;
  --color-light: #cdeceb;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  /* font-family: 'Poppins', sans-serif; */
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

/* Booking Section */
.booking-section {
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

.booking-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
}

@media (min-width: 992px) {
  .booking-container {
    grid-template-columns: 1fr 1fr;
  }
}

/* Booking Steps */
.booking-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
}

.booking-steps:before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #ddd;
  z-index: 1;
}

.step {
  text-align: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background: var(--color-light); */
  background: #F0F5F3;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-weight: 600;
  transition: var(--transition);
}

.step.active .step-number {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-light);
}

.step.completed .step-number {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-dark);
}

.step-label {
  font-size: 14px;
  color: #777;
}

.step.active .step-label {
  color: var(--color-primary);
  font-weight: 500;
}

/* Booking Form */
.booking-form {
  background: #e3f4f86e;
  /* var(--color-light); */
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  margin-bottom: 25px;
  color: var(--color-dark);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  transition: var(--transition);
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(157, 201, 199, 0.2);
}

.form-hint {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.required {
  color: #d32f2f;
  font-weight: bold;
}

select.form-control {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-light);
  border: none;
  padding: 14px 30px;
  border-radius: 50px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: inline-block;
  transition: var(--transition);
}

.btn-primary:hover {
  background: var(--color-accent);
  color: var(--color-dark);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 12px 28px;
  border-radius: 50px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: inline-block;
  transition: var(--transition);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-light);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

/* Service Selection */
.service-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-btn {
  background: var(--color-light);
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.category-btn.active {
  background: var(--color-primary);
  color: var(--color-light);
  border-color: var(--color-primary);
}

.service-list {
  display: grid;
  gap: 15px;
}

.service-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
}

.service-item:hover {
  border-color: var(--color-primary);
}

.service-item.selected {
  border-color: var(--color-primary);
  background: rgba(157, 201, 199, 0.1);
}

.service-info {
  flex: 1;
}

.service-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.service-duration {
  font-size: 14px;
  color: 777;
}

.service-price {
  font-weight: 600;
  color: var(--color-primary);
}

/* Loading, Error, and Empty States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 300px;
}

.loading-state p,
.error-state p,
.empty-state p {
  margin-top: 20px;
  font-size: 16px;
  color: #777;
}

.error-state .error-message {
  color: #d32f2f;
  margin-bottom: 20px;
  font-weight: 500;
}

.empty-state p {
  color: #999;
}

/* Location Selection */
.location-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.location-option {
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.location-option:hover {
  border-color: var(--color-primary);
}

.location-option.selected {
  border-color: var(--color-primary);
  background: rgba(157, 201, 199, 0.1);
}

.location-icon {
  font-size: 40px;
  color: var(--color-primary);
  margin-bottom: 15px;
}

.location-title {
  font-weight: 600;
  margin-bottom: 10px;
}

.location-desc {
  font-size: 14px;
  color: #777;
}

.location-fee {
  margin-top: 10px;
  font-weight: 600;
  color: var(--color-accent);
}

/* Address Form */
.address-form {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

/* Calendar */
.calendar {
  background: var(--color-light);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  text-align: center;
  padding: 8px 0;
  font-weight: 500;
  color: #777;
  font-size: 14px;
}

.calendar-date {
  text-align: center;
  padding: 10px 0;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
}

.calendar-date:hover {
  background: rgba(157, 201, 199, 0.2);
}

.calendar-date.selected {
  background: var(--color-primary);
  color: var(--color-light);
}

.calendar-date.disabled {
  color: #ccc;
  cursor: not-allowed;
}

/* Time Slots */
.time-slots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.time-slot {
  padding: 10px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
}

.time-slot:hover {
  border-color: var(--color-primary);
}

.time-slot.selected {
  background: var(--color-primary);
  color: var(--color-light);
  border-color: var(--color-primary);
}

.time-slot.disabled {
  color: #ccc;
  cursor: not-allowed;
}

/* Payment Options */
.payment-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.payment-option {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.payment-option:hover {
  border-color: var(--color-primary);
}

.payment-option.selected {
  border-color: var(--color-primary);
  background: rgba(157, 201, 199, 0.1);
}

.payment-icon {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--color-primary);
}

/* Booking Summary */
.booking-summary {
  background: #d3e8ee6e;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.summary-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--color-dark);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
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

.footer-column p, .footer-column a {
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
  
  .booking-form {
    padding: 30px;
  }
  
  .location-options {
    grid-template-columns: 1fr;
  }
  
  .time-slots {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .payment-options {
    grid-template-columns: 1fr;
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
  
  .time-slots {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 15px;
  }
  
  .btn-primary, .btn-outline {
    width: 100%;
    text-align: center;
  }
}
</style>