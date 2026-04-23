<template>
  <div class="gallery-page">

    <!-- ── HERO ──────────────────────────────────────── -->
    <section class="gallery-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1595475884562-073c30d45670?w=1600&q=80" alt="gallery hero" />
        <div class="hero-overlay"></div>
      </div>
      <div class="container hero-content">
        <span
          class="eyebrow"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800"
        >Our Gallery</span>
        <h1
          v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="150"
        >
          Artistry in <span class="gold">Every Frame</span>
        </h1>
        <p
          v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="900" :delay="300"
        >
          Discover the transformations, artistry and luminous results our clients experience at Oasis.
        </p>
        <div class="hero-divider"
          v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800" :delay="500"
        >
          <span></span><span class="dot"></span><span></span>
        </div>
      </div>
    </section>

    <!-- ── FILTER TABS ────────────────────────────────── -->
    <section class="tabs-section">
      <div class="container tabs-container">
        <div
          class="tabs-wrap"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="700" :delay="100"
        >
          <button
            v-for="(filter, index) in filters"
            :key="filter.id"
            class="tab-btn"
            :class="{ active: activeFilter === filter.id }"
            @click="setActiveFilter(filter.id, index)"
            :ref="(el) => setFilterButtonRef(el, index)"
          >
            <v-icon :icon="filter.icon" size="16"></v-icon>
            {{ filter.name }}
          </button>
          <div class="tab-slider" :style="sliderStyle"></div>
        </div>

        <!-- Admin Actions -->
        <div v-if="isAdmin" class="admin-actions">
          <button 
            class="btn-add-gallery"
            @click="openAddModal"
            v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }" :duration="700" :delay="200"
          >
            <v-icon icon="mdi-plus-circle-outline" size="20"></v-icon>
            <span>Add Photo</span>
          </button>

          <button 
            class="btn-add-category"
            @click="openCategoryModal"
            v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }" :duration="700" :delay="250"
          >
            <v-icon icon="mdi-folder-plus-outline" size="20"></v-icon>
            <span>Add Category</span>
          </button>
        </div>

      </div>
    </section>

    <!-- ── MOSAIC GRID ────────────────────────────────── -->
    <section class="grid-section">
      <!-- decorative glows -->
      <div class="grid-bg-deco" aria-hidden="true"></div>

      <div class="container">

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading gallery…</p>
        </div>

        <!-- Mosaic grid -->
        <div v-else-if="filteredWorks.length > 0" class="mosaic-grid">
          <!-- Add New Card (Admin Only) -->
          <div 
            v-if="isAdmin"
            class="mosaic-item mosaic-item--add"
            @click="openAddModal"
            v-motion :initial="{ opacity: 0, scale: 0.92 }" :visibleOnce="{ opacity: 1, scale: 1 }" :duration="800"
          >
            <div class="add-content">
              <div class="add-icon">
                <v-icon icon="mdi-plus" size="42" color="#eaa636"></v-icon>
              </div>
              <p>Add New Work</p>
            </div>
            <div class="mosaic-border"></div>
          </div>

          <div
            v-for="(work, index) in filteredWorks"
            :key="work._id"
            class="mosaic-item"
            :class="getMosaicClass(isAdmin ? index + 1 : index)"
            @click="openLightbox(work, index)"
            v-motion :initial="{ opacity: 0, scale: 0.92 }" :visibleOnce="{ opacity: 1, scale: 1 }" :delay="(isAdmin ? index + 1 : index) * 80" :duration="800"
          >
            <!-- Image -->
            <img :src="work.image" :alt="work.title" loading="lazy" />

            <!-- Decorative inner border -->
            <div class="mosaic-border" aria-hidden="true"></div>

            <!-- Glass overlay (hover) -->
            <div class="mosaic-overlay">
              <div class="mosaic-overlay__inner">
                <span class="mosaic-category">{{ work.category }}</span>
                <h4>{{ work.title }}</h4>
                <div class="mosaic-zoom">
                  <v-icon icon="mdi-magnify-plus" size="22" color="#1e1916"></v-icon>
                </div>
                <!-- Admin Actions -->
                <div v-if="isAdmin" class="item-actions" @click.stop>
                  <button class="action-btn action-btn--edit" @click="openEditModal(work)" title="Edit">
                    <v-icon icon="mdi-pencil" size="16"></v-icon>
                  </button>
                  <button class="action-btn action-btn--delete" @click="deleteGalleryWork(work._id)" title="Delete">
                    <v-icon icon="mdi-trash-can-outline" size="16"></v-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Always-visible label -->
            <div class="mosaic-label">
              <div>
                <p class="mosaic-label__cat">{{ work.category }}</p>
                <h5 class="mosaic-label__title">{{ work.title }}</h5>
              </div>
              <span class="mosaic-label__line"></span>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="empty-state">
          <v-icon icon="mdi-image-off-outline" size="52" color="#eaa636"></v-icon>
          <p>No works found for <strong>{{ activeFilter }}</strong>.</p>
          <button class="btn-gold" @click="setActiveFilter('all', 0)">View All Works</button>
        </div>

        <!-- Load More -->
        <!-- Infinite-scroll sentinel -->
        <div ref="sentinelRef" class="scroll-sentinel" aria-hidden="true"></div>
        <div v-if="loadingMore" class="loading-more">
          <div class="spinner spinner--sm"></div>
        </div>
      </div>
    </section>

    <!-- ── LIGHTBOX ────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="lb">
        <div v-if="showLightbox" class="lightbox" @click.self="closeLightbox">
          <!-- Close -->
          <button class="lb-close" @click="closeLightbox" aria-label="Close">
            <v-icon icon="mdi-close" size="22"></v-icon>
          </button>

          <!-- Prev / Next -->
          <button class="lb-nav lb-nav--prev" @click="prevImage" aria-label="Previous">
            <v-icon icon="mdi-chevron-left" size="28"></v-icon>
          </button>
          <button class="lb-nav lb-nav--next" @click="nextImage" aria-label="Next">
            <v-icon icon="mdi-chevron-right" size="28"></v-icon>
          </button>

          <div class="lb-content" @click.stop>
            <!-- Image pane -->
            <div class="lb-image">
              <img :src="currentWork.image" :alt="currentWork.title" />
            </div>

            <!-- Info pane -->
            <div class="lb-info">
              <span class="eyebrow">{{ currentWork.category }}</span>
              <h3>{{ currentWork.title }}</h3>
              <div class="lb-divider">
                <span></span><span class="dot"></span><span></span>
              </div>
              <p>{{ currentWork.description }}</p>
              <div class="lb-meta">
                <div class="lb-meta__item">
                  <v-icon icon="mdi-clock-outline" size="18" color="#eaa636"></v-icon>
                  <span>{{ currentWork.duration }}</span>
                </div>
                <div class="lb-meta__item">
                  <v-icon icon="mdi-account-circle-outline" size="18" color="#eaa636"></v-icon>
                  <span>{{ currentWork.stylist }}</span>
                </div>
              </div>
              <button class="btn-gold" style="margin-top:1.75rem;" @click="bookNow">
                Book This Look
              </button>

              <!-- Admin Actions in Lightbox -->
              <div v-if="isAdmin" class="lb-admin-actions">
                <button class="btn-outline-admin" @click="openEditModal(currentWork)">
                  <v-icon icon="mdi-pencil" size="18"></v-icon> Edit Work
                </button>
                <button class="btn-outline-admin btn-outline-admin--delete" @click="deleteGalleryWork(currentWork._id)">
                  <v-icon icon="mdi-delete" size="18"></v-icon> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── ADD WORK MODAL (ADMIN) ───────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddModal" class="modal-overlay overflow-y-auto" @click.self="closeAddModal">
          <div class="modal-card" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            <div class="modal-header">
              <h3>{{ isEditing ? 'Edit Gallery Work' : 'Add New Gallery Work' }}</h3>
              <button class="btn-close" @click="closeAddModal">
                <v-icon icon="mdi-close" size="20"></v-icon>
              </button>
            </div>
            
            <form @submit.prevent="saveNewWork" class="modal-form overflow-y-auto">
              <div class="form-grid">
                <div class="form-group">
                  <label>Title</label>
                  <input v-model="newWorkForm.title" type="text" placeholder="e.g. Royal Bridal Glow" required />
                </div>
                
                <div class="form-group">
                  <label>Category</label>
                  <select v-model="newWorkForm.category" required>
                    <option value="" disabled>Select Category</option>
                    <option v-for="cat in availableCategories" :key="cat" :value="cat">
                      {{ cat }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Duration</label>
                  <input v-model="newWorkForm.duration" type="text" placeholder="e.g. 3 hrs" />
                </div>

                <div class="form-group">
                  <label>Stylist</label>
                  <input v-model="newWorkForm.stylist" type="text" placeholder="e.g. Priya Sharma" />
                </div>
              </div>

              <div class="form-group">
                <label>Description</label>
                <textarea v-model="newWorkForm.description" rows="3" placeholder="Describe the look..."></textarea>
              </div>

              <div class="form-group">
                <label>Image</label>
                <div class="image-upload-box" @click="triggerFileInput">
                  <input 
                    type="file" 
                    ref="fileInput" 
                    class="hidden" 
                    accept="image/*" 
                    @change="onImageChange" 
                  />
                  <div v-if="!newWorkImagePreview" class="upload-placeholder">
                    <v-icon icon="mdi-cloud-upload-outline" size="32"></v-icon>
                    <p>Click to upload image</p>
                  </div>
                  <img v-else :src="newWorkImagePreview" class="preview-img" />
                </div>
              </div>

              <div class="modal-footer pt-2">
                <button type="button" class="btn-cancel" @click="closeAddModal">Cancel</button>
                <button type="submit" class="btn-save" :disabled="saving">
                  <span v-if="saving">{{ isEditing ? 'Updating...' : 'Saving...' }}</span>
                  <span v-else>{{ isEditing ? 'Update' : 'Save' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── ADD CATEGORY MODAL (ADMIN) ────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showCategoryModal" class="modal-overlay" @click.self="closeCategoryModal">
          <div class="modal-card modal-card--small" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            <div class="modal-header">
              <h3>Add New Category</h3>
              <button class="btn-close" @click="closeCategoryModal">
                <v-icon icon="mdi-close" size="20"></v-icon>
              </button>
            </div>
            
            <form @submit.prevent="saveNewCategory" class="modal-form">
              <div class="form-group">
                <label>Category Name</label>
                <input v-model="newCategoryForm.name" type="text" placeholder="e.g. Skin Care" required />
              </div>
              
              <div class="form-group">
                <label>Icon (MDI Name)</label>
                <div class="icon-input-wrap">
                  <input v-model="newCategoryForm.icon" type="text" placeholder="e.g. mdi-spa" required />
                  <div class="icon-preview" v-if="newCategoryForm.icon">
                    <v-icon :icon="newCategoryForm.icon" size="24" color="#eaa636"></v-icon>
                  </div>
                </div>
                <p class="form-hint">Use any Material Design Icon name (e.g., mdi-face-woman)</p>
              </div>

              <div class="modal-footer pt-4">
                <button type="button" class="btn-cancel" @click="closeCategoryModal">Cancel</button>
                <button type="submit" class="btn-save" :disabled="savingCategory">
                  <span v-if="savingCategory">Saving...</span>
                  <span v-else>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── CTA BANNER ─────────────────────────────────── -->
    <section class="cta-section">
      <div class="cta-bg">
        <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80" alt="cta" />
        <div class="cta-overlay"></div>
      </div>
      <div class="container cta-content">
        <span
          class="eyebrow eyebrow--light"
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="700"
        >Ready for Your Transformation?</span>
        <h2
          v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900" :delay="150"
        >
          Book Your <span class="gold">Session</span> Today
        </h2>
        <p
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="800" :delay="300"
        >
          Let us create your own stunning story. Our certified stylists bring out your best — every time.
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

    <!-- ── ADMIN FAB ──────────────────────────────────── -->
    <div v-if="isAdmin" class="admin-fab-container">
      <button class="admin-fab" @click="openAddModal" title="Add New Work">
        <v-icon icon="mdi-plus" size="24"></v-icon>
        <span class="fab-text">Add New Work</span>
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import apiStore from '@/api/apiStore';
import serviceApi from '@/api/serviceApi';
import { useAuthStore } from '@/stores/authStore';
import type { Filter, GalleryWork, GalleryCategory } from '@/types/Gallery';
import type { ServiceCategory } from '@/types/Services';
import { defineComponent, ref, computed, onMounted, nextTick, watch, type ComponentPublicInstance } from 'vue';

export default defineComponent({
  name: 'Gallery',
  setup() {
    const authStore        = useAuthStore();
    const activeFilter     = ref<string>('all');
    const showLightbox     = ref<boolean>(false);
    const currentWorkIndex = ref<number>(0);
    const itemsPerLoad     = ref<number>(9);
    const visibleItems     = ref<number>(9);
    const loading          = ref<boolean>(true);
    const loadingMore      = ref<boolean>(false);
    const sentinelRef      = ref<HTMLElement | null>(null);
    const fileInput        = ref<HTMLInputElement | null>(null);
    let   observer: IntersectionObserver | null = null;

    // Tab slider
    const filterButtons  = ref<(HTMLElement | null)[]>([]);
    const sliderPosition = ref<number>(0);
    const sliderWidth    = ref<number>(0);
    const sliderHeight   = ref<number>(0);
    const sliderTop      = ref<number>(0);

    const filters = ref<Filter[]>([
      { id: 'all', name: 'All Works', icon: 'mdi-star' },
    ]);

    const galleryWorks = ref<GalleryWork[]>([]);

    // Admin State
    const showCategoryModal = ref(false);
    const savingCategory = ref(false);
    const newCategoryForm = ref({
      name: '',
      icon: 'mdi-star'
    });

    const showAddModal = ref(false);
    const saving = ref(false);
    const isEditing = ref(false);
    const editingId = ref<string | null>(null);
    const newWorkImageFile = ref<File | null>(null);
    const newWorkImagePreview = ref<string>('');
    const newWorkForm = ref({
      title: '',
      category: '',
      description: '',
      duration: '',
      stylist: ''
    });

    /* ── COMPUTED ─────────────────────────────────────── */
    const isAdmin = computed(() => authStore.user?.userType === 'ADMIN');

    const availableCategories = computed(() => {
      return filters.value
        .filter(f => f.id !== 'all')
        .map(f => f.name);
    });

    const filteredWorks = computed(() => {
      const list =
        activeFilter.value === 'all'
          ? galleryWorks.value
          : galleryWorks.value.filter(
              (w) => w.category.toLowerCase() === activeFilter.value,
            );
      return list.slice(0, visibleItems.value);
    });

    const currentWork = computed(() => galleryWorks.value[currentWorkIndex.value]);

    const showLoadMore = computed(() => {
      if (activeFilter.value === 'all') return visibleItems.value < galleryWorks.value.length;
      const filtered = galleryWorks.value.filter(
        (w) => w.category.toLowerCase() === activeFilter.value,
      );
      return visibleItems.value < filtered.length;
    });

    const sliderStyle = computed(() => ({
      transform:  `translateX(${sliderPosition.value}px)`,
      width:      `${sliderWidth.value}px`,
      height:     `${sliderHeight.value}px`,
      top:        `${sliderTop.value}px`,
    }));

    /* ── HELPERS ──────────────────────────────────────── */
    // Mosaic sizing: every 7th item spans 2 cols + 2 rows, 3rd spans 2 rows
    const getMosaicClass = (index: number) => {
      const pos = index % 7;
      if (pos === 0) return 'mosaic-item--large';
      if (pos === 3) return 'mosaic-item--tall';
      return '';
    };

    /* ── TAB SLIDER ───────────────────────────────────── */
    const setFilterButtonRef = (el: Element | ComponentPublicInstance | null, index: number) => {
      if (el instanceof HTMLElement) filterButtons.value[index] = el;
      else if (el && typeof el === 'object' && '$el' in el)
        filterButtons.value[index] = (el as ComponentPublicInstance).$el as HTMLElement;
      else filterButtons.value[index] = null;
    };

    const updateSliderPosition = async (index: number) => {
      await nextTick();
      const btn = filterButtons.value[index];
      if (btn) {
        const bRect = btn.getBoundingClientRect();
        const cRect = btn.parentElement!.getBoundingClientRect();
        sliderPosition.value = bRect.left - cRect.left;
        sliderWidth.value    = bRect.width;
        sliderHeight.value   = bRect.height;
        sliderTop.value      = bRect.top - cRect.top;
      }
    };

    const setActiveFilter = async (id: string, index: number) => {
      activeFilter.value  = id;
      visibleItems.value  = itemsPerLoad.value;
      await updateSliderPosition(index);
    };

    /* ── LIGHTBOX ─────────────────────────────────────── */
    const openLightbox = (_work: GalleryWork, index: number) => {
      currentWorkIndex.value = index;
      showLightbox.value     = true;
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      showLightbox.value = false;
      document.body.style.overflow = '';
    };

    const nextImage = () => {
      currentWorkIndex.value =
        (currentWorkIndex.value + 1) % galleryWorks.value.length;
    };

    const prevImage = () => {
      currentWorkIndex.value =
        (currentWorkIndex.value - 1 + galleryWorks.value.length) %
        galleryWorks.value.length;
    };

    /* ── INFINITE SCROLL ──────────────────────────────── */
    const loadMore = async () => {
      if (loadingMore.value || !showLoadMore.value) return;
      loadingMore.value = true;
      await new Promise((r) => setTimeout(r, 600)); // simulate brief load delay
      visibleItems.value += itemsPerLoad.value;
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

    const bookNow = () => alert('Redirecting to booking…');

    /* ── ADMIN ACTIONS ────────────────────────────────── */
    const openAddModal = () => {
      isEditing.value = false;
      editingId.value = null;
      newWorkForm.value = {
        title: '',
        category: '',
        description: '',
        duration: '',
        stylist: ''
      };
      newWorkImageFile.value = null;
      newWorkImagePreview.value = '';
      showAddModal.value = true;
      document.body.style.overflow = 'hidden';
    };

    const openEditModal = (work: GalleryWork) => {
      isEditing.value = true;
      editingId.value = work._id;
      newWorkForm.value = {
        title: work.title,
        category: work.category,
        description: work.description,
        duration: work.duration,
        stylist: work.stylist
      };
      newWorkImageFile.value = null;
      newWorkImagePreview.value = work.image;
      showAddModal.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeAddModal = () => {
      showAddModal.value = false;
      document.body.style.overflow = '';
    };

    const openCategoryModal = () => {
      newCategoryForm.value = {
        name: '',
        icon: 'mdi-star'
      };
      showCategoryModal.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeCategoryModal = () => {
      showCategoryModal.value = false;
      document.body.style.overflow = '';
    };

    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    const onImageChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        newWorkImageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          newWorkImagePreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const saveNewCategory = async () => {
      try {
        savingCategory.value = true;
        await serviceApi.createServiceCategory(newCategoryForm.value);
        await loadGalleryCategories();
        closeCategoryModal();
        alert('Category added successfully!');
      } catch (error) {
        console.error('Failed to save category:', error);
        alert('Failed to save category. Please try again.');
      } finally {
        savingCategory.value = false;
      }
    };

    const saveNewWork = async () => {
      if (!isEditing.value && !newWorkImageFile.value) {
        alert('Please select an image');
        return;
      }

      try {
        saving.value = true;
        const formData = new FormData();
        formData.append('title', newWorkForm.value.title);
        formData.append('category', newWorkForm.value.category);
        formData.append('description', newWorkForm.value.description);
        formData.append('duration', newWorkForm.value.duration);
        formData.append('stylist', newWorkForm.value.stylist);
        
        if (newWorkImageFile.value) {
          formData.append('image', newWorkImageFile.value);
        }

        if (isEditing.value && editingId.value) {
          await apiStore.updateGallery(editingId.value, formData);
          alert('Gallery work updated successfully!');
        } else {
          await apiStore.createGallery(formData);
          alert('Gallery work added successfully!');
        }
        
        await loadGalleryWorks();
        closeAddModal();
      } catch (error) {
        console.error('Failed to save gallery work:', error);
        alert('Failed to save gallery work. Please try again.');
      } finally {
        saving.value = false;
      }
    };

    const deleteGalleryWork = async (id: string) => {
      if (!confirm('Are you sure you want to delete this work?')) return;

      try {
        await apiStore.deleteGallery(id);
        await loadGalleryWorks();
        if (showLightbox.value) closeLightbox();
        alert('Gallery work deleted successfully!');
      } catch (error) {
        console.error('Failed to delete gallery work:', error);
        alert('Failed to delete gallery work.');
      }
    };

    /* ── DATA LOADERS ─────────────────────────────────── */
    const loadGalleryCategories = async () => {
      try {
        const cats = await serviceApi.getAllServiceCategories();
        filters.value = [
          { id: 'all', name: 'All Works', icon: 'mdi-star' },
          ...cats.map((c: ServiceCategory) => ({
            id:   c.name.toLowerCase(),
            name: c.name,
            icon: c.icon || 'mdi-tag',
          })),
        ];
      } catch (error) {
        console.error('Failed to load categories from Service API:', error);
        filters.value = [
          { id: 'all',      name: 'All Works', icon: 'mdi-star'           },
          { id: 'bridal',   name: 'Bridal',    icon: 'mdi-heart'          },
          { id: 'makeup',   name: 'Makeup',    icon: 'mdi-brush'          },
          { id: 'hair',     name: 'Hair',      icon: 'mdi-content-cut'    },
          { id: 'nails',    name: 'Nails',     icon: 'mdi-hand-back-left' },
          { id: 'wellness', name: 'Wellness',  icon: 'mdi-spa'            },
        ];
      }
    };

    const loadGalleryWorks = async () => {
      try {
        loading.value = true;
        galleryWorks.value = await apiStore.getAllGalleries();
      } catch {
        // galleryWorks.value = [
        //   // ── BRIDAL ─────────────────────────────────────
        //   { _id: '1',  title: 'Royal Bridal Glow',      category: 'Bridal',
        //     image: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=600&q=80',
        //     description: 'An ethereal bridal look — dewy skin, champagne eyes and a classic red lip.',
        //     duration: '3 hrs',    stylist: 'Priya Sharma' },
        //   { _id: '2',  title: 'Golden Hour Bride',       category: 'Bridal',
        //     image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
        //     description: 'Warm golden tones, soft smoky eye and flawlessly highlighted cheekbones.',
        //     duration: '2.5 hrs',  stylist: 'Ananya Roy' },
        //   { _id: '3',  title: 'Celestial Bridal',        category: 'Bridal',
        //     image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
        //     description: 'Soft peach tones, pearl highlights and intricate eye art.',
        //     duration: '3.5 hrs',  stylist: 'Sonal Gupta' },
        //   { _id: '4',  title: 'Classic Bengali Bride',   category: 'Bridal',
        //     image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80',
        //     description: 'Traditional red & gold, bold eye and contoured nose for the ideal Bengali bride.',
        //     duration: '4 hrs',    stylist: 'Priya Sharma' },
        //   // ── MAKEUP ─────────────────────────────────────
        //   { _id: '5',  title: 'Party Glam Smoky',        category: 'Makeup',
        //     image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
        //     description: 'Deep charcoal smoky eye with metallic foil lid — bold and camera-ready.',
        //     duration: '60 min',   stylist: 'Ananya Roy' },
        //   { _id: '6',  title: 'Natural Dewy Glow',       category: 'Makeup',
        //     image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
        //     description: 'Glass-skin finish with peachy blush and a barely-there lip.',
        //     duration: '45 min',   stylist: 'Sonal Gupta' },
        //   { _id: '7',  title: 'Festive Ethnic Glam',     category: 'Makeup',
        //     image: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&q=80',
        //     description: 'Vibrant kohl-rimmed eyes and terracotta lips for Indian festive beauty.',
        //     duration: '75 min',   stylist: 'Priya Sharma' },
        //   { _id: '8',  title: 'Editorial Cut Crease',    category: 'Makeup',
        //     image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80',
        //     description: 'Sharp cut-crease in cobalt blue with graphic liner — a bold editorial look.',
        //     duration: '90 min',   stylist: 'Ananya Roy' },
        //   // ── HAIR ───────────────────────────────────────
        //   { _id: '9',  title: 'Silk Balayage Waves',     category: 'Hair',
        //     image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80',
        //     description: 'Honey-caramel balayage with voluminous beach waves.',
        //     duration: '3 hrs',    stylist: 'Rinku Das' },
        //   { _id: '10', title: 'Sleek Keratin Blow',      category: 'Hair',
        //     image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
        //     description: 'Post-keratin blowout: pin-straight, mirror-shine and frizz-free.',
        //     duration: '2 hrs',    stylist: 'Rinku Das' },
        //   { _id: '11', title: 'Bridal Updo',             category: 'Hair',
        //     image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&q=80',
        //     description: 'Intricately pinned updo with fresh flowers and embellished pins.',
        //     duration: '90 min',   stylist: 'Sonal Gupta' },
        //   { _id: '12', title: 'Chic Bob Cut',            category: 'Hair',
        //     image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
        //     description: 'Precision asymmetric bob that frames the face perfectly.',
        //     duration: '60 min',   stylist: 'Rinku Das' },
        //   // ── NAILS ──────────────────────────────────────
        //   { _id: '13', title: 'French Ombre Nails',      category: 'Nails',
        //     image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
        //     description: 'Soft pink-to-white ombre gel nails with shimmer top coat.',
        //     duration: '60 min',   stylist: 'Meera Bose' },
        //   { _id: '14', title: 'Floral Nail Art',         category: 'Nails',
        //     image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
        //     description: 'Hand-painted micro florals on a nude base — intricate bespoke artistry.',
        //     duration: '90 min',   stylist: 'Meera Bose' },
        //   { _id: '15', title: 'Glitter Gel Mani',        category: 'Nails',
        //     image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
        //     description: 'Chunky gold glitter encapsulated in a long-wearing gel.',
        //     duration: '45 min',   stylist: 'Meera Bose' },
        //   // ── WELLNESS ───────────────────────────────────
        //   { _id: '16', title: 'Aromatherapy Session',    category: 'Wellness',
        //     image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
        //     description: 'Full-body massage with carefully blended essential oils for total relaxation.',
        //     duration: '60 min',   stylist: 'Tanya Mehta' },
        //   { _id: '17', title: 'Japanese Head Spa',       category: 'Wellness',
        //     image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
        //     description: 'Scalp exfoliation, oil treatment and pressure-point massage.',
        //     duration: '45 min',   stylist: 'Tanya Mehta' },
        //   { _id: '18', title: 'Glow Facial',             category: 'Wellness',
        //     image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
        //     description: 'Brightening facial with vitamin-C serum, enzyme mask & LED therapy.',
        //     duration: '75 min',   stylist: 'Sonal Gupta' },
        //   { _id: '19', title: 'Body Polish Ritual',      category: 'Wellness',
        //     image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        //     description: 'Sugar-coffee full-body scrub followed by warm wrap and hydrating butter.',
        //     duration: '90 min',   stylist: 'Tanya Mehta' },
        //   { _id: '20', title: 'Deep Tissue Massage',     category: 'Wellness',
        //     image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
        //     description: 'Targeted deep-tissue work to release chronic tension in the back & shoulders.',
        //     duration: '45 min',   stylist: 'Tanya Mehta' },
        // ];
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await loadGalleryCategories();
      await loadGalleryWorks();
      setTimeout(() => { updateSliderPosition(0); setupObserver(); }, 200);

      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (!showLightbox.value) return;
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft')  prevImage();
      });
    });

    // Re-attach observer after filter change so new sentinel is watched
    watch(activeFilter, async () => {
      await nextTick();
      setupObserver();
    });

    return {
      activeFilter, filters, filteredWorks, currentWork,
      showLightbox, showLoadMore, sliderStyle, loading, loadingMore, sentinelRef,
      setFilterButtonRef, setActiveFilter,
      getMosaicClass,
      openLightbox, closeLightbox, nextImage, prevImage,
      loadMore, bookNow,
      // Admin
      isAdmin, showAddModal, saving, newWorkForm, newWorkImagePreview, 
      isEditing, availableCategories, openAddModal, openEditModal, closeAddModal, onImageChange, saveNewWork,
      deleteGalleryWork,
      showCategoryModal, savingCategory, newCategoryForm, openCategoryModal, closeCategoryModal, saveNewCategory,
      fileInput, triggerFileInput
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

/* ── TOKENS ──────────────────────────────────────────── */
* { box-sizing: border-box; margin: 0; padding: 0; }

.gallery-page {
  font-family: 'Open Sans', sans-serif;
  color: #545454;
  background: #fffdf7;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ── SHARED ──────────────────────────────────────────── */
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

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
  color: #1e1916;
  line-height: 1.15;
}

.hero-divider, .lb-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: center;
}
.hero-divider span:not(.dot), .lb-divider span:not(.dot) {
  width: 64px; height: 1px; background: rgba(234,166,54,0.4);
}
.hero-divider .dot, .lb-divider .dot {
  width: 8px; height: 8px; border-radius: 50%; background: #eaa636;
}

/* Buttons */
.btn-gold {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #eaa636; color: #1e1916;
  font-family: 'Playfair Display', serif;
  font-weight: 700; font-size: 0.88rem;
  letter-spacing: 0.05em; text-transform: uppercase;
  padding: 0.85rem 2rem; border: none; border-radius: 50px; cursor: pointer;
  transition: all 0.35s ease;
  box-shadow: 0 5px 18px rgba(234,166,54,0.35);
  position: relative; overflow: hidden; z-index: 1;
}
.btn-gold::before {
  content: ''; position: absolute; inset: 0;
  background: #1e1916; width: 0;
  transition: width 0.35s ease; z-index: -1; border-radius: 50px;
}
.btn-gold:hover { color: #fff; transform: translateY(-3px); box-shadow: 0 8px 28px rgba(234,166,54,0.5); }
.btn-gold:hover::before { width: 100%; }

.btn-whatsapp {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #198754; color: #fff;
  font-weight: 700; font-size: 0.85rem;
  letter-spacing: 0.05em; text-transform: uppercase;
  padding: 0.85rem 2rem; border: none; border-radius: 50px; cursor: pointer;
  text-decoration: none; transition: all 0.35s ease;
}
.btn-whatsapp:hover { background: #157347; transform: translateY(-3px); }

/* ── HERO ────────────────────────────────────────────── */
.gallery-hero {
  position: relative;
  min-height: 72vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: 5rem;
  overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(30,25,22,0.93) 0%,
    rgba(30,25,22,0.72) 55%,
    rgba(30,25,22,0.45) 100%
  );
}
.hero-content {
  position: relative; z-index: 2;
  text-align: center;
  padding-bottom: 0;
}
.hero-content h1 {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  color: #fff;
  margin-bottom: 1.1rem;
}
.hero-content > p {
  color: rgba(255,255,255,0.75);
  font-size: 1.1rem;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ── TABS ────────────────────────────────────────────── */
.tabs-section {
  background: #fff;
  padding: 1.75rem 0;
  position: sticky;
  top: 0;
  z-index: 40;
  box-shadow: 0 4px 24px rgba(30,25,22,0.07);
}
.tabs-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 1.5rem;
}
.tabs-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #fdf5eb;
  border-radius: 50px;
  padding: 0.55rem;
  width: fit-content;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
}
.admin-fab-container {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 1000;
}

.admin-fab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: #eaa636;
  color: #1e1916;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(234, 166, 54, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
}

.admin-fab:hover {
  width: 180px;
  gap: 0.75rem;
  padding: 0 1.5rem;
  background: #1e1916;
  color: #eaa636;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.fab-text {
  font-size: 0.9rem;
  font-weight: 700;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  display: none;
}

.admin-fab:hover .fab-text {
  opacity: 1;
  transform: translateX(0);
  display: inline;
}

.admin-fab .v-icon {
  transition: transform 0.4s ease;
}

.admin-fab:hover .v-icon {
  transform: rotate(90deg);
}

@media (max-width: 900px) {
  .admin-actions {
    position: static;
  }
}

@media (max-width: 640px) {
  .admin-fab-container {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}

.tab-btn {
  background: transparent; border: none;
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  border-radius: 50px;
  font-size: 0.82rem; font-weight: 600; color: #545454;
  cursor: pointer; white-space: nowrap;
  position: relative; z-index: 2;
  transition: color 0.3s;
}
.tab-btn.active { color: #1e1916; font-weight: 700; }
.tab-btn:hover:not(.active) { color: #eaa636; }

.tab-slider {
  position: absolute; left: 0;
  background: #eaa636;
  border-radius: 50px; z-index: 1;
  box-shadow: 0 4px 16px rgba(234,166,54,0.35);
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
}



/* ── MOSAIC GRID ─────────────────────────────────────── */
.grid-section {
  position: relative;
  padding: 5rem 0 4rem;
  background: linear-gradient(180deg,#fdf3e3 0%,#fff8ee 35%,#fffcf7 65%,#fdf5eb 100%);
  overflow: hidden;
}
.grid-bg-deco {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(234,166,54,0.14) 0%, transparent 65%),
    radial-gradient(ellipse at 0% 100%, rgba(234,166,54,0.08) 0%, transparent 50%);
}

.mosaic-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 250px;
  gap: 1.25rem;
}
@media (max-width: 1024px) {
  .mosaic-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .mosaic-grid { grid-template-columns: 1fr; grid-auto-rows: 260px; }
  .mosaic-item--large, .mosaic-item--tall { grid-column: span 1; grid-row: span 1; }
}

.mosaic-item--add {
  background: #fffdf7 !important;
  border: 2px dashed rgba(234, 166, 54, 0.4) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

.mosaic-item--add:hover {
  border-style: solid !important;
  background: #fff9f0 !important;
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(234, 166, 54, 0.15);
}

.mosaic-item--add .add-content {
  text-align: center;
}

.mosaic-item--add .add-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #1e1916;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: all 0.4s ease;
}

.mosaic-item--add:hover .add-icon {
  background: #eaa636;
  transform: scale(1.1) rotate(90deg);
}

.mosaic-item--add:hover .add-icon .v-icon {
  color: #1e1916 !important;
}

.mosaic-item--add p {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #1e1916;
  margin: 0;
}

.mosaic-item--large { grid-column: span 2; grid-row: span 2; }
.mosaic-item--tall  { grid-row: span 2; }

.mosaic-item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: #1e1916;
  cursor: pointer;
}
.mosaic-item img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.7s ease, opacity 0.5s ease;
  opacity: 0.82;
}
.mosaic-item:hover img { transform: scale(1.1); opacity: 0.62; }

/* Decorative border */
.mosaic-border {
  position: absolute; inset: 14px;
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 10px; pointer-events: none;
  transition: all 0.5s ease;
}
.mosaic-item:hover .mosaic-border {
  inset: 20px;
  border-color: rgba(234,166,54,0.55);
}

/* Glass overlay (shown on hover) */
.mosaic-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity 0.45s ease;
  background: rgba(30,25,22,0.38);
  backdrop-filter: blur(2px);
}
.mosaic-item:hover .mosaic-overlay { opacity: 1; }

.mosaic-overlay__inner {
  text-align: center;
  padding: 1.5rem;
  transform: translateY(12px);
  transition: transform 0.45s ease;
}
.mosaic-item:hover .mosaic-overlay__inner { transform: translateY(0); }

.mosaic-category {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #eaa636;
  display: block;
  margin-bottom: 0.5rem;
}
.mosaic-overlay__inner h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 1rem;
}
.mosaic-zoom {
  width: 44px; height: 44px; border-radius: 50%;
  background: #eaa636;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  transition: background 0.3s ease;
}
.mosaic-zoom:hover { background: #fff; }

/* Always-visible bottom label */
.mosaic-label {
  position: absolute; bottom: 1.25rem; left: 1.25rem; right: 1.25rem;
  display: flex; justify-content: space-between; align-items: flex-end;
  transition: opacity 0.3s ease;
}
.mosaic-item:hover .mosaic-label { opacity: 0; }

.mosaic-label__cat {
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 0.25rem;
}
.mosaic-label__title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem; font-weight: 600;
  color: #fff; line-height: 1.2;
}
.mosaic-label__line {
  width: 32px; height: 1px; background: #eaa636; flex-shrink: 0;
}

/* Infinite scroll */
.scroll-sentinel { height: 1px; }
.loading-more {
  display: flex; justify-content: center; padding: 2rem 0;
}
.spinner--sm {
  width: 28px !important; height: 28px !important;
  border-width: 3px !important;
  margin: 0 !important;
}

/* Loading / Empty */
.loading-state, .empty-state {
  text-align: center; padding: 5rem 2rem;
}
.loading-state p, .empty-state p { margin: 1rem 0 1.5rem; font-size: 1rem; }
.spinner {
  width: 44px; height: 44px;
  border: 4px solid #fdf5eb; border-left-color: #eaa636;
  border-radius: 50%; animation: spin 0.9s linear infinite;
  margin: 0 auto 1.25rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── LIGHTBOX ────────────────────────────────────────── */
.lightbox {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(20,15,10,0.92);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
}

/* Transition */
.lb-enter-active, .lb-leave-active { transition: opacity 0.3s ease; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

.lb-close {
  position: absolute; top: 1.25rem; right: 1.25rem;
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.25);
  color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.3s; z-index: 10;
}
.lb-close:hover { background: #eaa636; color: #1e1916; }

.lb-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; z-index: 10;
}
.lb-nav:hover { background: #eaa636; color: #1e1916; }
.lb-nav--prev { left: 1.25rem; }
.lb-nav--next { right: 1.25rem; }

.lb-content {
  background: #fff;
  border-radius: 16px;
  max-width: 900px; width: 100%;
  max-height: 88vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 640px) {
  .lb-content { grid-template-columns: 1fr; max-height: 90vh; overflow-y: auto; }
  .lb-image { height: 260px; }
}

.lb-image {
  height: 520px; overflow: hidden; flex-shrink: 0;
}
.lb-image img { width: 100%; height: 100%; object-fit: cover; }

.lb-info {
  padding: 2.5rem 2rem;
  display: flex; flex-direction: column; justify-content: center;
  overflow-y: auto;
}
.lb-info .eyebrow { margin-bottom: 0.5rem; }
.lb-info h3 { font-size: 1.65rem; margin-bottom: 0.25rem; }
.lb-info .lb-divider { justify-content: flex-start; margin-bottom: 1.25rem; }
.lb-info p { font-size: 0.93rem; line-height: 1.75; color: #545454; margin-bottom: 1.25rem; }

.lb-meta {
  display: flex; flex-direction: column; gap: 0.65rem;
}
.lb-meta__item {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.88rem; color: #1e1916; font-weight: 600;
}

/* ── CTA ─────────────────────────────────────────────── */
.cta-section {
  position: relative; min-height: 500px;
  display: flex; align-items: center; overflow: hidden;
}
.cta-bg { position: absolute; inset: 0; z-index: 0; }
.cta-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.cta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(30,25,22,0.93) 0%,
    rgba(30,25,22,0.80) 50%,
    rgba(30,25,22,0.62) 100%
  );
}
.cta-content {
  position: relative; z-index: 2;
  text-align: center;
  padding-top: 5rem; padding-bottom: 5rem;
}
.cta-content h2 { font-size: clamp(2rem, 5vw, 3rem); color: #fff; margin-bottom: 1.1rem; margin-top: 0.5rem; }
.cta-content p { color: rgba(255,255,255,0.72); font-size: 1.05rem; max-width: 540px; margin: 0 auto 2.25rem; line-height: 1.8; }
.cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
/* ── MODAL ───────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 25, 22, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
}

.modal-card {
  background: #fffdf7;
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-header {
  padding: 1.5rem;
  background: #1e1916;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  color: #eaa636;
  margin: 0;
  font-size: 1.25rem;
}

.btn-close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: color 0.3s;
}

.btn-close:hover {
  color: #fff;
}

.modal-form {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.1rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e1916;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #eaa636;
  box-shadow: 0 0 0 3px rgba(234, 166, 54, 0.1);
}

.image-upload-box {
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.image-upload-box:hover {
  border-color: #eaa636;
  background: #fff9f0;
}

.upload-placeholder {
  color: #888;
}

.upload-placeholder p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.preview-img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.modal-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancel {
  padding: 0.2rem 1.5rem;
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-save {
  padding: 0.2rem 2rem;
  background: #eaa636;
  color: #1e1916;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(234, 166, 54, 0.3);
}

.btn-save:hover:not(:disabled) {
  background: #d9952b;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(234, 166, 54, 0.4);
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}



/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .modal-card,
.modal-leave-to .modal-card {
  transform: scale(0.9) translateY(20px);
}

/* ── ADMIN ACTIONS ─────────────────────────────────── */
.admin-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-add-gallery,
.btn-add-category {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-add-gallery {
  background: #eaa636;
  color: #1e1916;
  border: none;
  box-shadow: 0 4px 15px rgba(234, 166, 54, 0.25);
}

.btn-add-category {
  background: rgba(30, 25, 22, 0.05);
  color: #1e1916;
  border: 1.5px solid #1e1916;
}

.btn-add-gallery:hover {
  background: #d9952b;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 20px rgba(234, 166, 54, 0.35);
}

.btn-add-category:hover {
  background: #1e1916;
  color: #eaa636;
  transform: translateY(-3px) scale(1.02);
}

/* ── CATEGORY MODAL ────────────────────────────────── */
.modal-card--small {
  max-width: 440px;
}

.icon-input-wrap {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.icon-input-wrap input {
  flex: 1;
}

.icon-preview {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

.form-hint {
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.4rem;
  font-style: italic;
}



@media (max-width: 768px) {
  .admin-actions {
    flex-direction: column;
    width: 100%;
  }
  .btn-add-gallery, .btn-add-category {
    width: 100%;
    justify-content: center;
  }
}
/* ── ACTION BUTTONS ─────────────────────────────────── */
.item-actions {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
}

.action-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.action-btn--edit {
  background: #fff;
  color: #1e1916;
}

.action-btn--edit:hover {
  background: #eaa636;
  color: #1e1916;
  transform: scale(1.1);
}

.action-btn--delete {
  background: rgba(220, 53, 69, 0.9);
  color: #fff;
}

.action-btn--delete:hover {
  background: #dc3545;
  transform: scale(1.1);
}

.lb-admin-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(30, 25, 22, 0.1);
}

.btn-outline-admin {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 1px solid #1e1916;
  border-radius: 50px;
  color: #1e1916;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline-admin:hover {
  background: #1e1916;
  color: #eaa636;
}

.btn-outline-admin--delete {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-admin--delete:hover {
  background: #dc3545;
  color: #fff;
}
</style>