<template>
  <div class="admin-container">
    <h1 class="admin-title">Admin Management</h1>

    <!-- Tabs -->
    <div class="tabs">
      <button 
        :class="['tab-btn', { active: activeTab === 'categories' }]"
        @click="activeTab = 'categories'"
      >
        Service Categories
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'services' }]"
        @click="activeTab = 'services'"
      >
        Services
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'galleryCategories' }]"
        @click="activeTab = 'galleryCategories'"
      >
        Gallery Categories
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'gallery' }]"
        @click="activeTab = 'gallery'"
      >
        Gallery
      </button>
    </div>

    <!-- Service Categories Tab -->
    <div v-if="activeTab === 'categories'" class="tab-content">
      <div class="section-header">
        <h2>Service Categories</h2>
        <button class="btn-primary" @click="openCategoryForm()">
          <v-icon icon="mdi-plus" size="20"></v-icon>
          Add Category
        </button>
      </div>

      <!-- Categories List -->
      <div class="items-grid">
        <div v-for="category in categories" :key="category.id" class="item-card category-card">
          <div class="item-content">
            <h3>{{ category.name }}</h3>
            <div class="item-actions">
              <button class="btn-edit" @click="openCategoryForm(category)">
                <v-icon icon="mdi-pencil" size="18"></v-icon>
                Edit
              </button>
              <button class="btn-delete" @click="deleteCategory(category.id)">
                <v-icon icon="mdi-delete" size="18"></v-icon>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Categories Tab -->
    <div v-if="activeTab === 'galleryCategories'" class="tab-content">
      <div class="section-header">
        <h2>Gallery Categories</h2>
        <button class="btn-primary" @click="openGalleryCategoryForm()">
          <v-icon icon="mdi-plus" size="20"></v-icon>
          Add Gallery Category
        </button>
      </div>

      <!-- Gallery Categories List -->
      <div class="items-grid">
        <div v-for="category in galleryCategories" :key="category.id" class="item-card category-card">
          <div class="item-content">
            <div class="category-header">
              <v-icon :icon="category.icon" size="32"></v-icon>
              <h3>{{ category.name }}</h3>
            </div>
            <div class="item-actions">
              <button class="btn-edit" @click="openGalleryCategoryForm(category)">
                <v-icon icon="mdi-pencil" size="18"></v-icon>
                Edit
              </button>
              <button class="btn-delete" @click="deleteGalleryCategory(category.id)">
                <v-icon icon="mdi-delete" size="18"></v-icon>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Tab -->
    <div v-if="activeTab === 'services'" class="tab-content">
      <div class="section-header">
        <h2>Services</h2>
        <button class="btn-primary" @click="openServiceForm()">
          <v-icon icon="mdi-plus" size="20"></v-icon>
          Add Service
        </button>
      </div>

      <!-- Services List -->
      <div class="items-grid">
        <div v-for="service in services" :key="service.id" class="item-card">
          <img :src="service.img" :alt="service.name" class="item-img" />
          <div class="item-content">
            <h3>{{ service.name }}</h3>
            <div class="service-meta">
              <span class="badge">{{ service.category.name }}</span>
              <span class="price">{{ service.price }}</span>
            </div>
            <p>{{ service.description }}</p>
            <div class="item-actions">
              <button class="btn-edit" @click="openServiceForm(service)">
                <v-icon icon="mdi-pencil" size="18"></v-icon>
                Edit
              </button>
              <button class="btn-delete" @click="deleteService(service.id)">
                <v-icon icon="mdi-delete" size="18"></v-icon>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Tab -->
    <div v-if="activeTab === 'gallery'" class="tab-content">
      <div class="section-header">
        <h2>Gallery Works</h2>
        <button class="btn-primary" @click="openGalleryForm()">
          <v-icon icon="mdi-plus" size="20"></v-icon>
          Add Gallery Work
        </button>
      </div>

      <!-- Gallery List -->
      <div class="items-grid">
        <div v-for="work in galleryWorks" :key="work.id" class="item-card">
          <img :src="work.image" :alt="work.title" class="item-img" />
          <div class="item-content">
            <h3>{{ work.title }}</h3>
            <div class="service-meta">
              <span class="badge">{{ work.category }}</span>
              <span class="price">{{ work.duration }}</span>
            </div>
            <p>{{ work.description }}</p>
            <p class="stylist">by {{ work.stylist }}</p>
            <div class="item-actions">
              <button class="btn-edit" @click="openGalleryForm(work)">
                <v-icon icon="mdi-pencil" size="18"></v-icon>
                Edit
              </button>
              <button class="btn-delete" @click="deleteGalleryWork(work.id)">
                <v-icon icon="mdi-delete" size="18"></v-icon>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Form Dialog -->
    <div v-if="showCategoryForm" class="modal-overlay" @click="closeCategoryForm">
      <div class="modal-content" @click.stop>
        <h2>{{ editingCategory ? 'Edit Category' : 'Add Category' }}</h2>
        <form @submit.prevent="saveCategory">
          <div class="form-group">
            <label>Name *</label>
            <input v-model="categoryForm.name" type="text" required />
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="closeCategoryForm">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Gallery Category Form Dialog -->
    <div v-if="showGalleryCategoryForm" class="modal-overlay" @click="closeGalleryCategoryForm">
      <div class="modal-content" @click.stop>
        <h2>{{ editingGalleryCategory ? 'Edit Gallery Category' : 'Add Gallery Category' }}</h2>
        <form @submit.prevent="saveGalleryCategory">
          <div class="form-group">
            <label>Name *</label>
            <input v-model="galleryCategoryForm.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Icon (MDI Icon Name) *</label>
            <input v-model="galleryCategoryForm.icon" type="text" required placeholder="mdi-star" />
            <small>Find icons at <a href="https://pictogrammers.com/library/mdi/" target="_blank">Material Design Icons</a></small>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="closeGalleryCategoryForm">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Service Form Dialog -->
    <div v-if="showServiceForm" class="modal-overlay" @click="closeServiceForm">
      <div class="modal-content" @click.stop>
        <h2>{{ editingService ? 'Edit Service' : 'Add Service' }}</h2>
        <form @submit.prevent="saveService">
          <div class="form-group">
            <label>Name *</label>
            <input v-model="serviceForm.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Category *</label>
            <select v-model="serviceForm.categoryId" required>
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Price *</label>
              <input v-model="serviceForm.price" type="text" required placeholder="₹800" />
            </div>
            <div class="form-group">
              <label>Duration *</label>
              <input v-model="serviceForm.duration" type="text" required placeholder="45 min" />
            </div>
          </div>
          <div class="form-group">
            <label>Description *</label>
            <textarea v-model="serviceForm.description" required rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Image *</label>
            <input type="file" @change="onServiceImageChange" accept="image/*" :required="!editingService" />
            <div v-if="serviceImagePreview" class="image-preview">
              <img :src="serviceImagePreview" alt="Preview" />
            </div>
          </div>
          <div class="form-group">
            <label>Features (one per line) *</label>
            <textarea v-model="featuresText" rows="4" placeholder="Feature 1&#10;Feature 2&#10;Feature 3"></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="closeServiceForm">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Gallery Form Dialog -->
    <div v-if="showGalleryForm" class="modal-overlay" @click="closeGalleryForm">
      <div class="modal-content" @click.stop>
        <h2>{{ editingGalleryWork ? 'Edit Gallery Work' : 'Add Gallery Work' }}</h2>
        <form @submit.prevent="saveGalleryWork">
          <div class="form-group">
            <label>Title *</label>
            <input v-model="galleryForm.title" type="text" required />
          </div>
          <div class="form-group">
            <label>Category *</label>
            <select v-model="galleryForm.category" required>
              <option value="">Select a category</option>
              <option v-for="cat in galleryCategories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Duration *</label>
              <input v-model="galleryForm.duration" type="text" required placeholder="1 hour" />
            </div>
            <div class="form-group">
              <label>Stylist *</label>
              <input v-model="galleryForm.stylist" type="text" required placeholder="Sarah Johnson" />
            </div>
          </div>
          <div class="form-group">
            <label>Description *</label>
            <textarea v-model="galleryForm.description" required rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Image *</label>
            <input type="file" @change="onGalleryImageChange" accept="image/*" :required="!editingGalleryWork" />
            <div v-if="galleryImagePreview" class="image-preview">
              <img :src="galleryImagePreview" alt="Preview" />
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="closeGalleryForm">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import apiStore from '@/api/apiStore';
import type { Service, ServiceCategory } from '@/types/Services';
import type { GalleryWork, GalleryCategory } from '@/types/Gallery';

const activeTab = ref<'categories' | 'services' | 'galleryCategories' | 'gallery'>('categories');
const categories = ref<ServiceCategory[]>([]);
const services = ref<Service[]>([]);
const galleryCategories = ref<GalleryCategory[]>([]);
const galleryWorks = ref<GalleryWork[]>([]);

// Category form
const showCategoryForm = ref(false);
const editingCategory = ref<ServiceCategory | null>(null);
const categoryForm = ref({
  name: ''
});

// Service form
const showServiceForm = ref(false);
const editingService = ref<Service | null>(null);
const serviceForm = ref({
  name: '',
  categoryId: null as number | null,
  price: '',
  duration: '',
  description: '',
  img: '',
  features: [] as string[]
});
const serviceImageFile = ref<File | null>(null);
const serviceImagePreview = ref<string>('');

// Gallery Category form
const showGalleryCategoryForm = ref(false);
const editingGalleryCategory = ref<GalleryCategory | null>(null);
const galleryCategoryForm = ref({
  name: '',
  icon: ''
});

// Gallery form
const showGalleryForm = ref(false);
const editingGalleryWork = ref<GalleryWork | null>(null);
const galleryForm = ref({
  title: '',
  category: '',
  image: '',
  description: '',
  duration: '',
  stylist: ''
});
const galleryImageFile = ref<File | null>(null);
const galleryImagePreview = ref<string>('');

const featuresText = computed({
  get: () => serviceForm.value.features.join('\n'),
  set: (value: string) => {
    serviceForm.value.features = value.split('\n').filter(f => f.trim());
  }
});

// Load data
const loadCategories = async () => {
  try {
    categories.value = await apiStore.getAllServiceCategories();
  } catch (error) {
    // alert('Failed to load categories');
    console.error(error);
  }
};

const loadServices = async () => {
  try {
    services.value = await apiStore.getAllServices();
  } catch (error) {
    // alert('Failed to load services');
    console.error(error);
  }
};

const loadGalleryCategories = async () => {
  try {
    galleryCategories.value = await apiStore.getAllGalleryCategories();
  } catch (error) {
    // alert('Failed to load gallery categories');
    console.error(error);
  }
};

const loadGalleryWorks = async () => {
  try {
    galleryWorks.value = await apiStore.getAllGalleries();
  } catch (error) {
    // alert('Failed to load gallery works');
    console.error(error);
  }
};

// Category operations
const openCategoryForm = (category?: ServiceCategory) => {
  if (category) {
    editingCategory.value = category;
    categoryForm.value = {
      name: category.name
    };
  } else {
    editingCategory.value = null;
    categoryForm.value = { name: '' };
  }
  showCategoryForm.value = true;
};

const closeCategoryForm = () => {
  showCategoryForm.value = false;
  editingCategory.value = null;
};



const saveCategory = async () => {
  try {
    const categoryData = {
      name: categoryForm.value.name
    };

    if (editingCategory.value) {
      await apiStore.updateServiceCategory(editingCategory.value.id, categoryData);
    } else {
      await apiStore.createServiceCategory(categoryData);
    }
    await loadCategories();
    closeCategoryForm();
  } catch (error) {
    alert('Failed to save category');
    console.error(error);
  }
};

const deleteCategory = async (id: number) => {
  if (!confirm('Are you sure you want to delete this category? All services in this category will also be deleted.')) {
    return;
  }
  try {
    await apiStore.deleteServiceCategory(id);
    await loadCategories();
    await loadServices();
  } catch (error) {
    alert('Failed to delete category');
    console.error(error);
  }
};

// Service operations
const openServiceForm = (service?: Service) => {
  if (service) {
    editingService.value = service;
    serviceForm.value = {
      name: service.name,
      categoryId: service.category.id,
      price: service.price,
      duration: service.duration,
      description: service.description,
      img: service.img,
      features: [...service.features]
    };
    serviceImagePreview.value = service.img;
  } else {
    editingService.value = null;
    serviceForm.value = {
      name: '',
      categoryId: null,
      price: '',
      duration: '',
      description: '',
      img: '',
      features: []
    };
    serviceImagePreview.value = '';
  }
  serviceImageFile.value = null;
  showServiceForm.value = true;
};

const closeServiceForm = () => {
  showServiceForm.value = false;
  editingService.value = null;
  serviceImageFile.value = null;
  serviceImagePreview.value = '';
};

const onServiceImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    serviceImageFile.value = file;
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      serviceImagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const saveService = async () => {
  try {
    const category = categories.value.find(c => c.id === serviceForm.value.categoryId);
    if (!category) {
      alert('Please select a category');
      return;
    }

    // Upload image if a new file was selected
    if (serviceImageFile.value) {
      const response = await apiStore.uploadFile(serviceImageFile.value);
      serviceForm.value.img = response.url;
    }

    const serviceData = {
      name: serviceForm.value.name,
      price: serviceForm.value.price,
      duration: serviceForm.value.duration,
      description: serviceForm.value.description,
      img: serviceForm.value.img,
      features: serviceForm.value.features,
      category: category
    };

    if (editingService.value) {
      await apiStore.updateService(editingService.value.id, serviceData);
    } else {
      await apiStore.createService(serviceData);
    }
    await loadServices();
    closeServiceForm();
  } catch (error) {
    alert('Failed to save service');
    console.error(error);
  }
};

const deleteService = async (id: number) => {
  if (!confirm('Are you sure you want to delete this service?')) {
    return;
  }
  try {
    await apiStore.deleteService(id);
    await loadServices();
  } catch (error) {
    alert('Failed to delete service');
    console.error(error);
  }
};

// Gallery Category operations
const openGalleryCategoryForm = (category?: GalleryCategory) => {
  if (category) {
    editingGalleryCategory.value = category;
    galleryCategoryForm.value = {
      name: category.name,
      icon: category.icon
    };
  } else {
    editingGalleryCategory.value = null;
    galleryCategoryForm.value = {
      name: '',
      icon: ''
    };
  }
  showGalleryCategoryForm.value = true;
};

const closeGalleryCategoryForm = () => {
  showGalleryCategoryForm.value = false;
  editingGalleryCategory.value = null;
};

const saveGalleryCategory = async () => {
  try {
    const categoryData = {
      name: galleryCategoryForm.value.name,
      icon: galleryCategoryForm.value.icon
    };

    if (editingGalleryCategory.value) {
      await apiStore.updateGalleryCategory(editingGalleryCategory.value.id, categoryData);
    } else {
      await apiStore.createGalleryCategory(categoryData);
    }
    await loadGalleryCategories();
    closeGalleryCategoryForm();
  } catch (error) {
    alert('Failed to save gallery category');
    console.error(error);
  }
};

const deleteGalleryCategory = async (id: number) => {
  if (!confirm('Are you sure you want to delete this gallery category?')) {
    return;
  }
  try {
    await apiStore.deleteGalleryCategory(id);
    await loadGalleryCategories();
  } catch (error) {
    alert('Failed to delete gallery category');
    console.error(error);
  }
};

// Gallery operations
const openGalleryForm = (work?: GalleryWork) => {
  if (work) {
    editingGalleryWork.value = work;
    galleryForm.value = {
      title: work.title,
      category: work.category,
      image: work.image,
      description: work.description,
      duration: work.duration,
      stylist: work.stylist
    };
    galleryImagePreview.value = work.image;
  } else {
    editingGalleryWork.value = null;
    galleryForm.value = {
      title: '',
      category: '',
      image: '',
      description: '',
      duration: '',
      stylist: ''
    };
    galleryImagePreview.value = '';
  }
  galleryImageFile.value = null;
  showGalleryForm.value = true;
};

const closeGalleryForm = () => {
  showGalleryForm.value = false;
  editingGalleryWork.value = null;
  galleryImageFile.value = null;
  galleryImagePreview.value = '';
};

const onGalleryImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    galleryImageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      galleryImagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const saveGalleryWork = async () => {
  try {
    // Upload image if a new file was selected
    if (galleryImageFile.value) {
      const response = await apiStore.uploadFile(galleryImageFile.value);
      galleryForm.value.image = response.url;
    }

    const workData = {
      title: galleryForm.value.title,
      category: galleryForm.value.category,
      image: galleryForm.value.image,
      description: galleryForm.value.description,
      duration: galleryForm.value.duration,
      stylist: galleryForm.value.stylist
    };

    if (editingGalleryWork.value) {
      await apiStore.updateGallery(editingGalleryWork.value.id, workData);
    } else {
      await apiStore.createGallery(workData);
    }
    await loadGalleryWorks();
    closeGalleryForm();
  } catch (error) {
    alert('Failed to save gallery work');
    console.error(error);
  }
};

const deleteGalleryWork = async (id: number) => {
  if (!confirm('Are you sure you want to delete this gallery work?')) {
    return;
  }
  try {
    await apiStore.deleteGallery(id);
    await loadGalleryWorks();
  } catch (error) {
    alert('Failed to delete gallery work');
    console.error(error);
  }
};

onMounted(() => {
  loadCategories();
  loadServices();
  loadGalleryCategories();
  loadGalleryWorks();
});
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.admin-title {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2A363B;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #E0E0E0;
}

.tab-btn {
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #9DC9C7;
  border-bottom-color: #9DC9C7;
}

.tab-content {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 1.8rem;
  color: #2A363B;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #9DC9C7;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #8AB8B6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(157, 201, 199, 0.3);
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.item-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.item-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.item-content {
  padding: 20px;
}

.item-content h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #2A363B;
}

.item-content p {
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.category-header h3 {
  margin: 0;
}

.service-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.badge {
  background: #E6C8A4;
  color: #2A363B;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #9DC9C7;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.btn-edit,
.btn-delete {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.category-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 120px;
}

.category-card .item-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-card h3 {
  margin-bottom: 0;
}

.btn-edit {
  background: #FFD1C8;
  color: #2A363B;
}

.btn-edit:hover {
  background: #FFC0B5;
}

.btn-delete {
  background: #ffebee;
  color: #c62828;
}

.btn-delete:hover {
  background: #ffcdd2;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;
}

.modal-content {
  background: white;
  padding: 32px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-content h2 {
  margin-bottom: 24px;
  color: #2A363B;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2A363B;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #E0E0E0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #9DC9C7;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-secondary {
  padding: 10px 24px;
  background: #E0E0E0;
  color: #2A363B;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #D0D0D0;
}

.image-preview {
  margin-top: 12px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #E0E0E0;
}

.image-preview img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  display: block;
}

.stylist {
  font-style: italic;
  color: #666;
  font-size: 0.9rem;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .items-grid {
    grid-template-columns: 1fr;
  }
}
</style>