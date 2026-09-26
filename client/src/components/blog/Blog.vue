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
                <div class="flex flex-wrap items-center justify-between gap-4 text-[var(--color-dark)] text-sm">
                  <div class="flex flex-wrap items-center gap-6">
                    <div class="flex items-center gap-2">
                      <Calendar :size="16" />
                      <span>{{ formatDate(oneBlog?.publishDate) }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UserIcon :size="16" />
                      <span>{{ oneBlog?.writerName || oneBlog?.writer }}</span>
                    </div>
                  </div>
                  <!-- Admin / Author Delete Button -->
                  <button
                    v-if="canDeleteBlog(oneBlog)"
                    @click.stop="confirmDelete(oneBlog!)"
                    class="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-full transition duration-200 border border-red-200 cursor-pointer"
                    title="Delete Tip"
                  >
                    <Trash2 :size="13" />
                    <span>Delete</span>
                  </button>
                </div>

                <!-- Title -->
                <h2 class="mt-6 text-2xl md:text-3xl playfair-d font-bold text-[var(--color-dark)]">
                  {{ oneBlog?.title }}
                </h2>

                <!-- Content -->
                <div class="mt-4 poppins-regular text-[var(--color-dark)] leading-relaxed blog-content-view" v-html="sanitize(oneBlog?.content)">
                </div>
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
                  v-model="subscriberEmail"
                  variant="outlined"
                  single-line
                  placeholder="Enter your email"
                  hide-details
                  class="flex-1 rounded-full w-full bg-white px-4"
                  density="comfortable"
                  :disabled="subscribing"
                  @keyup.enter="handleSubscribe"
                ></v-text-field>
                <v-btn
                  color="secondary"
                  rounded="pill"
                  class="px-6 font-medium shadow-md hover:shadow-lg w-full"
                  :loading="subscribing"
                  :disabled="subscribing"
                  @click="handleSubscribe"
                >
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
              <div class="flex items-center justify-between gap-2 text-[var(--color-dark)] text-xs mb-2">
                <div class="flex flex-wrap items-center gap-4">
                  <div class="flex items-center gap-1">
                    <Calendar :size="13" />
                    <span>{{ formatDate(value.publishDate) }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <UserIcon :size="13" />
                    <span>{{ value.writerName || value.writer }}</span>
                  </div>
                </div>
                <!-- Admin / Author Delete Button on card -->
                <button
                  v-if="canDeleteBlog(value)"
                  @click.stop="confirmDelete(value)"
                  class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition cursor-pointer"
                  title="Delete Tip"
                >
                  <Trash2 :size="14" />
                </button>
              </div>
              <h3 class="font-bold playfair-d text-lg text-[var(--color-dark)] line-clamp-2">
                {{ value.title }}
              </h3>
              <p class="mt-2 poppins-light text-[var(--color-dark)] text-sm line-clamp-3">
                {{ stripHtml(value.content).slice(0, 100) }}...
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

          <!-- Content (Rich Text) -->
          <div class="mb-4">
            <label class="poppins-regular text-sm text-gray-700 mb-1.5 block font-medium">
              Blog Content <span class="text-red-500">*</span>
            </label>
            <div class="border border-gray-300 rounded-xl overflow-hidden focus-within:border-[#eaa636] focus-within:ring-2 focus-within:ring-[#eaa636]/20 transition bg-white">
              <!-- Formatting Toolbar -->
              <div class="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                <button
                  type="button"
                  @mousedown.prevent="formatDoc('bold')"
                  class="toolbar-btn font-bold text-xs"
                  :class="{ 'is-active': activeStyles.bold }"
                  title="Bold (Ctrl+B)"
                >
                  B
                </button>
                <button
                  type="button"
                  @mousedown.prevent="formatDoc('italic')"
                  class="toolbar-btn italic font-serif text-xs"
                  :class="{ 'is-active': activeStyles.italic }"
                  title="Italic (Ctrl+I)"
                >
                  I
                </button>
                <button
                  type="button"
                  @mousedown.prevent="formatDoc('underline')"
                  class="toolbar-btn underline text-xs"
                  :class="{ 'is-active': activeStyles.underline }"
                  title="Underline (Ctrl+U)"
                >
                  U
                </button>
                <button
                  type="button"
                  @mousedown.prevent="formatDoc('strikeThrough')"
                  class="toolbar-btn line-through text-xs"
                  :class="{ 'is-active': activeStyles.strikeThrough }"
                  title="Strikethrough"
                >
                  S
                </button>
                <span class="w-[1px] h-4 bg-gray-300 mx-1"></span>
                <button
                  type="button"
                  @mousedown.prevent="formatBlock('h3')"
                  class="toolbar-btn font-bold text-[11px] px-2"
                  :class="{ 'is-active': activeStyles.h3 }"
                  title="Heading 3"
                >
                  H3
                </button>
                <button
                  type="button"
                  @mousedown.prevent="formatBlock('p')"
                  class="toolbar-btn text-[11px] px-2"
                  :class="{ 'is-active': activeStyles.p }"
                  title="Paragraph"
                >
                  P
                </button>
                <span class="w-[1px] h-4 bg-gray-300 mx-1"></span>
                <button
                  type="button"
                  @mousedown.prevent="formatDoc('insertUnorderedList')"
                  class="toolbar-btn text-[11px] px-2"
                  :class="{ 'is-active': activeStyles.insertUnorderedList }"
                  title="Bullet List"
                >
                  • List
                </button>
                <button
                  type="button"
                  @mousedown.prevent="formatDoc('insertOrderedList')"
                  class="toolbar-btn text-[11px] px-2"
                  :class="{ 'is-active': activeStyles.insertOrderedList }"
                  title="Numbered List"
                >
                  1. List
                </button>
                <button
                  type="button"
                  @mousedown.prevent="formatBlock('blockquote')"
                  class="toolbar-btn text-[11px] px-2 font-serif italic"
                  :class="{ 'is-active': activeStyles.blockquote }"
                  title="Quote"
                >
                  “ Quote
                </button>
                <span class="w-[1px] h-4 bg-gray-300 mx-1"></span>
                <button
                  type="button"
                  @mousedown.prevent="formatDoc('removeFormat')"
                  class="toolbar-btn text-[11px] px-2 text-gray-500 hover:text-red-500"
                  title="Clear Formatting"
                >
                  Clear
                </button>
              </div>

              <!-- Editable content area -->
              <div
                ref="editorRef"
                contenteditable="true"
                class="rich-editor-content p-3 min-h-[160px] max-h-[300px] overflow-y-auto outline-none text-gray-800 leading-relaxed"
                style="font-size: 14px !important;"
                @input="onEditorInput"
                @keyup="updateActiveStyles"
                @mouseup="updateActiveStyles"
                @click="updateActiveStyles"
                data-placeholder="Write your beauty tip, advice, or recommendations here..."
              ></div>
            </div>
          </div>

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

    <!-- ─── Delete Confirmation Dialog ──────────────────────── -->
    <v-dialog v-model="deleteDialog" max-width="440" persistent>
      <v-card rounded="xl" class="pa-4 text-center">
        <div class="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3 mt-2">
          <Trash2 :size="24" />
        </div>
        <v-card-title class="playfair-d text-lg font-bold text-gray-900 justify-center">
          Delete Beauty Tip?
        </v-card-title>
        <v-card-text class="text-sm text-gray-600 pt-1 pb-4">
          Are you sure you want to delete <span class="font-semibold text-gray-800">"{{ blogToDelete?.title }}"</span>? This action cannot be undone.
        </v-card-text>
        <v-card-actions class="justify-center gap-3 pb-2">
          <v-btn
            variant="outlined"
            rounded="pill"
            class="px-5 text-gray-600"
            @click="cancelDelete"
            :disabled="deleting"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            rounded="pill"
            class="px-6 font-semibold"
            @click="handleDelete"
            :loading="deleting"
          >
            Delete
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
import axiosInstance from '@/api/apiInstance'
import { toast } from 'vue-sonner'
import { MotionDirective as motion } from '@vueuse/motion'
import { Calendar, User as UserIcon, Plus, Image as ImageIcon, X, Trash2 } from 'lucide-vue-next'
import { defineComponent, onMounted, onUnmounted, ref, reactive } from 'vue'
import DOMPurify from 'dompurify'

export default defineComponent({
  name: 'Blog',
  components: { Calendar, UserIcon, Plus, ImageIcon, X, Trash2 },
  directives: { motion: motion() },
  setup() {
    const blogs = ref<BlogData[]>([])
    const oneBlog = ref<BlogData | undefined>()
    const loading = ref(true)
    const { isMobile } = useDevice()

    // Defense-in-depth against stored XSS (SEC-03): never render raw user HTML
    const sanitize = (html?: string) => (html ? DOMPurify.sanitize(html) : '')
    const authStore = useAuthStore()

    // Delete state & handlers
    const deleteDialog = ref(false)
    const blogToDelete = ref<BlogData | null>(null)
    const deleting = ref(false)

    const canDeleteBlog = (blog?: BlogData) => {
      if (!blog || !authStore.isLoggedIn) return false
      const user = authStore.currentUser as any
      if (!user) return false
      const isAdmin = user.userType === 'ADMIN' || user.role === 'admin'
      const isAuthor =
        user.userId &&
        (user.userId === blog.writer || user.userId === (blog.writer as any)?._id)
      return !!(isAdmin || isAuthor)
    }

    const confirmDelete = (blog: BlogData) => {
      blogToDelete.value = blog
      deleteDialog.value = true
    }

    const cancelDelete = () => {
      blogToDelete.value = null
      deleteDialog.value = false
    }

    const handleDelete = async () => {
      if (!blogToDelete.value || !blogToDelete.value._id) return
      deleting.value = true
      try {
        await apiStore.deleteBlog(blogToDelete.value._id)
        toast.success('Beauty tip deleted successfully')

        const deletedId = blogToDelete.value._id
        blogs.value = blogs.value.filter((b) => b._id !== deletedId)

        if (oneBlog.value?._id === deletedId) {
          oneBlog.value = blogs.value.length > 0 ? blogs.value[0] : undefined
        }

        cancelDelete()
      } catch (err: any) {
        console.error('Delete blog error:', err)
        toast.error(err?.response?.data?.message || 'Failed to delete blog')
      } finally {
        deleting.value = false
      }
    }

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

    const editorRef = ref<HTMLDivElement | null>(null)

    const activeStyles = reactive({
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false,
      h3: false,
      p: false,
      insertUnorderedList: false,
      insertOrderedList: false,
      blockquote: false,
    })

    const updateActiveStyles = () => {
      if (!editorRef.value) return
      const sel = window.getSelection()
      if (!sel || !sel.anchorNode || !editorRef.value.contains(sel.anchorNode)) {
        return
      }

      try {
        activeStyles.bold = document.queryCommandState('bold')
        activeStyles.italic = document.queryCommandState('italic')
        activeStyles.underline = document.queryCommandState('underline')
        activeStyles.strikeThrough = document.queryCommandState('strikeThrough')
        activeStyles.insertUnorderedList = document.queryCommandState('insertUnorderedList')
        activeStyles.insertOrderedList = document.queryCommandState('insertOrderedList')

        let node: Node | null = sel.anchorNode
        let inH3 = false
        let inQuote = false
        let inP = false
        while (node && node !== editorRef.value) {
          if (node instanceof HTMLElement) {
            const tag = node.tagName.toLowerCase()
            if (tag === 'h3') inH3 = true
            if (tag === 'blockquote') inQuote = true
            if (tag === 'p') inP = true
          }
          node = node.parentNode
        }
        activeStyles.h3 = inH3
        activeStyles.blockquote = inQuote
        activeStyles.p = inP
      } catch (e) {
        // ignore command state queries
      }
    }

    const resetActiveStyles = () => {
      activeStyles.bold = false
      activeStyles.italic = false
      activeStyles.underline = false
      activeStyles.strikeThrough = false
      activeStyles.h3 = false
      activeStyles.p = false
      activeStyles.insertUnorderedList = false
      activeStyles.insertOrderedList = false
      activeStyles.blockquote = false
    }

    const stripHtml = (html?: string) => {
      if (!html) return ''
      return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim()
    }

    const onEditorInput = () => {
      if (editorRef.value) {
        form.content = editorRef.value.innerHTML
      }
      updateActiveStyles()
    }

    const formatDoc = (cmd: string, val: string | undefined = undefined) => {
      if (editorRef.value && document.activeElement !== editorRef.value) {
        editorRef.value.focus()
      }
      document.execCommand(cmd, false, val)
      onEditorInput()
      updateActiveStyles()
    }

    const formatBlock = (tag: string) => {
      if (editorRef.value && document.activeElement !== editorRef.value) {
        editorRef.value.focus()
      }
      document.execCommand('formatBlock', false, `<${tag}>`)
      onEditorInput()
      updateActiveStyles()
    }

    // ── Newsletter Subscription ──────────────────────────────
    const subscriberEmail = ref(authStore.user?.email || '')
    const subscribing = ref(false)

    const handleSubscribe = async () => {
      const email = subscriberEmail.value.trim()
      if (!email) {
        toast.error('Please enter your email address.')
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Please enter a valid email address.')
        return
      }

      subscribing.value = true
      try {
        const response = await axiosInstance.post('/subscribers', { email })
        toast.success(response.data?.message || 'Subscribed successfully! Check your email.')
        subscriberEmail.value = ''
      } catch (error: any) {
        console.error('Subscription error:', error)
        toast.error(error.response?.data?.message || 'Failed to subscribe. Please try again.')
      } finally {
        subscribing.value = false
      }
    }

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

    const onSelectionChange = () => {
      updateActiveStyles()
    }

    onMounted(() => {
      fetchBlogs()
      document.addEventListener('selectionchange', onSelectionChange)
    })

    onUnmounted(() => {
      document.removeEventListener('selectionchange', onSelectionChange)
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
      if (editorRef.value) {
        editorRef.value.innerHTML = ''
      }
      resetActiveStyles()
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
      if (!stripHtml(form.content)) {
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
      subscriberEmail,
      subscribing,
      handleSubscribe,
      editorRef,
      activeStyles,
      updateActiveStyles,
      stripHtml,
      onEditorInput,
      formatDoc,
      formatBlock,
      deleteDialog,
      blogToDelete,
      deleting,
      canDeleteBlog,
      confirmDelete,
      cancelDelete,
      handleDelete,
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

/* Rich Text Editor & Content Styles */
.toolbar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  padding: 2px 6px;
  border-radius: 6px;
  background: white;
  border: 1px solid #e5e7eb;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.toolbar-btn:hover {
  background: #fdf5eb;
  border-color: #eaa636;
  color: #eaa636;
}

.toolbar-btn.is-active {
  background: #eaa636 !important;
  border-color: #eaa636 !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  box-shadow: 0 1px 4px rgba(234, 166, 54, 0.35);
}

.rich-editor-content {
  font-size: 14px !important;
  line-height: 1.6 !important;
}

.rich-editor-content p,
.rich-editor-content div,
.rich-editor-content span,
.rich-editor-content li {
  font-size: 14px !important;
  line-height: 1.6 !important;
}

.rich-editor-content h3 {
  font-size: 16px !important;
  font-weight: 700;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
}

.rich-editor-content:empty:before {
  content: attr(data-placeholder);
  font-size: 14px !important;
  color: #9ca3af;
  pointer-events: none;
}

.rich-editor-content ul, .blog-content-view ul {
  list-style-type: disc !important;
  margin-left: 1.5rem !important;
  margin-bottom: 0.5rem;
}

.rich-editor-content ol, .blog-content-view ol {
  list-style-type: decimal !important;
  margin-left: 1.5rem !important;
  margin-bottom: 0.5rem;
}

.rich-editor-content blockquote, .blog-content-view blockquote {
  border-left: 3px solid #eaa636;
  padding-left: 0.75rem;
  font-style: italic;
  color: #4b5563;
  margin: 0.75rem 0;
}

.blog-content-view h1, .blog-content-view h2, .blog-content-view h3 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-dark);
}

.blog-content-view h3 {
  font-size: 1.25rem;
}

.blog-content-view {
  font-size: 14px !important;
  line-height: 1.7 !important;
}

.blog-content-view p,
.blog-content-view div,
.blog-content-view span,
.blog-content-view li {
  font-size: 14px !important;
  line-height: 1.7 !important;
}

.blog-content-view p {
  margin-bottom: 0.75rem;
}
</style>