<template>
  <div class="bg-gray-100 py-8">
    <!-- Category Tabs -->
    <div class="px-6 lg:px-12 mb-8">
      <div class="flex gap-2 flex-wrap">
        <button 
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory(cat)"
          :class="selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'"
          class="px-5 py-2 rounded-full font-medium text-sm transition"
        >
          {{ cat }}
        </button>
      </div>
      <!-- Active Filter / Search Info -->
      <div class="mt-4 text-sm text-gray-600">
        <template v-if="activeSearchQuery">
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-2">Discover</span>
          Search results for: <span class="font-semibold">"{{ activeSearchQuery }}"</span>
          <span class="ml-2 text-xs">({{ filteredProjects.length }} found)</span>
        </template>
        <template v-else>
          Showing: <span class="font-semibold">{{ selectedCategory }}</span>
          <span class="ml-2 text-xs">({{ filteredProjects.length }})</span>
        </template>
      </div>
    </div>

    <!-- Project Grid -->
    <div class="px-6 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Project Card -->
        <div 
          v-for="project in displayedProjects" 
          :key="project.id"
          @click="openDetailModal(project)"
          class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div class="aspect-[4/3] bg-gray-200 overflow-hidden">
            <img 
              v-if="project.image" 
              :src="project.image" 
              :alt="project.title" 
              class="w-full h-full object-cover" 
            />
            <div v-else class="w-full h-full bg-gray-300"></div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">{{ project.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: {{ project.offering }}</p>
            <p class="text-xs text-gray-500 mb-1">Seeking: {{ project.seeking }}</p>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreProjects" class="flex justify-center mt-8">
        <button 
          @click="loadMore"
          class="px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
        >
          Load More
        </button>
      </div>
    </div>

    <!-- Detail Modal -->
    <DetailModal 
      :isOpen="showDetailModal"
      :data="selectedProject"
      type="explore"
      @close="closeDetailModal"
      @accept-task="handleAcceptTask"
    />
  </div>
</template>

<script>
import DetailModal from './DetailModal.vue'

export default {
  name: 'ExploreHero',
  components: {
    DetailModal
  },
  data() {
    return {
      categories: ['Discover', 'Popular', 'Animation', 'Branding', 'Illustration', 'Product Design', 'Typography'],
      selectedCategory: 'Popular',
      itemsPerPage: 6,
      currentPage: 1,
      showDetailModal: false,
      selectedProject: null,
      allProjects: [
        {
          id: 1,
          title: 'Custom Digital Artwork Commission',
          offering: 'I will create epic custom digital art for you',
          seeking: 'A short, low-op "free teach back to use to the background of my screen.',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
          category: 'Illustration',
          deadline: '7 Days'
        },
        {
          id: 2,
          title: 'Presentation Slide Makeover',
          offering: "I'll revamp your slides to suit your needs, clean, and professional!",
          seeking: 'Help with formatting a presentation that many have messages in English.',
          image: 'https://images.unsplash.com/photo-1558403194-611308249627?w=400',
          category: 'Product Design',
          deadline: '14 Days'
        },
        {
          id: 3,
          title: 'One-Page Profile Website',
          offering: "I'll build a responsive HTML/CSS/JS to showcase your profile or idea/case",
          seeking: 'A cohesionist lifecycle photograph suitable for the website.',
          image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400',
          category: 'Product Design',
          deadline: '21 Days'
        },
        {
          id: 4,
          title: 'Beginner Acoustic Guitar Lessons',
          offering: 'Two private online guitar lessons for guitar, chords, and strumming',
          seeking: 'Simple video editing services to put together my song cover video.',
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
          category: 'Discover',
          deadline: '7 Days'
        },
        {
          id: 5,
          title: 'Gaming Partner for Rank Push',
          offering: 'I will help you rank up in Mobile Legends/PUBG, communicate and plan strategies',
          seeking: 'A game streaming channel...',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
          category: 'Discover',
          deadline: '30 Days'
        },
        {
          id: 6,
          title: 'Custom Line Art Icon Illustration',
          offering: "I'll create one custom line art icon for your logo or personal record",
          seeking: 'A 30-minute consultation on social media marketing strategy for my portfolio.',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
          category: 'Illustration',
          deadline: '10 Days'
        },
        {
          id: 7,
          title: 'Brand Identity Design',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Branding',
          deadline: '21 Days'
        },
        {
          id: 8,
          title: 'Motion Graphics Video',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Animation',
          deadline: '14 Days'
        },
        {
          id: 9,
          title: 'Logo Animation',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Animation',
          deadline: '7 Days'
        },
        {
          id: 10,
          title: 'Custom Font Design',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Typography',
          deadline: '30 Days'
        },
        {
          id: 11,
          title: 'Brand Guidelines Package',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Branding',
          deadline: '28 Days'
        },
        {
          id: 12,
          title: 'Letter Spacing Workshop',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Typography',
          deadline: '7 Days'
        }
      ]
    }
  },
  computed: {
    activeSearchQuery() {
      return this.$route.query.search ? String(this.$route.query.search) : ''
    },
    filteredProjects() {
      const categoryFiltered = this.selectedCategory === 'Popular'
        ? this.allProjects
        : this.allProjects.filter(project => project.category === this.selectedCategory)

      if (!this.activeSearchQuery) {
        return categoryFiltered
      }

      const query = this.activeSearchQuery.toLowerCase()
      return categoryFiltered.filter(project => 
        [project.title, project.offering, project.seeking]
          .some(field => field && field.toLowerCase().includes(query))
      )
    },
    displayedProjects() {
      return this.filteredProjects.slice(0, this.currentPage * this.itemsPerPage)
    },
    hasMoreProjects() {
      return this.displayedProjects.length < this.filteredProjects.length
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
      this.currentPage = 1
      // Auto-clear search when selecting non-Discover categories
      if (category !== 'Discover' && this.$route.query.search) {
        this.$router.push({ path: '/explore' })
      }
    },
    loadMore() {
      this.currentPage++
    },
    openDetailModal(project) {
      this.selectedProject = project
      this.showDetailModal = true
      document.body.style.overflow = 'hidden'
    },
    closeDetailModal() {
      this.showDetailModal = false
      this.selectedProject = null
      document.body.style.overflow = 'auto'
    },
    handleAcceptTask(data) {
      this.acceptTask(data.deadline)
    },
    acceptTask(customDeadline) {
      if (!this.selectedProject) return

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      if (!isLoggedIn) {
        alert('Please login first to accept tasks')
        this.$router.push('/login')
        return
      }

      const existingTasks = JSON.parse(localStorage.getItem('userTasks') || '[]')

      const newTask = {
        id: Date.now(),
        category: this.selectedProject.category,
        title: this.selectedProject.title,
        partner: 'Anonymous User',
        inReturn: this.selectedProject.offering,
        status: 'On going',
        deadline: customDeadline,
        image: this.selectedProject.image
      }

      existingTasks.push(newTask)
      localStorage.setItem('userTasks', JSON.stringify(existingTasks))

      if (confirm('Task accepted successfully! Go to Task page to view your tasks?')) {
        this.closeDetailModal()
        this.$router.push('/task')
      } else {
        this.closeDetailModal()
      }
    }
  },
  watch: {
    '$route.query.search'(newSearch) {
      // When search query changes, switch to Discover
      if (newSearch) {
        this.selectedCategory = 'Discover'
        this.currentPage = 1
      }
    },
    '$route.query.category'(newCategory) {
      // When category query changes from footer links
      if (newCategory) {
        this.selectedCategory = newCategory
        this.currentPage = 1
      }
    }
  },
  mounted() {
    // Check if navigated from search with query
    if (this.$route.query.search) {
      this.selectedCategory = 'Discover'
    }
    // Check if navigated from footer with category
    if (this.$route.query.category) {
      this.selectedCategory = this.$route.query.category
    }
  }
}
</script>