<template>
  <section class="home-projects">
    <div class="container">
      <div class="section-header text-center mx-auto mb-5" style="max-width: 600px;">
        <p class="section-subtitle mb-2" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800">Our Works</p>
        <h1 class="display-6 mb-4 font-playfair" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
          Discover Our Premium, Unique & Creative Works
        </h1>
      </div>

      <div class="projects-grid">
        <div class="project-col" v-for="(col, colIdx) in projectColumns" :key="colIdx">
          <div class="project-item mb-4" v-for="(project, pIdx) in col" :key="pIdx" v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1 }" :duration="800" :delay="300 + (colIdx * 200) + (pIdx * 100)">
            <img class="img-fluid w-100" :src="project.img" :alt="project.title">
            <div class="project-title h5 mb-0">{{ project.title }}</div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="800">
        <router-link to="/gallery" class="explore-btn">
          Explore More
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projectColumns = [
  [
    { title: "Bridal", img: "/10.jpg" },
    { title: "Bridal", img: "/11.jpeg" }
  ],
  [
    { title: "Bridal", img: "/12.jpg" },
    { title: "Bridal", img: "/13.jpg" }
  ],
  [
    { title: "Bridal", img: "/14.jpg" },
    { title: "Hair Cutting", img: "/15.jpg" }
  ],
  [
    { title: "Agamoni Look", img: "/16.jpg" },
    { title: "Bridal", img: "/17.jpg" }
  ]
];
</script>

<style scoped>
.home-projects {
  padding: 80px 0;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-subtitle {
  color: #eaa636;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}

.font-playfair {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: #1e1916;
}

.display-6 {
  font-size: 2.5rem;
  line-height: 1.2;
}

.text-center { text-align: center; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }
.mt-5 { margin-top: 3rem; }
.w-100 { width: 100%; }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.project-item {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 20px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  display: block;
}

.project-title {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.8rem;
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  color: #1e1916;
  transition: 0.3s;
  opacity: 0;
  transform: translateY(20px);
}

.project-item:hover .project-title {
  opacity: 1;
  transform: translateY(0);
  background: #eaa636;
  color: #fff;
}

.explore-btn {
  display: inline-block;
  padding: 12px 40px;
  background-color: transparent;
  color: #eaa636;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  border: 2px solid #eaa636;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  background-color: #eaa636;
  color: #fff;
}

@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
