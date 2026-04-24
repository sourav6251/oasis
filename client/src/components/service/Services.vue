<template>
  <div class="services-page">

    <!-- ── HERO BANNER ─────────────────────────────── -->
    <section class="services-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80" alt="services hero" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content container">
        <span
          class="eyebrow"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800"
        >Our Services</span>
        <h1
          v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="150"
        >
          Indulge in <span class="gold">Premium Beauty</span>
        </h1>
        <p
          v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="900" :delay="300"
        >
          From bespoke bridal makeovers to wellness rituals — every treatment crafted for your unique radiance.
        </p>
        <div
          class="hero-btns"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800" :delay="450"
        >
          <button class="btn-gold" @click="scrollToServices">Explore Services</button>
          <button class="btn-outline" @click="bookNow">Book Appointment</button>
        </div>
      </div>
    </section>

    <!-- ── CATEGORY TABS ───────────────────────────── -->
    <section class="tabs-section" ref="servicesSectionRef">
      <div class="container">
        <div
          class="tabs-wrap"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="700"
        >
          <button
            v-for="(category, index) in categories"
            :key="category"
            class="tab-btn"
            :class="{ active: activeCategory === category }"
            @click="setActiveCategory(category, index)"
            :ref="(el) => setTabButtonRef(el, index)"
          >
            {{ category }}
          </button>
          
          <!-- Admin Manage Categories Button -->
          <button 
            v-if="isAdmin" 
            class="manage-cats-btn" 
            @click="openCategoryManager"
            title="Manage Categories"
          >
            <v-icon icon="mdi-cog" size="20"></v-icon>
          </button>

          <!-- Admin Manage Packages Button -->
          <button 
            v-if="isAdmin" 
            class="manage-cats-btn" 
            @click="openAddPackageDialog"
            title="Manage Packages"
          >
            <v-icon icon="mdi-package-variant-plus" size="20"></v-icon>
          </button>

          <div class="tab-slider" :style="tabSliderStyle"></div>
        </div>
      </div>
    </section>

    <!-- ── SERVICES GRID ───────────────────────────── -->
    <section
      class="grid-section"
      style="background: linear-gradient(160deg,#fff8ee 0%,#fdf3e3 30%,#fffcf5 70%,#fff6e8 100%);"
    >
      <div class="container" style="position: relative;">
        <!-- Admin Floating Action Button with Menu -->
        <v-menu v-if="isAdmin" location="top end" offset="15">
          <template v-slot:activator="{ props }">
            <button 
              class="admin-fab"
              v-bind="props"
              v-motion :initial="{ scale: 0, rotate: -45 }" :enter="{ scale: 1, rotate: 0 }" :duration="600"
              title="Admin Actions"
            >
              <v-icon icon="mdi-plus" color="white" size="28"></v-icon>
            </button>
          </template>
          
          <v-list class="admin-fab-menu" elevation="10">
            <v-list-item @click="openAddDialog" prepend-icon="mdi-plus-box-outline">
              <v-list-item-title>New Service</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openAddPackageDialog" prepend-icon="mdi-package-variant-plus">
              <v-list-item-title>New Package</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading services…</p>
        </div>

        <!-- Cards -->
        <div v-else-if="currentServices.length > 0" class="services-grid">
          <div
            v-for="(service, index) in currentServices"
            :key="service._id"
            class="svc-card"
            :class="{ 'svc-card--offset': index % 2 !== 0 }"
            v-motion :initial="{ opacity: 0, y: 70 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="100 + index * 120" :duration="900"
          >
            <!-- Image -->
            <div class="svc-img">
              <img :src="service.img" :alt="service.name" loading="lazy" />
              <!-- Dark gradient -->
              <div class="svc-img__gradient"></div>
              <!-- Hover gold slide -->
              <div class="svc-img__hover-overlay"></div>
              <!-- Icon badge -->
              <div class="svc-icon-badge">
              <v-icon :icon="getCategoryIcon(typeof service.category === 'object' ? service.category.name : service.category)" color="white" size="18"></v-icon>
            </div>
            <!-- Badge -->
            <span class="svc-badge">{{ typeof service.category === 'object' ? service.category.name : service.category }}</span>

              <!-- Admin Actions Overlay -->
              <div v-if="isAdmin" class="svc-admin-actions">
                <button class="action-btn edit" @click.stop="openEditDialog(service)" title="Edit Service">
                  <v-icon icon="mdi-pencil" size="18"></v-icon>
                </button>
                <button class="action-btn delete" @click.stop="confirmDelete(service)" title="Delete Service">
                  <v-icon icon="mdi-delete" size="18"></v-icon>
                </button>
              </div>
            </div>


            <!-- Content -->
            <div class="svc-content">
              <h3>{{ service.name }}</h3>
              <div class="svc-meta">
                <span><v-icon icon="mdi-clock-outline" size="15"></v-icon> {{ service.duration }}</span>
                <span class="svc-price"><v-icon icon="mdi-tag-outline" size="15"></v-icon> {{ service.price }}</span>
              </div>
              <p>{{ service.description }}</p>
              <ul class="svc-features">
                <li v-for="f in service.features" :key="f">
                  <v-icon icon="mdi-check-circle" size="15" color="#eaa636"></v-icon> {{ f }}
                </li>
              </ul>
              <button class="svc-btn" @click="bookService(service)">Book Now</button>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="empty-state">
          <v-icon icon="mdi-magnify" size="52" color="#eaa636"></v-icon>
          <p>No services found for <strong>{{ activeCategory }}</strong>.</p>
          <button class="btn-gold" @click="setActiveCategory('All', 0)">View All Services</button>
        </div>
      </div>
    </section>

    <!-- ── ADMIN DIALOG ────────────────────────────── -->
    <v-dialog v-model="showAddDialog" max-width="600px" persistent>
      <div class="admin-modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Update' : 'Add' }} <span class="gold">Service</span></h2>
          <button class="close-btn" @click="showAddDialog = false">
            <v-icon icon="mdi-close"></v-icon>
          </button>
        </div>


        <div class="modal-body">
          <div class="form-group">
            <label>Service Name*</label>
            <input v-model="newService.name" type="text" placeholder="e.g. Bridal Glow Makeup" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Category*</label>
              <select v-model="newService.category">
                <option v-for="cat in categoryObjects" :key="cat._id" :value="cat._id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Price*</label>
              <input v-model="newService.price" type="text" placeholder="e.g. ₹2,500" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Duration</label>
              <input v-model="newService.duration" type="text" placeholder="e.g. 60 mins" />
            </div>
            <div class="form-group">
              <label>Service Image</label>
              <div class="image-upload-wrapper">
                <div v-if="imagePreview" class="preview-container">
                  <img :src="imagePreview" alt="Preview" />
                  <button class="remove-img" @click="clearImage">
                    <v-icon icon="mdi-close" size="14"></v-icon>
                  </button>
                </div>
                <div v-else class="upload-placeholder" @click="fileInput?.click()">
                  <v-icon icon="mdi-camera-plus-outline" size="32" color="#eaa636"></v-icon>
                  <span>Upload Photo</span>
                </div>
                <input 
                  type="file" 
                  ref="fileInput" 
                  accept="image/*" 
                  @change="onFileChange" 
                  style="display: none" 
                />
              </div>
            </div>
          </div>


          <div class="form-group">
            <label>Description</label>
            <textarea v-model="newService.description" rows="3" placeholder="Describe the service..."></textarea>
          </div>

          <div class="form-group">
            <label>Features</label>
            <div v-for="(feat, idx) in newService.features" :key="idx" class="feature-input">
              <input v-model="newService.features[idx]" type="text" placeholder="Feature..." />
              <button class="remove-feat" @click="removeFeature(idx)">
                <v-icon icon="mdi-minus-circle-outline" size="18"></v-icon>
              </button>
            </div>
            <button class="add-feat-btn" @click="addFeature">
              <v-icon icon="mdi-plus" size="16"></v-icon> Add Feature
            </button>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="showAddDialog = false">Cancel</button>
          <button class="btn-submit" :disabled="addLoading" @click="handleSubmit">
            <template v-if="addLoading">
              <div class="mini-spinner"></div> {{ isEditing ? 'Updating...' : 'Creating...' }}
            </template>
            <template v-else>{{ isEditing ? 'Update Service' : 'Create Service' }}</template>
          </button>

        </div>
      </div>
    </v-dialog>

    <!-- ── CATEGORY MANAGER DIALOG ─────────────────── -->
    <v-dialog v-model="showCategoryDialog" max-width="500px">
      <div class="admin-modal">
        <div class="modal-header">
          <h2>Manage <span class="gold">Categories</span></h2>
          <button class="close-btn" @click="showCategoryDialog = false">
            <v-icon icon="mdi-close"></v-icon>
          </button>
        </div>

        <div class="modal-body">
          <!-- List existing categories -->
          <div class="category-list mb-6">
            <div v-for="cat in categoryObjects" :key="cat._id" class="category-item">
              <div class="cat-info">
                <v-icon :icon="cat.icon || 'mdi-spa'" size="20" class="mr-2"></v-icon>
                <span>{{ cat.name }}</span>
              </div>
              <div class="cat-actions">
                <button @click="editCategory(cat)" class="action-btn edit">
                  <v-icon icon="mdi-pencil" size="16"></v-icon>
                </button>
                <button @click="confirmDeleteCategory(cat)" class="action-btn delete">
                  <v-icon icon="mdi-delete" size="16"></v-icon>
                </button>
              </div>
            </div>
          </div>

          <v-divider class="my-4"></v-divider>

          <!-- Add/Edit form -->
          <div class="category-form mt-4">
            <h3>{{ isEditingCategory ? 'Edit' : 'Add New' }} Category</h3>
            <div class="form-group mt-3">
              <label>Category Name*</label>
              <input v-model="categoryForm.name" type="text" placeholder="e.g. Facial" />
            </div>
            <div class="form-group">
              <label>Icon (MDI Name)</label>
              <input v-model="categoryForm.icon" type="text" placeholder="e.g. mdi-face-woman" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="categoryForm.description" rows="2" placeholder="Brief description..."></textarea>
            </div>
            <div class="form-actions mt-3">
              <button v-if="isEditingCategory" class="btn-cancel mr-2" @click="resetCategoryForm">Cancel Edit</button>
              <button class="btn-submit" :disabled="categoryLoading" @click="handleCategorySubmit">
                {{ categoryLoading ? 'Saving...' : (isEditingCategory ? 'Update' : 'Add Category') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>

    <!-- ── PACKAGE MANAGER DIALOG ──────────────────── -->
    <v-dialog v-model="showPackageDialog" max-width="600px" persistent>
      <div class="admin-modal">
        <div class="modal-header">
          <h2>{{ isEditingPackage ? 'Update' : 'Add' }} <span class="gold">Package</span></h2>
          <button class="close-btn" @click="showPackageDialog = false">
            <v-icon icon="mdi-close"></v-icon>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Package Name*</label>
            <input v-model="packageForm.name" type="text" placeholder="e.g. Bridal Ritual Bundle" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Current Price*</label>
              <input v-model="packageForm.price" type="text" placeholder="e.g. ₹4,999" />
            </div>
            <div class="form-group">
              <label>Original Price (Optional)</label>
              <input v-model="packageForm.originalPrice" type="text" placeholder="e.g. ₹6,500" />
            </div>
          </div>

          <div class="form-group">
            <v-switch
              v-model="packageForm.popular"
              label="Mark as Most Popular"
              color="#eaa636"
              hide-details
            ></v-switch>
          </div>

          <div class="form-group">
            <label>Features</label>
            <div v-for="(feat, idx) in packageForm.features" :key="idx" class="feature-input">
              <input v-model="packageForm.features[idx]" type="text" placeholder="Included service/benefit..." />
              <button class="remove-feat" @click="removePackageFeature(idx)">
                <v-icon icon="mdi-minus-circle-outline" size="18"></v-icon>
              </button>
            </div>
            <button class="add-feat-btn" @click="addPackageFeature">
              <v-icon icon="mdi-plus" size="16"></v-icon> Add Feature
            </button>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="showPackageDialog = false">Cancel</button>
          <button class="btn-submit" :disabled="packageLoading" @click="handlePackageSubmit">
            <template v-if="packageLoading">
              <div class="mini-spinner"></div> {{ isEditingPackage ? 'Updating...' : 'Creating...' }}
            </template>
            <template v-else>{{ isEditingPackage ? 'Save Package' : 'Create Package' }}</template>
          </button>
        </div>
      </div>
    </v-dialog>

    <!-- ── PACKAGES ────────────────────────────────── -->
    <section class="packages-section" v-if="packages.length > 0 || isAdmin">
      <!-- decorative background -->
      <div class="packages-bg-deco" aria-hidden="true"></div>

      <div class="container">
        <!-- Header -->
        <div class="section-header" v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900">
          <span class="eyebrow">Special Packages</span>
          <div class="header-with-action">
            <h2>Save Big with Our <span class="gold">Bundled Rituals</span></h2>
            <button v-if="isAdmin" class="manage-cats-btn" @click="openAddPackageDialog" title="Add Package">
              <v-icon icon="mdi-plus" size="20"></v-icon>
            </button>
          </div>
          <div class="header-divider">
            <span></span><span class="dot"></span><span></span>
          </div>
        </div>

        <!-- Package cards -->
        <div class="packages-grid" v-if="packages.length > 0">
          <div
            v-for="(pkg, index) in packages"
            :key="pkg._id"
            class="pkg-card"
            :class="{ 'pkg-card--popular': pkg.popular }"
            v-motion :initial="{ opacity: 0, y: 60 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="200 + index * 150" :duration="900"
          >
            <!-- Hover glow -->
            <div class="pkg-card__glow" aria-hidden="true"></div>
            <!-- Top accent -->
            <div class="pkg-card__top-line" aria-hidden="true"></div>
            <!-- Decorative number -->
            <span class="pkg-card__num" aria-hidden="true">{{ String(index + 1).padStart(2,'0') }}</span>

            <div v-if="pkg.popular" class="pkg-popular-tag">⭐ Most Popular</div>

            <!-- Admin Actions Overlay -->
            <div v-if="isAdmin" class="svc-admin-actions">
              <button class="action-btn edit" @click.stop="openEditPackageDialog(pkg)" title="Edit Package">
                <v-icon icon="mdi-pencil" size="18"></v-icon>
              </button>
              <button class="action-btn delete" @click.stop="confirmDeletePackage(pkg)" title="Delete Package">
                <v-icon icon="mdi-delete" size="18"></v-icon>
              </button>
            </div>

            <!-- Icon -->
            <div class="pkg-icon">
              <v-icon icon="mdi-diamond-stone" color="white" size="24"></v-icon>
            </div>

            <h3>{{ pkg.name }}</h3>

            <div class="pkg-price">
              <span class="pkg-price__current">{{ pkg.price }}</span>
              <span v-if="pkg.originalPrice" class="pkg-price__original">{{ pkg.originalPrice }}</span>
            </div>

            <ul class="pkg-features">
              <li v-for="f in pkg.features" :key="f">
                <v-icon icon="mdi-check-circle-outline" size="15" color="#eaa636"></v-icon> {{ f }}
              </li>
            </ul>

            <button class="pkg-btn" @click="bookPackage(pkg)">Book Package</button>
          </div>
        </div>

        <!-- Admin Empty State -->
        <div v-else-if="isAdmin" class="empty-state">
          <v-icon icon="mdi-package-variant" size="52" color="#eaa636"></v-icon>
          <p>No packages created yet. Click the + button to add one.</p>
        </div>
      </div>
    </section>

    <!-- ── CTA BANNER ─────────────────────────────── -->
    <section class="cta-section">
      <div class="cta-bg">
        <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80" alt="cta" />
        <div class="cta-overlay"></div>
      </div>
      <div class="container cta-content">
        <span
          class="eyebrow eyebrow--light"
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="700"
        >Ready for a Transformation?</span>
        <h2
          v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900" :delay="150"
        >
          Book Your <span class="gold">Experience</span> Today
        </h2>
        <p
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="800" :delay="300"
        >
          Our expert team is ready to bring out your inner radiance. Premium treatments, certified stylists, serene ambience.
        </p>
        <div
          class="cta-btns"
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="800" :delay="450"
        >
          <button class="btn-gold" @click="bookNow">Book Appointment</button>
          <a href="https://wa.me/9932269688" class="btn-whatsapp" target="_blank" rel="noopener">
            <v-icon icon="mdi-whatsapp" size="20" color="white"></v-icon> WhatsApp Us
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import apiStore from '@/api/apiStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'vue-sonner';
import type { Service, ServicePackage } from '@/types/Services';
import { ref, computed, onMounted, nextTick, reactive } from 'vue';
import type { Ref } from 'vue';

const CATEGORY_ICONS: Record<string, string> = {
  Hair:     'mdi-content-cut',
  Skin:     'mdi-face-woman-shimmer',
  Nails:    'mdi-hand-back-left',
  Makeup:   'mdi-brush',
  Wellness: 'mdi-spa',
  All:      'mdi-star-four-points',
};

export default {
  setup() {
    const authStore = useAuthStore();
    const isAdmin   = computed(() => authStore.user?.userType === 'ADMIN');

    const activeCategory: Ref<string> = ref('All');
    const loading: Ref<boolean>       = ref(true);
    const categories: Ref<string[]>   = ref(['All']);
    const categoryObjects: Ref<any[]> = ref([]);
    const services: Ref<Service[]>    = ref([]);
    const packages: Ref<ServicePackage[]> = ref([]);
    const servicesSectionRef = ref<HTMLElement | null>(null);

    // Admin Dialog State
    const showAddDialog = ref(false);
    const isEditing    = ref(false);
    const editingId     = ref<string | null>(null);
    const addLoading    = ref(false);
    const selectedFile  = ref<File | null>(null);
    const imagePreview  = ref<string | null>(null);
    const fileInput     = ref<HTMLInputElement | null>(null);

    const newService    = reactive({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
      features: ['', '']
    });

    // Category Manager State
    const showCategoryDialog = ref(false);
    const isEditingCategory = ref(false);
    const editingCategoryId = ref<string | null>(null);
    const categoryLoading = ref(false);
    const categoryForm = reactive({
      name: '',
      icon: '',
      description: ''
    });

    // Package Manager State
    const showPackageDialog = ref(false);
    const isEditingPackage = ref(false);
    const editingPackageId = ref<string | null>(null);
    const packageLoading = ref(false);
    const packageForm = reactive({
      name: '',
      price: '',
      originalPrice: '',
      popular: false,
      features: ['', '']
    });


    // Tab slider
    const tabButtons       = ref<(HTMLElement | null)[]>([]);
    const tabSliderPosition = ref<number>(0);
    const tabSliderWidth    = ref<number>(0);
    const tabSliderHeight   = ref<number>(0);
    const tabSliderTop      = ref<number>(0);

    const currentServices = computed(() => {
      if (activeCategory.value === 'All') return services.value;
      return services.value.filter(s => {
        const catName = typeof s.category === 'object' ? s.category.name : s.category;
        return catName === activeCategory.value;
      });
    });

    const tabSliderStyle = computed(() => ({
      transform:  `translateX(${tabSliderPosition.value}px)`,
      width:      `${tabSliderWidth.value}px`,
      height:     `${tabSliderHeight.value}px`,
      top:        `${tabSliderTop.value}px`,
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    }));

    const getCategoryIcon = (name: string) => CATEGORY_ICONS[name] ?? 'mdi-spa';

    /* ── DATA LOADERS ──────────────────────────────── */
    const loadCategories = async () => {
      try {
        const fetched = await apiStore.getAllServiceCategories();
        categoryObjects.value = fetched;
        categories.value = ['All', ...fetched.map((c: any) => c.name)];
      } catch {
        categories.value = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Wellness'];
      }
    };

    const loadServices = async () => {
      try {
        loading.value = true;
        services.value = await apiStore.getAllServices();
      } catch {
        services.value = [];
        console.error("Failed to load services");
      } finally {
        loading.value = false;
      }
    };

    const loadPackages = async () => {
      try {
        packages.value = await apiStore.getAllServicePackages();
      } catch {
        packages.value = [];
        console.error("Failed to load packages");
      }
    };

    /* ── TAB SLIDER ────────────────────────────────── */
    const setTabButtonRef = (el: any, index: number) => {
      if (el instanceof HTMLElement)                  tabButtons.value[index] = el;
      else if (el && typeof el === 'object' && '$el' in el) tabButtons.value[index] = el.$el as HTMLElement;
      else                                            tabButtons.value[index] = null;
    };

    const updateTabSliderPosition = async (index: number) => {
      await nextTick();
      const btn = tabButtons.value[index];
      if (btn) {
        const bRect = btn.getBoundingClientRect();
        const cRect = btn.parentElement!.getBoundingClientRect();
        tabSliderPosition.value = bRect.left - cRect.left;
        tabSliderWidth.value    = bRect.width;
        tabSliderHeight.value   = bRect.height;
        tabSliderTop.value      = bRect.top  - cRect.top;
      }
    };

    const setActiveCategory = async (cat: string, idx: number) => {
      activeCategory.value = cat;
      await updateTabSliderPosition(idx);
    };

    /* ── ACTIONS ───────────────────────────────────── */
    const bookNow     = () => alert('Redirecting to booking…');
    const bookService = (s: Service)       => alert(`Booking: ${s.name}`);
    const bookPackage = (p: ServicePackage) => alert(`Booking package: ${p.name}`);
    const scrollToServices = () => {
      servicesSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    /* ── ADMIN METHODS ─────────────────────────────── */
    const onFileChange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        selectedFile.value = file;
        const reader = new FileReader();
        reader.onload = (event: any) => {
          imagePreview.value = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const clearImage = () => {
      selectedFile.value = null;
      imagePreview.value = null;
      if (fileInput.value) fileInput.value.value = '';
    };

    const openAddDialog = () => {
      isEditing.value = false;
      editingId.value = null;
      newService.name = '';
      newService.category = categoryObjects.value[0]?._id || '';
      newService.price = '';
      newService.duration = '';
      newService.description = '';
      newService.features = ['', ''];
      clearImage();
      showAddDialog.value = true;
    };

    const openEditDialog = (service: Service) => {
      isEditing.value = true;
      editingId.value = service._id;
      newService.name = service.name;
      
      let catId = '';
      if (typeof service.category === 'object' && service.category !== null) {
        const foundCat = categoryObjects.value.find(c => c._id === service.category._id || c.name === service.category.name);
        catId = foundCat ? foundCat._id : (service.category._id || '');
      } else {
        const foundCat = categoryObjects.value.find(c => c.name === service.category || c._id === service.category);
        catId = foundCat ? foundCat._id : '';
      }
      newService.category = catId;
      
      newService.price = service.price;
      newService.duration = service.duration;
      newService.description = service.description;
      newService.features = [...service.features];
      imagePreview.value = service.img;
      showAddDialog.value = true;
    };


    const confirmDelete = async (service: Service) => {
      if (confirm(`Are you sure you want to delete "${service.name}"?`)) {
        try {
          await apiStore.deleteService(service._id);
          toast.success('Service deleted successfully');
          await loadServices();
        } catch (error: any) {
          toast.error('Failed to delete service');
        }
      }
    };


    const addFeature = () => {
      newService.features.push('');
    };

    const removeFeature = (index: number) => {
      if (newService.features.length > 1) {
        newService.features.splice(index, 1);
      }
    };

    const handleSubmit = async () => {
      if (!newService.name || !newService.category || !newService.price) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (!isEditing.value && !selectedFile.value) {
        toast.error('Please select an image for the service');
        return;
      }

      try {
        addLoading.value = true;
        
        const formData = new FormData();
        formData.append('name', newService.name);
        formData.append('price', newService.price);
        formData.append('duration', newService.duration);
        formData.append('description', newService.description);
        
        // Find category object
        const catObj = categoryObjects.value.find(c => c._id === newService.category);
        formData.append('category', JSON.stringify({ name: catObj?.name || 'Hair', _id: newService.category }));
        
        const cleanedFeatures = newService.features.filter(f => f.trim() !== '');
        formData.append('features', JSON.stringify(cleanedFeatures));

        if (selectedFile.value) {
          formData.append('img', selectedFile.value);
        }

        if (isEditing.value && editingId.value) {
          await apiStore.updateService(editingId.value, formData);
          toast.success('Service updated successfully');
        } else {
          await apiStore.createService(formData);
          toast.success('Service created successfully');
        }

        showAddDialog.value = false;
        await loadServices();
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to save service');
      } finally {
        addLoading.value = false;
      }
    };

    /* ── CATEGORY MANAGER METHODS ──────────────────── */
    const openCategoryManager = () => {
      resetCategoryForm();
      showCategoryDialog.value = true;
    };

    const resetCategoryForm = () => {
      isEditingCategory.value = false;
      editingCategoryId.value = null;
      categoryForm.name = '';
      categoryForm.icon = '';
      categoryForm.description = '';
    };

    const editCategory = (cat: any) => {
      isEditingCategory.value = true;
      editingCategoryId.value = cat._id;
      categoryForm.name = cat.name;
      categoryForm.icon = cat.icon || '';
      categoryForm.description = cat.description || '';
    };

    const confirmDeleteCategory = async (cat: any) => {
      if (confirm(`Are you sure you want to delete "${cat.name}"? This might leave services without a category.`)) {
        try {
          await apiStore.deleteServiceCategory(cat._id);
          toast.success('Category deleted successfully');
          await loadCategories();
          // Reset active category if deleted
          if (activeCategory.value === cat.name) {
            setActiveCategory('All', 0);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Failed to delete category');
        }
      }
    };

    const handleCategorySubmit = async () => {
      if (!categoryForm.name) {
        toast.error('Category name is required');
        return;
      }

      try {
        categoryLoading.value = true;
        if (isEditingCategory.value && editingCategoryId.value) {
          await apiStore.updateServiceCategory(editingCategoryId.value, { ...categoryForm });
          toast.success('Category updated successfully');
        } else {
          await apiStore.createServiceCategory({ ...categoryForm });
          toast.success('Category created successfully');
        }
        await loadCategories();
        resetCategoryForm();
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to save category');
      } finally {
        categoryLoading.value = false;
      }
    };

    /* ── PACKAGE MANAGEMENT ──────────────────────── */
    const openAddPackageDialog = () => {
      isEditingPackage.value = false;
      editingPackageId.value = null;
      packageForm.name = '';
      packageForm.price = '';
      packageForm.originalPrice = '';
      packageForm.popular = false;
      packageForm.features = ['', ''];
      showPackageDialog.value = true;
    };

    const openEditPackageDialog = (pkg: ServicePackage) => {
      isEditingPackage.value = true;
      editingPackageId.value = pkg._id;
      packageForm.name = pkg.name;
      packageForm.price = pkg.price;
      packageForm.originalPrice = pkg.originalPrice || '';
      packageForm.popular = pkg.popular || false;
      packageForm.features = [...pkg.features];
      showPackageDialog.value = true;
    };

    const addPackageFeature = () => packageForm.features.push('');
    const removePackageFeature = (idx: number) => packageForm.features.splice(idx, 1);

    const handlePackageSubmit = async () => {
      if (!packageForm.name || !packageForm.price) {
        toast.error('Name and price are required');
        return;
      }
      try {
        packageLoading.value = true;
        if (isEditingPackage.value && editingPackageId.value) {
          await apiStore.updateServicePackage(editingPackageId.value, { ...packageForm });
          toast.success('Package updated successfully');
        } else {
          await apiStore.createServicePackage({ ...packageForm });
          toast.success('Package created successfully');
        }
        await loadPackages();
        showPackageDialog.value = false;
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to save package');
      } finally {
        packageLoading.value = false;
      }
    };

    const confirmDeletePackage = async (pkg: ServicePackage) => {
      if (confirm(`Are you sure you want to delete package "${pkg.name}"?`)) {
        try {
          await apiStore.deleteServicePackage(pkg._id);
          toast.success('Package deleted successfully');
          await loadPackages();
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Failed to delete package');
        }
      }
    };


    onMounted(async () => {
      await loadCategories();
      await loadServices();
      await loadPackages();
      setTimeout(() => updateTabSliderPosition(0), 150);
    });

    return {
      activeCategory, categories, services, currentServices,
      packages, loading, tabSliderStyle, servicesSectionRef,
      getCategoryIcon, setTabButtonRef, setActiveCategory,
      bookNow, bookService, bookPackage, scrollToServices,
      isAdmin, showAddDialog, newService, addLoading, categoryObjects,
      isEditing, imagePreview, fileInput,
      confirmDelete, addFeature, removeFeature, handleSubmit,
      openAddDialog, openEditDialog, onFileChange, clearImage,
      showCategoryDialog, isEditingCategory, categoryLoading, categoryForm,
      openCategoryManager, resetCategoryForm, editCategory, confirmDeleteCategory, handleCategorySubmit,
      showPackageDialog, isEditingPackage, packageLoading, packageForm,
      openAddPackageDialog, openEditPackageDialog, addPackageFeature, removePackageFeature, handlePackageSubmit, confirmDeletePackage
    };

  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

/* ── TOKENS ─────────────────────────────────────────── */
:root {
  --gold:       #eaa636;
  --gold-dark:  #c5831e;
  --dark:       #1e1916;
  --cream:      #fffdf7;
  --text:       #545454;
  --radius:     16px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.services-page {
  font-family: 'Open Sans', sans-serif;
  color: var(--text, #545454);
  background: var(--cream, #fffdf7);
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Shared typography */
.eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #eaa636;
  margin-bottom: 1rem;
}
.eyebrow--light { color: rgba(234,166,54,0.9); }

.gold { color: #eaa636; }

h1, h2 {
  font-family: 'Playfair Display', serif;
  color: #1e1916;
  line-height: 1.15;
}

/* Divider */
.header-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}
.header-divider span:not(.dot) {
  width: 64px; height: 1px; background: rgba(234,166,54,0.4);
}
.header-divider .dot {
  width: 8px; height: 8px; border-radius: 50%; background: #eaa636;
}

/* Buttons */
.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #eaa636;
  color: #1e1916;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.3rem 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.35s ease;
  box-shadow: 0 5px 18px rgba(234,166,54,0.35);
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.btn-gold::before {
  content: '';
  position: absolute; inset: 0;
  background: #1e1916;
  width: 0;
  transition: width 0.35s ease;
  z-index: -1;
  border-radius: 50px;
}
.btn-gold:hover { color: #fff; transform: translateY(-3px); box-shadow: 0 8px 28px rgba(234,166,54,0.5); }
.btn-gold:hover::before { width: 100%; }

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.35s ease;
}
.btn-outline:hover { border-color: #eaa636; color: #eaa636; transform: translateY(-3px); }

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #198754;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.35s ease;
}
.btn-whatsapp:hover { background: #157347; transform: translateY(-3px); }

/* ── HERO ────────────────────────────────────────────── */
.services-hero {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: 5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute; inset: 0; z-index: 0;
}
.hero-bg img {
  width: 100%; height: 100%; object-fit: cover; object-position: center;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(30,25,22,0.92) 0%,
    rgba(30,25,22,0.70) 50%,
    rgba(30,25,22,0.45) 100%
  );
}

.hero-content {
  position: relative; z-index: 2;
  text-align: left;
}
.hero-content h1 {
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  color: #fff;
  margin-bottom: 1.2rem;
}
.hero-content p {
  color: rgba(255,255,255,0.78);
  font-size: 1.1rem;
  max-width: 580px;
  line-height: 1.75;
  margin-bottom: 2rem;
}
.hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ── TABS ────────────────────────────────────────────── */
.tabs-section {
  background: #fff;
  padding: 2rem 0;
  position: sticky;
  top: 0;
  z-index: 40;
  box-shadow: 0 4px 24px rgba(30,25,22,0.07);
}
.tabs-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fdf5eb;
  border-radius: 50px;
  padding: 0.6rem;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  flex-wrap: wrap;
}
.tab-btn {
  background: transparent;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #545454;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  z-index: 2;
  transition: color 0.3s;
}
.tab-btn.active { color: #1e1916; font-weight: 700; }
.tab-btn:hover:not(.active) { color: #eaa636; }

.tab-slider {
  position: absolute;
  left: 0;
  background: #eaa636;
  border-radius: 50px;
  z-index: 1;
  box-shadow: 0 4px 16px rgba(234,166,54,0.35);
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
}

/* ── SERVICES GRID ───────────────────────────────────── */
.grid-section { padding: 5rem 0 4rem; }

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
}

/* Alternating offset like HomeView */
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .svc-card--offset { margin-top: 2.5rem; }
}
@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.svc-card {
  background: #fff;
  border-radius: var(--radius, 16px);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(30,25,22,0.08);
  border: 1px solid rgba(234,166,54,0.12);
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
}
.svc-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(30,25,22,0.14);
  border-color: rgba(234,166,54,0.35);
}

.svc-img {
  position: relative;
  height: 240px;
  overflow: hidden;
  flex-shrink: 0;
}
.svc-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s ease;
}
.svc-card:hover .svc-img img { transform: scale(1.08); }

.svc-img__gradient {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(30,25,22,0.72) 0%, rgba(30,25,22,0.15) 55%, transparent 100%);
}
.svc-img__hover-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(234,166,54,0.82) 0%, rgba(197,131,30,0.55) 25%, transparent 45%);
  transform: translateY(100%);
  transition: transform 0.5s ease-out;
}
.svc-card:hover .svc-img__hover-overlay { transform: translateY(0); }

.svc-icon-badge {
  position: absolute;
  top: 1rem; right: 1rem;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.3);
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
  transition: transform 0.4s ease;
}
.svc-card:hover .svc-icon-badge { transform: scale(1.15) rotate(6deg); }

.svc-badge {
  position: absolute;
  bottom: 1rem; left: 1rem;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.3rem 0.85rem;
  border-radius: 50px;
  z-index: 2;
}

.svc-content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.svc-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  color: #1e1916;
  margin-bottom: 0.6rem;
  transition: color 0.3s;
}
.svc-card:hover .svc-content h3 { color: #eaa636; }

.svc-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
}
.svc-meta span {
  display: flex; align-items: center; gap: 5px;
  font-size: 0.82rem; font-weight: 600; color: #eaa636;
}
.svc-price { margin-left: auto; }

.svc-content p {
  font-size: 0.9rem;
  color: #545454;
  line-height: 1.7;
  margin-bottom: 1rem;
  flex-grow: 1;
  opacity: 0.88;
}

.svc-features {
  list-style: none;
  margin-bottom: 1.25rem;
}
.svc-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.83rem;
  padding: 0.3rem 0;
  color: #545454;
}

.svc-btn {
  margin-top: auto;
  background: #1e1916;
  color: #fff;
  border: 2px solid #1e1916;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.35s ease;
}
.svc-btn:hover { background: #eaa636; border-color: #eaa636; color: #1e1916; transform: translateY(-2px); }

/* Loading / Empty */
.loading-state, .empty-state {
  text-align: center;
  padding: 5rem 2rem;
}
.loading-state p, .empty-state p { margin: 1rem 0 1.5rem; font-size: 1.05rem; }
.spinner {
  width: 44px; height: 44px;
  border: 4px solid #fdf5eb;
  border-left-color: #eaa636;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: 0 auto 1.25rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── PACKAGES ────────────────────────────────────────── */
.packages-section {
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(135deg, #fffdf7 0%, #fdf5eb 40%, #fff9f0 70%, #ffffff 100%);
  overflow: hidden;
}
.packages-bg-deco {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(234,166,54,0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 100% 100%, rgba(234,166,54,0.08) 0%, transparent 50%);
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.section-header h2 {
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  margin-top: 0.5rem;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  align-items: start;
}
@media (min-width: 900px) {
  .packages-grid { grid-template-columns: repeat(3, 1fr); }
  .packages-grid .pkg-card--popular { margin-top: -1.5rem; }
}

.pkg-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(253,250,245,0.9) 100%);
  border: 1px solid rgba(234,166,54,0.15);
  border-radius: var(--radius, 16px);
  padding: 2.25rem;
  overflow: hidden;
  cursor: default;
  transition: all 0.5s ease;
  backdrop-filter: blur(8px);
}
.pkg-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 60px rgba(234,166,54,0.18);
  border-color: rgba(234,166,54,0.4);
}
.pkg-card--popular {
  border-color: rgba(234,166,54,0.4);
  box-shadow: 0 20px 60px rgba(234,166,54,0.15);
  background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(254,249,235,0.95) 100%);
}

.pkg-card__glow {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(234,166,54,0.06) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
}
.pkg-card:hover .pkg-card__glow { opacity: 1; }

.pkg-card__top-line {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #eaa636, transparent);
  opacity: 0;
  transition: opacity 0.5s;
}
.pkg-card:hover .pkg-card__top-line,
.pkg-card--popular .pkg-card__top-line { opacity: 1; }

.pkg-card__num {
  position: absolute;
  top: -1rem; right: -0.5rem;
  font-size: 7rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: rgba(234,166,54,0.08);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  transition: transform 0.6s ease;
}
.pkg-card--popular .pkg-card__num { color: rgba(234,166,54,0.12); }
.pkg-card:hover .pkg-card__num { transform: scale(1.1); }

.pkg-popular-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1e1916;
  background: #eaa636;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  display: inline-block;
  margin-bottom: 1rem;
}

.pkg-icon {
  width: 52px; height: 52px;
  border-radius: 12px;
  background: linear-gradient(135deg, #eaa636, #c5831e);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
  box-shadow: 0 8px 24px rgba(234,166,54,0.4);
  transition: transform 0.5s ease;
}
.pkg-card:hover .pkg-icon { transform: rotate(6deg) scale(1.06); }

.pkg-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.45rem;
  color: #eaa636;
  margin-bottom: 0.75rem;
  position: relative; z-index: 1;
}

.pkg-price {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  position: relative; z-index: 1;
}
.pkg-price__current {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1e1916;
}
.pkg-price__original {
  font-size: 1rem;
  color: #9e9e9e;
  text-decoration: line-through;
}

.pkg-features {
  list-style: none;
  margin-bottom: 2rem;
  position: relative; z-index: 1;
}
.pkg-features li {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.87rem;
  padding: 0.38rem 0;
  border-bottom: 1px solid rgba(234,166,54,0.08);
  color: #545454;
}
.pkg-features li:last-child { border-bottom: none; }

.pkg-btn {
  width: 100%;
  padding: 0.4rem;
  border-radius: 50px;
  border: 2px solid #eaa636;
  background: transparent;
  color: #1e1916;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.35s ease;
  position: relative; z-index: 1;
}
.pkg-btn:hover { background: #eaa636; color: #1e1916; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(234,166,54,0.35); }
.pkg-card--popular .pkg-btn { background: #eaa636; color: #1e1916; }
.pkg-card--popular .pkg-btn:hover { background: #1e1916; color: #fff; border-color: #1e1916; }

/* ── CTA BANNER ──────────────────────────────────────── */
.cta-section {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.cta-bg {
  position: absolute; inset: 0; z-index: 0;
}
.cta-bg img {
  width: 100%; height: 100%; object-fit: cover; object-position: center top;
}
.cta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(30,25,22,0.92) 0%,
    rgba(30,25,22,0.78) 50%,
    rgba(30,25,22,0.6) 100%
  );
}
.cta-content {
  position: relative; z-index: 2;
  text-align: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.cta-content h2 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: #fff;
  margin-bottom: 1.2rem;
  margin-top: 0.5rem;
}
.cta-content p {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  max-width: 560px;
  margin: 0 auto 2.25rem;
  line-height: 1.8;
}
.cta-btns {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

  /* ── ADMIN UI ────────────────────────────────────────── */
  .admin-fab {
    position: fixed;
    bottom: 2.5rem;
    right: 2.5rem;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #eaa636, #c5831e);
    border: none;
    box-shadow: 0 10px 35px rgba(234, 166, 54, 0.45);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .admin-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 45px rgba(234, 166, 54, 0.6);
  }

  .admin-fab-menu {
    border-radius: 12px;
    background: #1e1916 !important;
    border: 1px solid rgba(234, 166, 54, 0.3);
    padding: 4px;
  }

  .admin-fab-menu :deep(.v-list-item) {
    color: #fff !important;
    border-radius: 8px;
    margin-bottom: 2px;
  }

  .admin-fab-menu :deep(.v-list-item:hover) {
    background: rgba(234, 166, 54, 0.1) !important;
    color: #eaa636 !important;
  }

  .admin-fab-menu :deep(.v-list-item__prepend .v-icon) {
    color: #eaa636 !important;
    opacity: 1;
  }

  .admin-modal {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .modal-header {
    padding: 0.5rem 1rem;
    background: #1e1916;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(234, 166, 54, 0.2);
  }

  .modal-header h2 {
    color: #fff;
    font-size: 1.5rem;
    margin: 0;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: color 0.3s;
  }

  .close-btn:hover { color: #eaa636; }

  .modal-body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-height: 70vh;
    overflow-y: auto;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e1916;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.8rem 1rem;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    font-family: inherit;
    font-size: 0.95rem;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #eaa636;
    box-shadow: 0 0 0 3px rgba(234, 166, 54, 0.15);
  }

  .feature-input {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .feature-input input { flex: 1; }

  .remove-feat {
    background: transparent;
    border: none;
    color: #ff5252;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .remove-feat:hover { opacity: 1; }

  .add-feat-btn {
    background: transparent;
    border: 1px dashed #eaa636;
    color: #eaa636;
    padding: 0.6rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s;
  }

  .add-feat-btn:hover { background: rgba(234, 166, 54, 0.05); }

  .modal-footer {
    padding: 0.5rem 2rem;
    background: #fcfcfc;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    border-top: 1px solid #eee;
  }

  .btn-cancel {
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    border: 1px solid #e0e0e0;
    background: #fff;
    color: #545454;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-cancel:hover { background: #f5f5f5; }

  .btn-submit {
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    border: none;
    background: #eaa636;
    color: #1e1916;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .btn-submit:hover:not(:disabled) {
    background: #d4952d;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(234, 166, 54, 0.3);
  }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .mini-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(30, 25, 22, 0.3);
    border-left-color: #1e1916;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .image-upload-wrapper {
    width: 100%;
  }

  .preview-container {
    position: relative;
    width: 100%;
    height: 180px;
    border-radius: 12px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .preview-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove-img {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
  }

  .remove-img:hover { background: rgba(255, 82, 82, 0.9); }

  .upload-placeholder {
    width: 100%;
    height: 180px;
    border: 2px dashed rgba(234, 166, 54, 0.3);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    cursor: pointer;
    background: rgba(234, 166, 54, 0.03);
    transition: all 0.3s;
  }

  .upload-placeholder:hover {
    background: rgba(234, 166, 54, 0.08);
    border-color: #eaa636;
  }

  .upload-placeholder span {
    font-size: 0.9rem;
    font-weight: 600;
    color: #eaa636;
  }

  .svc-admin-actions {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  }

  .svc-card:hover .svc-admin-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .action-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s;
  }

  .action-btn.edit { background: #fff; color: #1e1916; }
  .action-btn.edit:hover { background: #eaa636; color: #fff; }

  .action-btn.delete { background: #fff; color: #ff5252; }
  .action-btn.delete:hover { background: #ff5252; color: #fff; }


  /* ── RESPONSIVENESS ──────────────────────────────────── */

@media (max-width: 640px) {
  .hero-content h1 { font-size: 2.2rem; }
  .hero-content  { text-align: center; }
  .hero-btns    { justify-content: center; }
  .tabs-wrap    { flex-wrap: wrap; justify-content: center; }
  .services-grid { grid-template-columns: 1fr; }
  .svc-card--offset { margin-top: 0; }
}
/* Admin Actions */
.manage-cats-btn {
  background: #fdf3e3;
  color: #eaa636;
  border: 1px solid rgba(234,166,54,0.3);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 1rem;
}
.manage-cats-btn:hover {
  background: #eaa636;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(234,166,54,0.2);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  background: #fdfcf7;
  border: 1px solid rgba(30,25,22,0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.category-item:hover {
  background: #fff;
  border-color: rgba(234,166,54,0.3);
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.cat-info {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #1e1916;
}
.cat-actions {
  display: flex;
  gap: 0.5rem;
}

.category-form h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #1e1916;
  margin-bottom: 1rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
}

.mb-6 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-3 { margin-top: 0.75rem; }
.mr-2 { margin-right: 0.5rem; }
.my-4 { margin-top: 1rem; margin-bottom: 1rem; }

.header-with-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.pkg-card {
  position: relative;
}

.pkg-card:hover .svc-admin-actions {
  opacity: 1;
  transform: translateY(0);
}
</style>
