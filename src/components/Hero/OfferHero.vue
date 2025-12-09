<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Header Section -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">The Center for Creative<br/>Expertise Offerings</h1>
        <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          SkillSwap is the heart of the collaborative community. It's the best resource for finding and connecting with talented people from various fields around the world.
        </p>
        <button 
          @click="openCreateModal"
          class="mt-4 px-8 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition"
        >
          Post Offer
        </button>
      </div>

      <!-- Offers List -->
      <div v-if="myOffers.length > 0" class="space-y-6">
        <div 
          v-for="offer in myOffers" 
          :key="offer.id"
          class="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-200 relative group"
        >
          <div class="flex gap-4">
            <!-- Image Thumbnail -->
            <div class="flex-shrink-0">
              <div class="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
                <img v-if="offer.image" :src="offer.image" :alt="offer.title" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-300">
                  <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Offer Content -->
            <div class="flex-1">
              <div class="mb-4">
                <h2 class="text-xl font-bold text-gray-900 mb-3">{{ offer.category }}</h2>
                <div class="space-y-1 text-sm text-gray-700">
                  <p><span class="font-medium">{{ offer.title }}</span></p>
                  <p><span class="font-medium">Offering:</span> {{ offer.offering }}</p>
                  <p><span class="font-medium">Seeking:</span> {{ offer.seeking }}</p>
                </div>
              </div>

              <!-- Status and Time -->
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                  Posted {{ offer.postedTime }}
                </div>
                <div class="text-sm font-medium" :class="{
                  'text-green-600': offer.status === 'Active',
                  'text-gray-800': offer.status === 'Completed',
                  'text-blue-600': offer.status === 'Pending'
                }">
                  {{ offer.status }}
                </div>
              </div>
            </div>
          </div>

          <!-- Hover Buttons -->
          <div class="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              @click="viewDetails(offer)"
              class="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
            >
              View Details
            </button>
            <button 
              @click="deleteOffer(offer.id)"
              class="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Offers Yet</h3>
        <p class="text-gray-600 mb-6">Start sharing your skills with the community!</p>
        <button 
          @click="openCreateModal"
          class="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
        >
          Create Your First Offer
        </button>
      </div>
    </div>

    <!-- Create Offer Modal Backdrop -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" @click="closeCreateModal"></div>

    <!-- Create Offer Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8" @click.stop>
        <!-- Modal Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Create New Offer</h2>
          <button 
            @click="closeCreateModal"
            class="text-gray-500 hover:text-gray-700 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-8 space-y-6">
          <!-- Category Select -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Category</label>
            <select v-model="newOffer.category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a category</option>
              <option value="Animation">Animation</option>
              <option value="Branding">Branding</option>
              <option value="Illustration">Illustration</option>
              <option value="Product Design">Product Design</option>
              <option value="Typography">Typography</option>
              <option value="Creative & Marketing">Creative & Marketing</option>
              <option value="Hobbies & Personal Development">Hobbies & Personal Development</option>
            </select>
          </div>

          <!-- Title Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Offer Title</label>
            <input 
              v-model="newOffer.title" 
              type="text" 
              placeholder="What skill are you offering?" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- What You're Offering -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">What You're Offering</label>
            <textarea 
              v-model="newOffer.offering" 
              placeholder="Describe what you can provide..." 
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <!-- What You're Seeking -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">What You're Seeking in Return</label>
            <textarea 
              v-model="newOffer.seeking" 
              placeholder="What would you like to learn or receive?" 
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex gap-3 p-6 border-t border-gray-200 justify-end bg-gray-50 rounded-b-2xl">
          <button 
            @click="closeCreateModal"
            class="px-6 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="createOffer"
            class="px-6 py-2.5 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Post Offer
          </button>
        </div>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showDetailModal && selectedOffer" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" @click="closeDetailModal"></div>
    <div v-if="showDetailModal && selectedOffer" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8" @click.stop>
        <!-- Modal Header Image -->
        <div class="relative">
          <div class="aspect-[16/9] bg-gray-200 overflow-hidden rounded-t-2xl">
            <img v-if="selectedOffer.image" :src="selectedOffer.image" :alt="selectedOffer.title" class="w-full h-full object-cover" />
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
            <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">{{ selectedOffer.category }}</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedOffer.title }}</h2>
          </div>

          <!-- What You're Offering -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
              What I'm Offering
            </h3>
            <p class="text-gray-700 bg-green-50 p-4 rounded-lg">{{ selectedOffer.offering }}</p>
          </div>

          <!-- What You're Seeking -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              What I'm Seeking
            </h3>
            <p class="text-gray-700 bg-blue-50 p-4 rounded-lg">{{ selectedOffer.seeking }}</p>
          </div>

          <!-- Status Info -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Status:</span>
                <p class="font-medium" :class="{
                  'text-green-600': selectedOffer.status === 'Active',
                  'text-gray-800': selectedOffer.status === 'Completed',
                  'text-blue-600': selectedOffer.status === 'Pending'
                }">{{ selectedOffer.status }}</p>
              </div>
              <div>
                <span class="text-gray-500">Posted:</span>
                <p class="font-medium text-gray-900">{{ selectedOffer.postedTime }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex gap-3 p-6 border-t border-gray-200 justify-end bg-gray-50 rounded-b-2xl">
          <button @click="closeDetailModal" class="px-6 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfferHero',
  data() {
    return {
      showCreateModal: false,
      showDetailModal: false,
      selectedOffer: null,
      newOffer: {
        category: '',
        title: '',
        offering: '',
        seeking: ''
      },
      myOffers: []
    }
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true
      document.body.style.overflow = 'hidden'
    },
    closeCreateModal() {
      this.showCreateModal = false
      this.newOffer = {
        category: '',
        title: '',
        offering: '',
        seeking: ''
      }
      document.body.style.overflow = 'auto'
    },
    createOffer() {
      if (!this.newOffer.category || !this.newOffer.title || !this.newOffer.offering || !this.newOffer.seeking) {
        alert('Please fill in all fields')
        return
      }

      const offer = {
        id: Date.now(),
        ...this.newOffer,
        status: 'Active',
        postedTime: 'just now',
        image: null
      }

      this.myOffers.unshift(offer)
      
      // Save to localStorage
      this.saveOffersToStorage()
      
      alert('Offer posted successfully!')
      this.closeCreateModal()
    },
    viewDetails(offer) {
      this.selectedOffer = offer
      this.showDetailModal = true
      document.body.style.overflow = 'hidden'
    },
    closeDetailModal() {
      this.showDetailModal = false
      this.selectedOffer = null
      document.body.style.overflow = 'auto'
    },
    deleteOffer(offerId) {
      if (confirm('Are you sure you want to delete this offer?')) {
        this.myOffers = this.myOffers.filter(offer => offer.id !== offerId)
        this.saveOffersToStorage()
      }
    },
    loadOffersFromStorage() {
      const stored = localStorage.getItem('myOffers')
      if (stored) {
        this.myOffers = JSON.parse(stored)
      }
    },
    saveOffersToStorage() {
      localStorage.setItem('myOffers', JSON.stringify(this.myOffers))
    }
  },
  mounted() {
    this.loadOffersFromStorage()
  }
}
</script>
