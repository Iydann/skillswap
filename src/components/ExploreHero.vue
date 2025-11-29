<template>
  <div class="bg-gray-100 py-8">
    <!-- Category Tabs -->
    <div class="px-6 lg:px-12 mb-8">
      <div class="flex items-center gap-4">
        <button 
          @click="selectCategory('Discover')"
          :class="selectedCategory === 'Discover' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'"
          class="px-6 py-2 text-sm font-medium rounded-full transition"
        >
          Discover
        </button>
        <button 
          @click="selectCategory('Popular')"
          :class="selectedCategory === 'Popular' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'"
          class="px-6 py-2 text-sm font-medium rounded-full transition"
        >
          Popular
        </button>
        <button 
          @click="selectCategory('Animation')"
          :class="selectedCategory === 'Animation' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'"
          class="px-6 py-2 text-sm font-medium rounded-full transition"
        >
          Animation
        </button>
        <button 
          @click="selectCategory('Branding')"
          :class="selectedCategory === 'Branding' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'"
          class="px-6 py-2 text-sm font-medium rounded-full transition"
        >
          Branding
        </button>
        <button 
          @click="selectCategory('Illustration')"
          :class="selectedCategory === 'Illustration' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'"
          class="px-6 py-2 text-sm font-medium rounded-full transition"
        >
          Illustration
        </button>
        <button 
          @click="selectCategory('Product Design')"
          :class="selectedCategory === 'Product Design' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'"
          class="px-6 py-2 text-sm font-medium rounded-full transition"
        >
          Product Design
        </button>
        <button 
          @click="selectCategory('Typography')"
          :class="selectedCategory === 'Typography' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'"
          class="px-6 py-2 text-sm font-medium rounded-full transition"
        >
          Typography
        </button>
      </div>
      <!-- Active Filter / Search Info -->
      <div class="mt-4 text-sm text-gray-600">
        <template v-if="activeSearchQuery">
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-2">Discover</span>
          Hasil pencarian untuk: <span class="font-medium">"{{ activeSearchQuery }}"</span>
          <span class="ml-2 text-xs text-gray-500">({{ filteredProjects.length }} proyek ditemukan)</span>
        </template>
        <template v-else>
          Menampilkan kategori: <span class="font-medium">{{ selectedCategory }}</span>
          <span class="ml-2 text-xs text-gray-500">({{ filteredProjects.length }} total)</span>
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
          class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
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
            <p class="text-xs text-gray-500">Seeking: {{ project.seeking }}</p>
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
  </div>
</template>

<script>
export default {
  name: 'ExploreHero',
  data() {
    return {
      selectedCategory: 'Popular',
      itemsPerPage: 12,
      currentPage: 1,
      allProjects: [
        {
          id: 1,
          title: 'Custom Digital Artwork Commission',
          offering: 'I will create epic custom digital art for you',
          seeking: 'A short, low-op "free teach back to use to the background of my screen.',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
          category: 'Illustration'
        },
        {
          id: 2,
          title: 'Presentation Slide Makeover',
          offering: "I'll revamp your slides to suit your needs, clean, and professional!",
          seeking: 'Help with formatting a presentation that many have messages in English.',
          image: 'https://images.unsplash.com/photo-1558403194-611308249627?w=400',
          category: 'Product Design'
        },
        {
          id: 3,
          title: 'One-Page Profile Website',
          offering: "I'll build a responsive HTML/CSS/JS to showcase your profile or idea/case",
          seeking: 'A cohesionist lifecycle photograph suitable for the website.',
          image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400',
          category: 'Product Design'
        },
        {
          id: 4,
          title: 'Beginner Acoustic Guitar Lessons',
          offering: 'Two private online guitar lessons for guitar, chords, and strumming',
          seeking: 'Simple video editing services to put together my song cover video.',
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
          category: 'Discover'
        },
        {
          id: 5,
          title: 'Gaming Partner for Rank Push',
          offering: 'I will help you rank up in Mobile Legends/PUBG, communicate and plan strategies',
          seeking: 'A game streaming channel...',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
          category: 'Discover'
        },
        {
          id: 6,
          title: 'Custom Line Art Icon Illustration',
          offering: "I'll create one custom line art icon for your logo or personal record",
          seeking: 'A 30-minute consultation on social media marketing strategy for my portfolio.',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
          category: 'Illustration'
        },
        {
          id: 7,
          title: 'Brand Identity Design',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Branding'
        },
        {
          id: 8,
          title: 'Motion Graphics Video',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Animation'
        },
        {
          id: 9,
          title: 'Logo Animation',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Animation'
        },
        {
          id: 10,
          title: 'Custom Font Design',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Typography'
        },
        {
          id: 11,
          title: 'Brand Guidelines Package',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Branding'
        },
        {
          id: 12,
          title: 'Letter Spacing Workshop',
          offering: 'I know this skill, and can help provide this',
          seeking: "I need this, and it's in need of mine and exchange services with each other",
          image: null,
          category: 'Typography'
        }
      ]
    }
  },
  computed: {
    activeSearchQuery() {
      return this.$route.query.search ? String(this.$route.query.search) : ''
    },
    filteredProjects() {
      if (this.selectedCategory === 'Popular') {
        return this.allProjects
      }
      return this.allProjects.filter(project => project.category === this.selectedCategory)
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