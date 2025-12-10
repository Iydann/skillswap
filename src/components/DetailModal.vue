<template>
  <!-- Detail Modal Backdrop -->
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" @click="close"></div>

  <!-- Detail Modal -->
  <div v-if="isOpen && data" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8" @click.stop>
      <!-- Modal Header Image -->
      <div class="relative">
        <div class="aspect-[16/9] bg-gray-200 overflow-hidden rounded-t-2xl">
          <img v-if="data.image" :src="data.image" :alt="data.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <svg class="w-20 h-20 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <button @click="close" class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition">
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-8">
        <div class="mb-6">
          <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">{{ data.category }}</span>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ data.title }}</h2>
        </div>

        <!-- Additional Info (untuk Explore & Offer) -->
        <div v-if="type === 'explore' || type === 'offer'" class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Posted by:</span>
              <p class="font-medium text-gray-900">Anonymous User</p>
            </div>
            <div>
              <span class="text-gray-500">Category:</span>
              <p class="font-medium text-gray-900">{{ data.category }}</p>
            </div>
          </div>
        </div>

        <!-- Task Partner Info (untuk Task) -->
        <div v-if="type === 'task'" class="mb-6 bg-blue-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Partner
          </h3>
          <p class="text-gray-700 font-medium">{{ data.partner }}</p>
        </div>

        <!-- What They're Seeking / What You Need to Do / What You're Seeking -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            {{ type === 'task' ? 'What You Need to Do' : type === 'offer' ? "What You're Seeking" : "What They're Seeking" }}
          </h3>
          <p class="text-gray-700 bg-blue-50 p-4 rounded-lg">{{ data.seeking || data.title }}</p>
        </div>

        <!-- What They're Offering / What You Get in Return / What You're Offering -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
            {{ type === 'task' ? 'What You Get in Return' : type === 'offer' ? "What You're Offering" : "What They're Offering" }}
          </h3>
          <p class="text-gray-700 bg-green-50 p-4 rounded-lg">{{ data.offering || data.inReturn }}</p>
        </div>

        <!-- Deadline Section (untuk Explore & Task) -->
        <div v-if="type === 'explore'" class="mb-6">
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

        <!-- Task Status & Deadline (untuk Task) -->
        <div v-if="type === 'task'" class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Status:</span>
              <p class="font-medium" :class="{
                'text-green-600': data.status === 'On going',
                'text-gray-800': data.status === 'Finished',
                'text-blue-600': data.status === 'Active'
              }">{{ data.status }}</p>
            </div>
            <div>
              <span class="text-gray-500">Deadline:</span>
              <p class="font-medium text-gray-900">{{ data.deadline || data.postedTime || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex gap-3 p-6 border-t border-gray-200 justify-end bg-gray-50 rounded-b-2xl">
        <button @click="close" class="px-6 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
          Close
        </button>
        
        <!-- Accept Task Button (untuk Explore) -->
        <button v-if="type === 'explore'" @click="acceptTask" class="px-6 py-2.5 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
          Accept Task
        </button>

        <!-- Contact Partner Button (untuk Task) -->
        <button v-if="type === 'task'" @click="contactPartner" class="px-6 py-2.5 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Contact Partner
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      enum: ['explore', 'task', 'offer'],
      required: true
    }
  },
  data() {
    return {
      customDeadlineValue: 7,
      customDeadlineUnit: 'Days'
    }
  },
  methods: {
    close() {
      this.$emit('close');
      this.resetDeadline();
    },
    resetDeadline() {
      this.customDeadlineValue = 7;
      this.customDeadlineUnit = 'Days';
    },
    acceptTask() {
      this.$emit('accept-task', {
        deadline: `${this.customDeadlineValue} ${this.customDeadlineUnit}`
      });
    },
    contactPartner() {
      this.$emit('contact-partner');
    }
  }
}
</script>
