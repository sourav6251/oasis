<template>
  <div class="booking-history-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1
        class="page-title"
        v-motion
        :initial="{ opacity: 0, y: -50 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        Booking History
      </h1>
      <!-- <v-btn
        color="primary"
        depressed
        @click="navigateToBooking"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :delay="200"
        :duration="500"
      >
        <span class="mdi mdi-plus mr-2"></span>
        New Booking
      </v-btn> -->
    </div>

    <!-- Filter Card -->
    <div
      class="filter-card"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="700"
    >
      <div class="filter-header">
        <h2 class="filter-title">Filter Bookings</h2>
        <v-btn text small color="primary" @click="clearFilters">Clear All</v-btn>
      </div>

      <div class="filter-controls">
        <v-select
          label="Status"
          :items="statusFilters"
          v-model="selectedStatus"
          outlined
          dense
          hide-details
        ></v-select>

        <!-- Date Range Picker -->
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="dateRangeText"
              label="Date Range"
              prepend-icon="mdi-calendar"
              readonly
              outlined
              dense
              hide-details
              v-bind="props"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="selectedDates"
            range
            no-title
            scrollable
          ></v-date-picker>
        </v-menu>

        <v-text-field
          label="Search by service or professional"
          v-model="searchQuery"
          outlined
          dense
          hide-details
          prepend-icon="mdi-magnify"
        ></v-text-field>

        <v-btn color="primary" depressed class="align-self-end" @click="applyFilters">
          Apply Filters
        </v-btn>
      </div>
    </div>

    <!-- Booking List -->
    <div v-if="filteredBookings.length">
      <div
        v-for="(booking, index) in filteredBookings"
        :key="booking.id"
        class="booking-card"
        v-motion
        :initial="{ opacity: 0, x: 240 }"
        :enter="{ opacity: 1, x: 0 }"
        :delay="index * 150"
        :duration="600"
      >
        <div class="booking-status-bar" :class="'status-bar-' + booking.status.toLowerCase()"></div>

        <div class="booking-content">
          <div class="booking-header">
            <div>
              <h3 class="booking-title">{{ booking.serviceName }}</h3>
              <p class="booking-datetime">{{ formatDate(booking.date) }} at {{ booking.time }}</p>
            </div>
            <span class="status-badge" :class="'status-' + booking.status.toLowerCase()">
              {{ booking.status }}
            </span>
          </div>

          <div class="booking-details">
            <div class="detail-item">
              <span class="detail-label">Location</span>
              <span class="detail-value">{{ booking.location }}</span>
              <span class="detail-address" v-if="booking.address">{{ booking.address }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Professional</span>
              <span class="detail-value">{{ booking.stylist }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Amount</span>
              <span class="detail-value">${{ booking.amount }}</span>
            </div>
          </div>

          <div class="booking-actions">
            <div class="action-buttons">
              <v-btn small outlined color="primary" @click="viewDetails(booking)">
                View Details
              </v-btn>

              <v-btn
                v-if="booking.status === 'Upcoming'"
                small
                outlined
                color="error"
                @click="cancelBooking(booking)"
              >
                Cancel Booking
              </v-btn>

              <v-btn
                v-if="booking.status === 'Completed'"
                small
                outlined
                color="secondary"
                @click="bookAgain(booking)"
              >
                Book Again
              </v-btn>
            </div>

            <v-btn
              v-if="booking.status === 'Upcoming'"
              color="primary"
              depressed
              class="primary-action"
              @click="reschedule(booking)"
            >
              Reschedule
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="empty-state"
      v-motion
      :initial="{ opacity: 0, scale: 0.9 }"
      :enter="{ opacity: 1, scale: 1 }"
      :duration="600"
    >
      <div class="empty-icon">
        <span class="mdi mdi-calendar-remove-outline"></span>
      </div>
      <h3 class="empty-title">No bookings found</h3>
      <p class="empty-description">You don't have any bookings matching your current filters</p>
      <v-btn color="primary" depressed large @click="navigateToBooking">
        Book a Service
      </v-btn>
    </div>

    <!-- Booking Details Dialog -->
    <v-dialog v-model="detailDialog" max-width="600">
      <v-card
        v-if="selectedBooking"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :duration="300"
      >
        <v-card-title class="dialog-title">Booking Details</v-card-title>

        <v-card-text>
          <div class="detail-grid">
            <div class="detail-row">
              <span class="detail-label">Service</span>
              <span class="detail-value">{{ selectedBooking.serviceName }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Date & Time</span>
              <span class="detail-value">{{ formatDate(selectedBooking.date) }} at {{ selectedBooking.time }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Location</span>
              <span class="detail-value">{{ selectedBooking.location }}</span>
              <span class="detail-address" v-if="selectedBooking.address">{{ selectedBooking.address }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Professional</span>
              <span class="detail-value">{{ selectedBooking.stylist }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Status</span>
              <span class="detail-value">
                <span class="status-badge" :class="'status-' + selectedBooking.status.toLowerCase()">
                  {{ selectedBooking.status }}
                </span>
              </span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Amount Paid</span>
              <span class="detail-value">${{ selectedBooking.amount }}</span>
            </div>

            <div class="detail-row" v-if="selectedBooking.notes">
              <span class="detail-label">Additional Notes</span>
              <span class="detail-value">{{ selectedBooking.notes }}</span>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="detailDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Cancel Confirmation Dialog -->
    <v-dialog v-model="cancelDialog" max-width="400">
      <v-card
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :duration="300"
      >
        <v-card-title class="dialog-title">Cancel Booking</v-card-title>
        <v-card-text>
          Are you sure you want to cancel your booking for
          <strong>{{ selectedBooking?.serviceName }}</strong>
          on {{ selectedBooking ? formatDate(selectedBooking.date) : '' }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelDialog = false">Keep Booking</v-btn>
          <v-btn color="error" depressed @click="confirmCancel">Cancel Booking</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  stylist: string;
  amount: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
}

export default defineComponent({
  name: 'BookingHistory',
  setup() {
    const router = useRouter();
    const bookings = ref<Booking[]>([]);
    const selectedStatus = ref<string>('All');
    const selectedDates = ref<string[]>([]);
    const searchQuery = ref<string>('');
    const dateMenu = ref(false);
    const detailDialog = ref(false);
    const cancelDialog = ref(false);
    const selectedBooking = ref<Booking | null>(null);
    
    const statusFilters = ['All', 'Upcoming', 'Completed', 'Cancelled', 'No-show'];
    
    // Sample booking data
    const sampleBookings: Booking[] = [
      {
        id: '1',
        serviceName: 'Haircut & Styling',
        date: '2023-10-15',
        time: '10:00 AM',
        location: 'Downtown Salon',
        address: '123 Main Street, New York, NY',
        stylist: 'Emma Wilson',
        amount: 45,
        status: 'Completed',
        notes: 'Requested layers and thinning'
      },
      {
        id: '2',
        serviceName: 'Hair Coloring',
        date: '2023-10-28',
        time: '2:30 PM',
        location: 'Home Service',
        address: '456 Park Ave, Apartment 3B, New York, NY',
        stylist: 'James Miller',
        amount: 100,
        status: 'Upcoming'
      },
      {
        id: '3',
        serviceName: 'Facial Treatment',
        date: '2023-09-20',
        time: '11:15 AM',
        location: 'Beauty Spa',
        address: '789 Beauty Lane, New York, NY',
        stylist: 'Sophia Chen',
        amount: 75,
        status: 'Completed'
      },
      {
        id: '4',
        serviceName: 'Manicure & Pedicure',
        date: '2023-09-05',
        time: '4:00 PM',
        location: 'Nail Studio',
        address: '321 Nail Street, New York, NY',
        stylist: 'Olivia Martinez',
        amount: 65,
        status: 'Cancelled',
        notes: 'Rescheduled due to illness'
      },
      {
        id: '5',
        serviceName: 'Massage Therapy',
        date: '2023-11-10',
        time: '3:00 PM',
        location: 'Wellness Center',
        address: '555 Relaxation Road, New York, NY',
        stylist: 'Michael Johnson',
        amount: 90,
        status: 'Upcoming'
      }
    ];
    
    onMounted(() => {
      // Simulate API call to fetch bookings
      setTimeout(() => {
        bookings.value = sampleBookings;
      }, 500);
    });
    
    const filteredBookings = computed(() => {
      let result = [...bookings.value];
      
      // Filter by status
      if (selectedStatus.value !== 'All') {
        result = result.filter(booking => booking.status === selectedStatus.value);
      }
      
      // Filter by date range
      if (selectedDates.value.length === 2) {
        const [start, end] = selectedDates.value;
        result = result.filter(booking => {
          return booking.date >= start && booking.date <= end;
        });
      }
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(booking => {
          return (
            booking.serviceName.toLowerCase().includes(query) ||
            booking.stylist.toLowerCase().includes(query) ||
            booking.location.toLowerCase().includes(query)
          );
        });
      }
      
      // Sort by date (most recent first)
      return result.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
    
    const dateRangeText = computed(() => {
      if (selectedDates.value.length === 2) {
        const [start, end] = selectedDates.value;
        return `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`;
      }
      return '';
    });
    
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    const formatDisplayDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    const applyFilters = () => {
      // Filters are applied automatically through computed property
      dateMenu.value = false;
    };
    
    const clearFilters = () => {
      selectedStatus.value = 'All';
      selectedDates.value = [];
      searchQuery.value = '';
    };
    
    const viewDetails = (booking: Booking) => {
      selectedBooking.value = booking;
      detailDialog.value = true;
    };
    
    const cancelBooking = (booking: Booking) => {
      selectedBooking.value = booking;
      cancelDialog.value = true;
    };
    
    const confirmCancel = () => {
      if (selectedBooking.value) {
        // In a real app, this would call an API
        const index = bookings.value.findIndex(b => b.id === selectedBooking.value?.id);
        if (index !== -1) {
          bookings.value[index].status = 'Cancelled';
        }
        cancelDialog.value = false;
      }
    };
    
    const bookAgain = (booking: Booking) => {
      // Navigate to booking page with service pre-selected
      router.push({
        path: '/booking',
        query: { service: booking.serviceName }
      });
    };
    
    const reschedule = (booking: Booking) => {
      // Navigate to booking page with service and details pre-filled
      router.push({
        path: '/booking',
        query: { 
          service: booking.serviceName,
          reschedule: booking.id
        }
      });
    };
    
    const navigateToBooking = () => {
      router.push('/booking');
    };
    
    return {
      bookings,
      filteredBookings,
      selectedStatus,
      selectedDates,
      searchQuery,
      dateMenu,
      dateRangeText,
      statusFilters,
      detailDialog,
      cancelDialog,
      selectedBooking,
      formatDate,
      applyFilters,
      clearFilters,
      viewDetails,
      cancelBooking,
      confirmCancel,
      bookAgain,
      reschedule,
      navigateToBooking
    };
  }
});
</script>

<style scoped>
.booking-history-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
}

.filter-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.filter-title {
  font-size: 18px;
  font-weight: 600;
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.booking-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.booking-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.booking-status-bar {
  height: 4px;
}

.booking-content {
  padding: 20px;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.booking-title {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 4px;
}

.booking-datetime {
  font-size: 14px;
  color: #94A3B8;
}

.booking-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 12px;
  color: #94A3B8;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
}

.detail-address {
  font-size: 12px;
  color: #64748B;
  margin-top: 2px;
}

.booking-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.empty-state {
  text-align: center;
  padding: 64px 24px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 64px;
  color: #CBD5E1;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1E293B;
}

.empty-description {
  font-size: 16px;
  color: #94A3B8;
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

.status-upcoming {
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366F1;
}

.status-completed {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

.status-cancelled {
  background-color: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.status-no-show {
  background-color: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.status-bar-upcoming {
  background-color: #6366F1;
}

.status-bar-completed {
  background-color: #10B981;
}

.status-bar-cancelled {
  background-color: #EF4444;
}

.status-bar-no-show {
  background-color: #F59E0B;
}

.dialog-title {
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  padding: 20px 24px 10px;
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

.detail-row {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .filter-controls {
    grid-template-columns: 1fr;
  }
  
  .booking-header {
    flex-direction: column;
    gap: 12px;
  }
  
  .booking-actions {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .primary-action {
    align-self: stretch;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>