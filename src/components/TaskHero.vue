<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">My Task</h1>
        <p class="text-sm text-gray-600">Remember to complete your tasks on-time — leaving them unfinished may negatively affect your profile record!</p>
      </div>

      <!-- Chevron Icon -->
      <div class="flex justify-center mb-8">
        <svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>

      <!-- Task List -->
      <div class="space-y-6">
        <!-- Task Card -->
        <div 
          v-for="task in tasks" 
          :key="task.id"
          class="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-200 relative group"
        >
          <div class="flex gap-4">
            <!-- Image Thumbnail -->
            <div class="flex-shrink-0">
              <div class="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
                <img v-if="task.image" :src="task.image" :alt="task.title" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-300">
                  <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Task Content -->
            <div class="flex-1">
              <div class="mb-4">
                <h2 class="text-xl font-bold text-gray-900 mb-3">{{ task.category }}</h2>
                <div class="space-y-1 text-sm text-gray-700">
                  <p><span class="font-medium">{{ task.title }}</span></p>
                  <p><span class="font-medium">Partner:</span> {{ task.partner }}</p>
                  <p><span class="font-medium">In Return:</span> {{ task.inReturn }}</p>
                </div>
              </div>

              <!-- Status and Time -->
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                  <span v-if="task.postedTime">Posted about {{ task.postedTime }}</span>
                  <span v-else-if="task.deadline">Deadline in {{ task.deadline }}</span>
                </div>
                <div class="text-sm font-medium" :class="{
                  'text-green-600': task.status === 'On going',
                  'text-gray-800': task.status === 'Finished',
                  'text-blue-600': task.status === 'Active'
                }">
                  {{ task.status }}
                </div>
              </div>
            </div>
          </div>

          <!-- Hover Buttons -->
          <div class="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              @click="viewDetails(task)"
              class="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
            >
              View Details
            </button>
            <button 
              @click="deleteTask(task.id)"
              class="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal Backdrop -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" @click="closeDetailModal"></div>

    <!-- Detail Modal -->
    <div v-if="showDetailModal && selectedTask" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8" @click.stop>
        <!-- Modal Header Image -->
        <div class="relative">
          <div class="aspect-[16/9] bg-gray-200 overflow-hidden rounded-t-2xl">
            <img v-if="selectedTask.image" :src="selectedTask.image" :alt="selectedTask.title" class="w-full h-full object-cover" />
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
            <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">{{ selectedTask.category }}</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedTask.title }}</h2>
          </div>

          <!-- Task Partner Info -->
          <div class="mb-6 bg-blue-50 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Partner
            </h3>
            <p class="text-gray-700 font-medium">{{ selectedTask.partner }}</p>
          </div>

          <!-- What You Need to Do -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
              What You Need to Do
            </h3>
            <p class="text-gray-700 bg-orange-50 p-4 rounded-lg">{{ selectedTask.title }}</p>
          </div>

          <!-- What You Get in Return -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
              What You Get in Return
            </h3>
            <p class="text-gray-700 bg-green-50 p-4 rounded-lg">{{ selectedTask.inReturn }}</p>
          </div>

          <!-- Task Status & Deadline -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Status:</span>
                <p class="font-medium" :class="{
                  'text-green-600': selectedTask.status === 'On going',
                  'text-gray-800': selectedTask.status === 'Finished',
                  'text-blue-600': selectedTask.status === 'Active'
                }">{{ selectedTask.status }}</p>
              </div>
              <div>
                <span class="text-gray-500">Deadline:</span>
                <p class="font-medium text-gray-900">{{ selectedTask.deadline || selectedTask.postedTime || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex gap-3 p-6 border-t border-gray-200 justify-end bg-gray-50 rounded-b-2xl">
          <button @click="closeDetailModal" class="px-6 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            Close
          </button>
          <button @click="contactPartner" class="px-6 py-2.5 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Contact Partner
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskHero',
  data() {
    return {
      showDetailModal: false,
      selectedTask: null,
      tasks: []
    }
  },
  methods: {
    viewDetails(task) {
      this.selectedTask = task
      this.showDetailModal = true
      document.body.style.overflow = 'hidden'
    },
    closeDetailModal() {
      this.showDetailModal = false
      this.selectedTask = null
      document.body.style.overflow = 'auto'
    },
    contactPartner() {
      if (!this.selectedTask) return
      
      // Create new contact data and save to localStorage
      const newContact = {
        partner: this.selectedTask.partner,
        taskTitle: this.selectedTask.title,
        category: this.selectedTask.category,
        timestamp: Date.now()
      }
      
      localStorage.setItem('newContactFromTask', JSON.stringify(newContact))
      
      this.closeDetailModal()
      this.$router.push('/message')
    },
    deleteTask(taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        
        // Update localStorage
        const storedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]')
        const updatedTasks = storedTasks.filter(task => task.id !== taskId)
        localStorage.setItem('userTasks', JSON.stringify(updatedTasks))
      }
    },
    loadTasks() {
      // Load tasks from localStorage
      const storedTasks = JSON.parse(localStorage.getItem('userTasks') || '[]')
      
      // Default tasks if none exist
      if (storedTasks.length === 0) {
        this.tasks = [
          {
            id: 1,
            category: 'Creative and Marketing Fields',
            title: 'Create Instagram Feed Design',
            partner: '@dilankaditf',
            inReturn: 'Caption Writing Services',
            status: 'On going',
            deadline: '2 Days',
            image: null
          },
          {
            id: 2,
            category: 'Hobbies & Personal Development',
            title: 'Provide Basic Acoustic Guitar Lessons',
            partner: '@musiclover_id',
            inReturn: 'Cover Video Editing Services',
            status: 'Finished',
            postedTime: '3 days ago',
            image: null
          }
        ]
      } else {
        this.tasks = storedTasks
      }
    }
  },
  mounted() {
    this.loadTasks()
  }
}
</script>
