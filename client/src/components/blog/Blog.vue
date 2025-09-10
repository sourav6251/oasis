<template>
  <div class="h-full w-full bg-[#F0F5F3] pb-6">
    <!-- Banner -->
    <div class="relative h-[300px] md:h-[400px] w-full">
      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="1200"
        class="absolute inset-0 bg-[url('background.webp')] bg-cover bg-center bg-no-repeat blur-[2px]"
      ></div>
      <div
        class="relative z-10 h-full flex flex-col items-center justify-center"
      >
        <h1
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="1200"
          class="playfair-d text-3xl md:text-[40px] text-white text-center"
        >
          Beauty Blog & Tips
        </h1>
      </div>
    </div>

    <!-- Add Blog Button -->
    <div class="h-15 w-full mt-5 flex justify-end items-center pr-6">
      <v-btn color="primary" prepend-icon="mdi-plus">Add Blog</v-btn>
    </div>

    <!-- Content -->
    <div class="pt-10 md:pt-16 px-4 md:px-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Main Blog with Vuetify Transition -->
        <v-slide-x-transition mode="out-in">
          <div
            :key="oneBlog?.id"
            class="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              :src="oneBlog?.image"
              class="w-full h-[220px] md:h-[300px] object-cover"
              alt="blog image"
            />

            <div class="px-6 py-6">
              <div class="flex flex-wrap gap-6 text-gray-700 text-sm">
                <div class="flex items-center gap-2">
                  <Calendar :size="16" />
                  <span>{{ oneBlog?.publishDate }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <User :size="16" />
                  <span>{{ oneBlog?.writer }}</span>
                </div>
              </div>

              <h2 class="mt-6 text-2xl md:text-3xl playfair-d font-bold">
                {{ oneBlog?.title }}
              </h2>
              <p class="mt-4 poppins-regular text-gray-700 leading-relaxed">
                {{ oneBlog?.content }}
              </p>
            </div>
          </div>
        </v-slide-x-transition>

        <!-- Related Blogs -->
        <div class="col-span-1" v-if="blogs.length > 0">
          <div
            v-for="value in blogs"
            :key="value.id"
            class="rounded-2xl bg-white shadow-md overflow-hidden mb-6 cursor-pointer hover:scale-[1.02] hover:shadow-lg transition"
            @click="openBlog(value)"
          >
            <img
              class="w-full h-[160px] object-cover"
              :src="value?.image"
              alt=""
            />
            <div class="px-4 py-4">
              <div class="flex flex-wrap gap-6 text-gray-700 text-xs">
                <div class="flex items-center gap-2">
                  <Calendar :size="14" />
                  <span>{{ value?.publishDate }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <User :size="14" />
                  <span>{{ value?.writer }}</span>
                </div>
              </div>
              <h3 class="mt-3 font-bold playfair-d text-lg">
                {{ value?.title }}
              </h3>
              <p class="mt-2 poppins-light text-gray-600 text-sm">
                {{ value?.content.slice(0, 100) }}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { blogData } from '@/sampleData/BlogData'
import { MotionDirective as motion } from '@vueuse/motion'
import { Calendar, User } from 'lucide-vue-next'
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
  components: { Calendar, User },
  directives: { motion: motion() },
  setup() {
    const blogs = ref<BlogData[]>([])
    const oneBlog = ref<BlogData>()

    onBeforeMount(() => {
      blogs.value = blogData
      oneBlog.value = blogData[0]
    })

    const openBlog = (blog: BlogData) => {
      oneBlog.value = blog
    }

    return { blogs, oneBlog, openBlog }
  },
})
</script>
