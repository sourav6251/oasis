<template>
  <v-container class="h-full w-full pb-10 pa-0 bg-background" fluid>
    <!-- 🌸 Banner -->
    <v-container class="relative h-[300px] md:h-[400px] w-full overflow-hidden" fluid>
      <div
        v-motion
        :initial="{ opacity: 0, z: 10 }"
        :enter="{ opacity: 1, z: 0 }"
        :duration="1200"
        class="header-background absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] transition-transform duration-700 hover:scale-105"
      ></div>

      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="1200"
          class="playfair-d text-3xl md:text-5xl font-bold text-black drop-shadow-lg fleur"
        >
          Beauty Blog &amp; Tips
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="1200"
          class="poppins-light mt-4 text-black max-w-2xl drop-shadow-md"
        >
          Discover the latest beauty trends, expert tips, and product reviews to
          enhance your natural beauty
        </p>
      </div>
    </v-container>

    <!-- ➕ Add Blog Button (only for logged-in users) -->
    <div class="w-full mt-6 flex justify-end items-center pr-6">
      <v-btn
        v-if="authStore.isLoggedIn"
        color="accent"
        rounded="pill"
        class="shadow-md px-6 font-medium hover:shadow-lg"
        @click="openAddDialog"
      >
        <template #prepend>
          <Plus :size="18" />
        </template>
        Add Blog
      </v-btn>
    </div>

    <!-- ✨ Loading Skeleton -->
    <div v-if="loading" class="pt-12 px-4 md:px-10 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="md:col-span-2">
          <v-skeleton-loader type="image, article" rounded="xl" />
        </div>
        <div>
          <v-skeleton-loader type="article" rounded="xl" />
          <v-skeleton-loader type="article" class="mt-4" rounded="xl" />
        </div>
      </div>
    </div>

    <!-- ✨ Content -->
    <div v-else-if="blogs.length > 0" class="pt-12 md:pt-16 px-4 md:px-10 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Main Blog -->
        <div class="flex flex-col gap-12 md:col-span-2">
          <v-slide-x-transition mode="out-in">
            <div
              :key="oneBlog?._id"
              class="bg-white rounded-2xl shadow-md overflow-hidden transition"
            >
              <!-- Image Carousel for main blog -->
              <v-carousel
                v-if="oneBlog && oneBlog.images && oneBlog.images.length > 0"
                height="320"
                hide-delimiter-background
                :show-arrows="oneBlog.images.length > 1 ? 'hover' : false"
              >
                <v-carousel-item
                  v-for="(img, idx) in oneBlog.images"
                  :key="idx"
                >
                  <img
                    :src="img.url"
                    class="w-full h-full object-cover"
                    alt="blog image"
                  />
                </v-carousel-item>
              </v-carousel>
              <!-- Fallback for legacy single image -->
              <img
                v-else-if="oneBlog?.image"
                :src="oneBlog.image"
                class="w-full h-[220px] md:h-[320px] object-cover hover:scale-105 transition-transform duration-500"
                alt="blog image"
              />

              <div class="px-6 py-8">
                <!-- Meta -->
                <div class="flex flex-wrap gap-6 text-[var(--color-dark)] text-sm">
                  <div class="flex items-center gap-2">
                    <Calendar :size="16" />
                    <span>{{ formatDate(oneBlog?.publishDate) }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <UserIcon :size="16" />
                    <span>{{ oneBlog?.writerName || oneBlog?.writer }}</span>
                  </div>
                </div>

                <!-- Title -->
                <h2 class="mt-6 text-2xl md:text-3xl playfair-d font-bold text-[var(--color-dark)]">
                  {{ oneBlog?.title }}
                </h2>

                <!-- Content -->
                <p class="mt-4 poppins-regular text-[var(--color-dark)] leading-relaxed whitespace-pre-line">
                  {{ oneBlog?.content }}
                </p>
              </div>
            </div>
          </v-slide-x-transition>

          <!-- 📨 Subscribe Section (desktop) -->
          <div class="px-4 md:px-6" v-if="!isMobile">
            <div class="py-10 rounded-2xl flex flex-col items-center justify-center text-center text-white p-8 bg-[url('/suscribeback.webp')] bg-cover bg-center bg-no-repeat">
              <h2 class="poppins-bold text-2xl md:text-3xl mb-2">Join Our Beauty Community</h2>
              <p class="poppins-light text-sm md:text-base max-w-md mb-6 opacity-90">
                Subscribe to get exclusive beauty tips and early access to new content
              </p>
              <div class="flex flex-col w-full md:w-3/4 gap-4 items-center justify-center px-16">
                <v-text-field
                  variant="outlined"
                  single-line
                  placeholder="Enter your email"
                  hide-details
                  class="flex-1 rounded-full w-full bg-white px-4"
                  density="comfortable"
                ></v-text-field>
                <v-btn color="secondary" rounded="pill" class="px-6 font-medium shadow-md hover:shadow-lg w-full">
                  Subscribe
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Posts Sidebar -->
        <div>
          <h3 class="playfair-d text-xl mb-4 border-b-2 border-[var(--color-accent)] inline-block pb-1">
            Recent Posts
          </h3>

          <div
            v-for="value in blogs"
            :key="value._id"
            class="rounded-2xl bg-white shadow-md overflow-hidden mb-6 cursor-pointer hover:scale-[1.02] hover:shadow-lg transition"
            @click="openBlog(value)"
          >
            <!-- Thumbnail (first image) -->
            <img
              v-if="value.images && value.images.length > 0"
              class="w-full h-[160px] object-cover hover:scale-105 transition-transform duration-500"
              :src="value.images[0].url"
              alt="blog thumbnail"
            />
            <img
              v-else-if="value.image"
              class="w-full h-[160px] object-cover"
              :src="value.image"
              alt=""
            />
            <div class="px-4 py-4">
              <div class="flex flex-wrap gap-4 text-[var(--color-dark)] text-xs mb-2">
                <div class="flex items-center gap-1">
                  <Calendar :size="13" />
                  <span>{{ formatDate(value.publishDate) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <UserIcon :size="13" />
                  <span>{{ value.writerName || value.writer }}</span>
                </div>
              </div>
              <h3 class="font-bold playfair-d text-lg text-[var(--color-dark)] line-clamp-2">
                {{ value.title }}
              </h3>
              <p class="mt-2 poppins-light text-[var(--color-dark)] text-sm line-clamp-3">
                {{ value.content.slice(0, 100) }}...
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 📨 Subscribe (mobile) -->
      <div class="px-4 md:px-6 mt-8" v-if="isMobile">
        <div class="suscribeback-background py-10 rounded-2xl flex flex-col items-center justify-center text-center text-white p-8 shadow-lg">
          <h2 class="poppins-bold text-2xl mb-2">Join Our Beauty Community</h2>
          <p class="poppins-light text-sm max-w-md mb-6 opacity-90">
            Subscribe to get exclusive beauty tips and early access to new content
          </p>
          <div class="flex flex-col w-full gap-4 items-center px-4">
            <v-text-field
              variant="outlined"
              placeholder="Enter your email"
              hide-details
              class="rounded-full w-full bg-white px-4"
              density="comfortable"
            ></v-text-field>
            <v-btn color="secondary" rounded="pill" class="px-6 font-medium shadow-md w-full">
              Subscribe
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="pt-20 flex flex-col items-center justify-center text-center px-4">
      <img src="../../assets/empty_blog.png" class="w-48 h-48 mb-6 opacity-60 rounded-xl" alt="No blogs yet" onerror="this.style.display='none'" />
      <h3 class="playfair-d text-2xl font-bold text-[var(--color-dark)] mb-2">No blogs yet</h3>
      <p class="poppins-light text-gray-500 mb-6">Be the first to share your beauty story!</p>
      <v-btn
        v-if="authStore.isLoggedIn"
        color="accent"
        rounded="pill"
        class="px-8"
        @click="openAddDialog"
      >
        <template #prepend><Plus :size="18" /></template>
        Write a Blog
      </v-btn>
    </div>

    <!-- ─── Add Blog Dialog ─────────────────────────────────── -->
    <v-dialog v-model="addDialog" max-width="680" persistent>
      <v-card rounded="xl" class="pa-2">
        <v-card-title class="playfair-d text-xl pt-6 px-6">
          ✍️ Write a New Blog
        </v-card-title>

        <v-card-text class="px-6 pb-0">
          <!-- Title -->
          <v-text-field
            v-model="form.title"
            label="Blog Title"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            class="mb-4"
            :rules="[(v) => !!v || 'Title is required']"
          />

          <!-- Content -->
          <v-textarea
            v-model="form.content"
            label="Blog Content"
            variant="outlined"
            rounded="lg"
            rows="6"
            auto-grow
            class="mb-4"
            :rules="[(v) => !!v || 'Content is required']"
          />

          <!-- Multi-Image Upload -->
          <div class="mb-2">
            <label class="poppins-regular text-sm text-gray-600 mb-1 block">
              Upload Images <span class="text-xs text-gray-400">(max 10)</span>
            </label>
            <div
              class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[var(--color-accent)] transition"
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <ImageIcon :size="32" class="mx-auto text-gray-400 mb-2" />
              <p class="poppins-light text-sm text-gray-500">
                Click to select or drag &amp; drop images here
              </p>
              <p class="text-xs text-gray-400 mt-1">PNG, JPG, WEBP supported</p>
              <input
                ref="fileInputRef"
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                @change="handleFileChange"
              />
            </div>

            <!-- Image Previews -->
            <div v-if="previewImages.length > 0" class="mt-3 flex flex-wrap gap-3">
              <div
                v-for="(src, i) in previewImages"
                :key="i"
                class="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm group"
              >
                <img :src="src" class="w-full h-full object-cover" alt="preview" />
                <button
                  class="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                  @click.stop="removeImage(i)"
                >
                  <X :size="14" class="text-white" />
                </button>
              </div>
            </div>
          </div>

          <!-- Error -->
          <v-alert v-if="formError" type="error" variant="tonal" rounded="lg" class="mt-2 mb-0">
            {{ formError }}
          </v-alert>
        </v-card-text>

        <v-card-actions class="px-6 pb-6 pt-4 gap-3">
          <v-btn
            variant="text"
            rounded="pill"
            @click="closeDialog"
            :disabled="submitting"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            color="accent"
            rounded="pill"
            class="px-8"
            :loading="submitting"
            @click="submitBlog"
          >
            Publish Blog
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script lang="ts">
import type { BlogData } from '@/types/Blog'
import { useDevice } from '@/utils/useDevice'
import { useAuthStore } from '@/stores/authStore'
import apiStore from '@/api/apiStore'
import { MotionDirective as motion } from '@vueuse/motion'
import { Calendar, User as UserIcon, Plus, Image as ImageIcon, X } from 'lucide-vue-next'
import { defineComponent, onMounted, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Blog',
  components: { Calendar, UserIcon, Plus, ImageIcon, X },
  directives: { motion: motion() },
  setup() {
    const blogs = ref<BlogData[]>([])
    const oneBlog = ref<BlogData | undefined>()
    const loading = ref(true)
    const { isMobile } = useDevice()
    const authStore = useAuthStore()

    // Dialog state
    const addDialog = ref(false)
    const submitting = ref(false)
    const formError = ref('')
    const fileInputRef = ref<HTMLInputElement | null>(null)
    const selectedFiles = ref<File[]>([])
    const previewImages = ref<string[]>([])

    const form = reactive({
      title: '',
      content: '',
    })

    // ── Fetch blogs from API ─────────────────────────────────
    const fetchBlogs = async () => {
      loading.value = true
      try {
        const data = await apiStore.getAllBlogs()
        blogs.value = data || []
        if (blogs.value.length > 0) {
          oneBlog.value = blogs.value[0]
        }
      } catch (error) {
        console.error('Failed to load blogs:', error)
        blogs.value = []
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchBlogs()
    })

    const openBlog = (blog: BlogData) => {
      oneBlog.value = blog
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const formatDate = (date?: string | Date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    // ── Dialog helpers ───────────────────────────────────────
    const openAddDialog = () => {
      addDialog.value = true
      formError.value = ''
    }

    const closeDialog = () => {
      addDialog.value = false
      form.title = ''
      form.content = ''
      selectedFiles.value = []
      previewImages.value = []
      formError.value = ''
    }

    const triggerFileInput = () => {
      fileInputRef.value?.click()
    }

    const addFiles = (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const remaining = 10 - selectedFiles.value.length
      const toAdd = fileArray.slice(0, remaining)
      toAdd.forEach((file) => {
        selectedFiles.value.push(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          previewImages.value.push(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      })
    }

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input.files) addFiles(input.files)
      input.value = '' // reset so same file can be re-selected
    }

    const handleDrop = (event: DragEvent) => {
      if (event.dataTransfer?.files) addFiles(event.dataTransfer.files)
    }

    const removeImage = (index: number) => {
      selectedFiles.value.splice(index, 1)
      previewImages.value.splice(index, 1)
    }

    // ── Submit blog ──────────────────────────────────────────
    const submitBlog = async () => {
      formError.value = ''

      if (!form.title.trim()) {
        formError.value = 'Please enter a blog title.'
        return
      }
      if (!form.content.trim()) {
        formError.value = 'Please enter blog content.'
        return
      }
      if (selectedFiles.value.length === 0) {
        formError.value = 'Please upload at least one image.'
        return
      }

      submitting.value = true
      try {
        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('content', form.content)
        selectedFiles.value.forEach((file) => {
          formData.append('images', file)
        })

        const newBlog = await apiStore.createBlog(formData)
        blogs.value.unshift(newBlog)
        oneBlog.value = newBlog
        closeDialog()
      } catch (err: any) {
        formError.value =
          err?.response?.data?.message || 'Failed to publish blog. Please try again.'
      } finally {
        submitting.value = false
      }
    }

    return {
      blogs,
      oneBlog,
      loading,
      isMobile,
      authStore,
      openBlog,
      formatDate,
      // dialog
      addDialog,
      submitting,
      formError,
      form,
      fileInputRef,
      previewImages,
      openAddDialog,
      closeDialog,
      triggerFileInput,
      handleFileChange,
      handleDrop,
      removeImage,
      submitBlog,
    }
  },
})
</script>

<style>
.header-background {
  background-image: url('@/assets/beauty.webp');
}
.suscribeback-background {
  background-image: url('@/assets/suscribeback.webp');
}
</style>