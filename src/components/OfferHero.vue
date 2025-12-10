<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="max-w-5xl mx-auto px-6">
      
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">The Center for Creative<br/>Expertise Offerings</h1>
        <p class="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          SkillSwap is the heart of the collaborative community. Connect with talented people worldwide.
        </p>
        <button @click="openModal('create')" class="mt-6 px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          + Post New Offer
        </button>
      </div>

      <div v-if="myOffers.length > 0" class="space-y-6">
        <div v-for="offer in myOffers" :key="offer.id" class="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-200 relative group">
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

      <div v-else class="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <h3 class="text-lg font-semibold text-gray-900">No Offers Yet</h3>
        <p class="text-gray-500 mb-6">Start sharing your skills with the community!</p>
        <button @click="openModal('create')" class="text-indigo-600 font-medium hover:underline">Create First Offer</button>
      </div>
    </div>

    <div v-if="activeModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" @click="closeModal">
      
      <div v-if="activeModal === 'create'" class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden" @click.stop>
        <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 class="text-xl font-bold">Create New Offer</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div class="p-8 space-y-5">
           <div class="space-y-1">
             <label class="text-xs font-bold uppercase text-gray-500 tracking-wider">Category</label>
             <select v-model="newOffer.category" class="w-full p-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-black">
               <option value="" disabled>Select Category</option>
               <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
             </select>
           </div>
           <div class="space-y-1">
             <label class="text-xs font-bold uppercase text-gray-500 tracking-wider">Title</label>
             <input v-model="newOffer.title" type="text" placeholder="e.g. Logo Design for Guitar Lessons" class="w-full p-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-black">
           </div>
           <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-bold uppercase text-green-600 tracking-wider">What You Offer</label>
                <textarea v-model="newOffer.offering" rows="3" class="w-full p-3 bg-green-50 border-none rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold uppercase text-blue-600 tracking-wider">What You Seek</label>
                <textarea v-model="newOffer.seeking" rows="3" class="w-full p-3 bg-blue-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
           </div>
        </div>
        <div class="p-6 bg-gray-50 flex justify-end gap-3">
           <button @click="closeModal" class="px-6 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition">Cancel</button>
           <button @click="createOffer" class="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition">Post Offer</button>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <DetailModal 
      :isOpen="showDetailModal"
      :data="selectedOffer"
      type="offer"
      @close="closeDetailModal"
    />
  </div>
</template>

<script>
import DetailModal from './DetailModal.vue'

export default {
  name: 'OfferHero',
  components: {
    DetailModal
  },
  data() {
    return {
      activeModal: null, // 'create' | null
      showDetailModal: false,
      selectedOffer: null,
      categories: [
        'Animation', 'Branding', 'Illustration', 'Product Design', 
        'Typography'
      ],
      newOffer: { category: '', title: '', offering: '', seeking: '' },
      myOffers: []
    }
  },
  methods: {
    openModal(type) {
      if (type === 'create') {
        this.activeModal = type;
        document.body.style.overflow = 'hidden';
      }
    },
    closeModal() {
      this.activeModal = null;
      this.resetForm();
      document.body.style.overflow = 'auto';
    },
    closeDetailModal() {
      this.showDetailModal = false;
      this.selectedOffer = null;
      document.body.style.overflow = 'auto';
    },
    resetForm() {
       this.newOffer = { category: '', title: '', offering: '', seeking: '' };
    },
    createOffer() {
      // Validasi sederhana
      if (Object.values(this.newOffer).some(x => !x)) return alert('Please fill all fields');
      
      const offer = {
        id: Date.now(),
        ...this.newOffer,
        status: 'Active',
        postedTime: new Date().toLocaleDateString(),
        image: null
      };

      this.myOffers.unshift(offer);
      this.saveOffers();
      this.closeModal();
    },
    viewDetails(offer) {
      this.selectedOffer = offer;
      this.showDetailModal = true;
      document.body.style.overflow = 'hidden';
    },
    deleteOffer(id) {
      if (!confirm('Remove this offer?')) return;
      this.myOffers = this.myOffers.filter(o => o.id !== id);
      this.saveOffers();
    },
    saveOffers() {
      localStorage.setItem('myOffers', JSON.stringify(this.myOffers));
    }
  },
  mounted() {
    const stored = localStorage.getItem('myOffers');
    if (stored) this.myOffers = JSON.parse(stored);
  }
}
</script>