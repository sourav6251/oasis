<template>
  <v-container class="h-full w-full pb-10 pa-0 bg-background" fluid >
    <!-- 🌸 Banner -->
    <v-container  class="relative h-[300px] md:h-[400px] w-full overflow-hidden" fluid>
      <div
        v-motion
        :initial="{ opacity: 0, z: 10 }"
        :enter="{ opacity: 1, z: 0 }"
        :duration="1200"
        class="absolute inset-0 bg-[url('beauty.webp')] bg-cover bg-center bg-no-repeat blur-[2px] transition-transform duration-700 hover:scale-105"
      ></div>

      <div
        class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <h1
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="1200"
          class="playfair-d text-3xl md:text-5xl font-bold text-white drop-shadow-lg"
        >
          Beauty Blog & Tips
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="1200"
          class="poppins-light mt-4 text-white max-w-2xl drop-shadow-md"
        >
          Discover the latest beauty trends, expert tips, and product reviews to
          enhance your natural beauty
        </p>
      </div>
    </v-container >

    <!-- ➕ Add Blog Button -->
    <div class="w-full mt-6 flex justify-end items-center pr-6">
      <v-btn
        color="accent"
        rounded="pill"
        class="shadow-md px-6 font-medium hover:shadow-lg"
      >
        <template #prepend>
          <Plus :size="18" />
        </template>
        Add Blog
      </v-btn>
    </div>

    <!-- ✨ Content -->
    <div class="pt-12 md:pt-16 px-4 md:px-10 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Main Blog -->
        <div class="flex flex-col gap-12 md:col-span-2">
          <v-slide-x-transition mode="out-in">
            <div
              :key="oneBlog?.id"
              class="bg-white rounded-2xl shadow-md overflow-hidden  transition"
            >
              <img
                :src="oneBlog?.image"
                class="w-full h-[220px] md:h-[320px] object-cover hover:scale-105 transition-transform duration-500"
                alt="blog image"
              />

              <div class="px-6 py-8">
                <!-- Meta -->
                <div
                  class="flex flex-wrap gap-6 text-[var(--color-dark)]  text-sm"
                >
                  <div class="flex items-center gap-2">
                    <Calendar :size="16" />
                    <span>{{ oneBlog?.publishDate }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <User :size="16" />
                    <span>{{ oneBlog?.writer }}</span>
                  </div>
                </div>

                <!-- Title -->
                <h2
                  class="mt-6 text-2xl md:text-3xl playfair-d font-bold text-[var(--color-dark)]"
                >
                  {{ oneBlog?.title }}
                </h2>

                <!-- Content -->
                <p
                  class="mt-4 poppins-regular text-[var(--color-dark)] leading-relaxed"
                >
                  {{ oneBlog?.content }}
                </p>
              </div>
            </div>
          </v-slide-x-transition>

          <!-- 📨 Subscribe Section -->
          <div class="px-4 md:px-6" v-if="!isMobile">
            <div
              class="py-10 rounded-2xl flex flex-col items-center justify-center text-center text-white p-8  bg-[url('suscribeback.webp')] bg-cover bg-center bg-no-repeat "
            >
              <!-- Heading -->
              <h2 class="poppins-bold text-2xl md:text-3xl mb-2">
                Join Our Beauty Community
              </h2>

              <!-- Subtitle -->
              <p
                class="poppins-light text-sm md:text-base max-w-md mb-6 opacity-90"
              >
                Subscribe to get exclusive beauty tips and early access to new
                content
              </p>

              <!-- Input + Button -->
              <div
                class="flex flex-col  w-full md:w-3/4 gap-4 items-center justify-center  px-16"
              >
               <v-text-field
                variant="outlined"
                placeholder="Enter your email"
                hide-details
                class="flex-1 rounded-full w-full bg-white  outline-white outline-0 px-4"
                density="comfortable"
              ></v-text-field>

                <v-btn
                  color="secondary"
                  rounded="pill"
                  class="px-6 font-medium shadow-md hover:shadow-lg w-full"
                >
                  Subscribe
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Blogs -->
        <div v-if="blogs.length > 0">
          <h3
            class="playfair-d text-xl mb-4 border-b-2 border-[var(--color-accent)] inline-block pb-1"
          >
            Recent Posts
          </h3>

          <div
            v-for="value in blogs"
            :key="value.id"
            class="rounded-2xl bg-white shadow-md overflow-hidden mb-6 cursor-pointer hover:scale-[1.02] hover:shadow-lg transition"
            @click="openBlog(value)"
          >
            <img
              class="w-full h-[160px] object-cover hover:scale-105 transition-transform duration-500"
              :src="value?.image"
              alt=""
            />
            <div class="px-4 py-4">
              <div
                class="flex flex-wrap gap-6 text-[var(--color-dark)] text-xs mb-2"
              >
                <div class="flex items-center gap-2">
                  <Calendar :size="14" />
                  <span>{{ value?.publishDate }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <User :size="14" />
                  <span>{{ value?.writer }}</span>
                </div>
              </div>
              <h3
                class="font-bold playfair-d text-lg text-[var(--color-dark)] line-clamp-2"
              >
                {{ value?.title }}
              </h3>
              <p
                class="mt-2 poppins-light text-[var(--color-dark)] text-sm line-clamp-3"
              >
                {{ value?.content.slice(0, 100) }}...
              </p>
            </div>
          </div>
        </div>
      </div>
                <!-- 📨 Subscribe Section -->
          <div class="px-4 md:px-6" v-if="isMobile">
            <div
              class=" bg-[url('suscribeback.webp')] bg-cover bg-center bg-no-repeat py-10 rounded-2xl flex flex-col items-center justify-center text-center text-white p-8 shadow-lg bg-[var(--color-accent)]"
            >
              <!-- Heading -->
              <h2 class="poppins-bold text-2xl md:text-3xl mb-2">
                Join Our Beauty Community
              </h2>

              <!-- Subtitle -->
              <p
                class="poppins-light text-sm md:text-base max-w-md mb-6 opacity-90"
              >
                Subscribe to get exclusive beauty tips and early access to new
                content
              </p>

              <!-- Input + Button -->
              <div
                class="flex flex-col  w-full md:w-3/4 gap-4 items-center justify-center  px-16"
              >
               <v-text-field
                variant="outlined"
                placeholder="Enter your email"
                hide-details
                class="flex-1 rounded-full w-full bg-white  outline-white outline-0 px-4"
                density="comfortable"
              ></v-text-field>

                <v-btn
                  color="secondary"
                  rounded="pill"
                  class="px-6 font-medium shadow-md hover:shadow-lg w-full"
                >
                  Subscribe
                </v-btn>
              </div>
            </div>
          </div>
    </div>

  </ v-container>
</template>


<script lang="ts">
import { blogData } from '@/sampleData/BlogData'
import { useDevice } from '@/utils/useDevice'
import { MotionDirective as motion } from '@vueuse/motion'
import { Calendar, User, Plus } from 'lucide-vue-next'
import { defineComponent, onBeforeMount, ref } from 'vue'

interface BlogData {
  id: number
  image: string
  writer: string
  publishDate: string
  title: string
  content: string
}

export default defineComponent({
  name: 'Blog',
  components: { Calendar, User, Plus },
  directives: { motion: motion() },
  setup() {
    const blogs = ref<BlogData[]>([])
    const oneBlog = ref<BlogData>()
    const { isMobile } = useDevice()

    onBeforeMount(() => {
      blogs.value = blogData
      oneBlog.value = blogData[0]
    })

    const openBlog = (blog: BlogData) => {
      oneBlog.value = blog
    }

    return { blogs, oneBlog, openBlog ,isMobile}
  },
})
</script>
<style>
/* Remove border, outline, and focus ring from Vuetify input */
/* .no-border-input .v-field__outline,
.no-border-input .v-field__overlay,
.no-border-input input {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
} */
</style>