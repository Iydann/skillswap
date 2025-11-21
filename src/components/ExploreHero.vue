<template>
  <div class="bg-gray-100 py-8">
    <!-- Category Tabs -->
    <div class="px-6 lg:px-12 mb-8">
      <div class="flex items-center gap-4">
        <button class="px-6 py-2 bg-white text-sm font-medium text-gray-900 rounded-full shadow-sm hover:shadow-md transition">
          Popular
        </button>
        <button class="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
          Discover
        </button>
        <button class="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
          Animation
        </button>
        <button class="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
          Branding
        </button>
        <button class="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
          Illustration
        </button>
        <button class="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
          Product Design
        </button>
        <button class="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
          Typography
        </button>
      </div>
    </div>

    <!-- Project Grid -->
    <div class="px-6 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Project Card 1 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" alt="Custom Digital Artwork Commission" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Custom Digital Artwork Commission</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I will create epic custom digital art for you</p>
            <p class="text-xs text-gray-500">Seeking: A short, low-op "free teach back to use to the background of my screen.</p>
          </div>
        </div>

        <!-- Project Card 2 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-pink-200 flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1558403194-611308249627?w=400" alt="Presentation Slide Makeover" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Presentation Slide Makeover</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I'll revamp your slides to suit your needs, clean, and professional!</p>
            <p class="text-xs text-gray-500">Seeking: Help with formatting a presentation that many have messages in English.</p>
          </div>
        </div>

        <!-- Project Card 3 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-blue-100 flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400" alt="One-Page Profile Website" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">One-Page Profile Website</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I'll build a responsive HTML/CSS/JS to showcase your profile or idea/case</p>
            <p class="text-xs text-gray-500">Seeking: A cohesionist lifecycle photograph suitable for the website.</p>
          </div>
        </div>

        <!-- Project Card 4 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400" alt="Beginner Acoustic Guitar Lessons" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Beginner Acoustic Guitar Lessons</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: Two private online guitar lessons for guitar, chords, and strumming</p>
            <p class="text-xs text-gray-500">Seeking: Simple video editing services to put together my song cover video.</p>
          </div>
        </div>

        <!-- Project Card 5 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-800 flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400" alt="Gaming Partner for Rank Push" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Gaming Partner for Rank Push</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I will help you rank up in Mobile Legends/PUBG, communicate and plan strategies</p>
            <p class="text-xs text-gray-500">Seeking: A game streaming channel...</p>
          </div>
        </div>

        <!-- Project Card 6 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" alt="Custom Line Art Icon Illustration" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Custom Line Art Icon Illustration</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I'll create one custom line art icon for your logo or personal record</p>
            <p class="text-xs text-gray-500">Seeking: A 30-minute consultation on social media marketing strategy for my portfolio.</p>
          </div>
        </div>

        <!-- Project Card 7 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-300"></div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Title</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I know this skill, and can help provide this</p>
            <p class="text-xs text-gray-500">Seeking: I need this, and it's in need of mine and exchange services with each other</p>
          </div>
        </div>

        <!-- Project Card 8 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-300"></div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Title</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I know this skill, and can help provide this</p>
            <p class="text-xs text-gray-500">Seeking: I need this, and it's in need of mine and exchange services with each other</p>
          </div>
        </div>

        <!-- Project Card 9 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-300"></div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Title</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I know this skill, and can help provide this</p>
            <p class="text-xs text-gray-500">Seeking: I need this, and it's in need of mine and exchange services with each other</p>
          </div>
        </div>

        <!-- Project Card 10 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-300"></div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Title</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I know this skill, and can help provide this</p>
            <p class="text-xs text-gray-500">Seeking: I need this, and it's in need of mine and exchange services with each other</p>
          </div>
        </div>

        <!-- Project Card 11 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-300"></div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Title</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I know this skill, and can help provide this</p>
            <p class="text-xs text-gray-500">Seeking: I need this, and it's in need of mine and exchange services with each other</p>
          </div>
        </div>

        <!-- Project Card 12 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <div class="aspect-[4/3] bg-gray-300"></div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">Title</h3>
            <p class="text-sm text-gray-600 mb-2">Offering: I know this skill, and can help provide this</p>
            <p class="text-xs text-gray-500">Seeking: I need this, and it's in need of mine and exchange services with each other</p>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="flex justify-center mt-8">
        <button 
          @click="loadMore" 
          v-if="hasMore"
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
      hasMore: true
    }
  },
  methods: {
    loadMore() {
      // Logic untuk load more data
      console.log('Loading more items...')
      // Setelah load semua data, set hasMore = false
      // this.hasMore = false
    }
  }
}
</script>