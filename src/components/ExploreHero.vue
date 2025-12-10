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

    <!-- Detail Modal Backdrop -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" @click="closeDetailModal"></div>

    <!-- Detail Modal -->
    <div v-if="showDetailModal && selectedProject" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8" @click.stop>
        <!-- Modal Header Image -->
        <div class="relative">
          <div class="aspect-[16/9] bg-gray-200 overflow-hidden rounded-t-2xl">
            <img v-if="selectedProject.image" :src="selectedProject.image" :alt="selectedProject.title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <button @click="closeDetailModal" class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-8">
          <div class="mb-6">
            <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">{{ selectedProject.category }}</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedProject.title }}</h2>
          </div>

          <!-- Additional Info -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Posted by:</span>
                <p class="font-medium text-gray-900">Anonymous User</p>
              </div>
              <div>
                <span class="text-gray-500">Category:</span>
                <p class="font-medium text-gray-900">{{ selectedProject.category }}</p>
              </div>
            </div>
          </div>

          <!-- What They're Seeking -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              What They're Seeking
            </h3>
            <p class="text-gray-700 bg-blue-50 p-4 rounded-lg">{{ selectedProject.seeking }}</p>
          </div>

          <!-- What They're Offering -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
              What They're Offering
            </h3>
            <p class="text-gray-700 bg-green-50 p-4 rounded-lg">{{ selectedProject.offering }}</p>
          </div>

          <!-- Set Deadline Section -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Set Your Deadline
            </h3>
            <div class="flex gap-3">
              <input 
                v-model.number="customDeadlineValue" 
                type="number" 
                min="1" 
                max="365"
                class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                placeholder="7"
              />
              <select 
                v-model="customDeadlineUnit"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
              </select>
            </div>
            <p class="mt-2 text-sm text-gray-500">Choose a deadline that works for both parties</p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex gap-3 p-6 border-t border-gray-200 justify-end bg-gray-50 rounded-b-2xl">
          <button @click="closeDetailModal" class="px-6 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            Close
          </button>
          <button @click="acceptTask" class="px-6 py-2.5 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
            Accept Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExploreHero',
  data() {
    return {
      categories: ['Discover', 'Popular', 'Animation', 'Branding', 'Illustration', 'Product Design', 'Typography'],
      selectedCategory: 'Popular',
      itemsPerPage: 12,
      currentPage: 1,
      showDetailModal: false,
      selectedProject: null,
      customDeadlineValue: 7,
      customDeadlineUnit: 'Days',
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
      this.customDeadlineValue = 7
      this.customDeadlineUnit = 'Days'
      document.body.style.overflow = 'auto'
    },
    acceptTask() {
      if (!this.selectedProject) return

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      if (!isLoggedIn) {
        alert('Please login first to accept tasks')
        this.$router.push('/login')
        return
      }

      const existingTasks = JSON.parse(localStorage.getItem('userTasks') || '[]')

      const customDeadline = `${this.customDeadlineValue} ${this.customDeadlineUnit}`

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