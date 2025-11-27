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
          <!-- Task Content -->
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

          <!-- Hover Buttons -->
          <div class="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              @click="viewDetails(task.id)"
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
  </div>
</template>

<script>
export default {
  name: 'TaskHero',
  data() {
    return {
      tasks: [
        {
          id: 1,
          category: 'Creative and Marketing Fields',
          title: 'Create Instagram Feed Design',
          partner: '@dilankaditf',
          inReturn: 'Caption Writing Services',
          status: 'On going',
          deadline: '2 Days'
        },
        {
          id: 2,
          category: 'Hobbies & Personal Development',
          title: 'Provide Basic Acoustic Guitar Lessons',
          partner: '@musiclover_id',
          inReturn: 'Cover Video Editing Services',
          status: 'Finished',
          postedTime: null
        }
      ]
    }
  },
  methods: {
    viewDetails(taskId) {
      console.log('View details for task:', taskId)
      // Navigate to task detail page or open modal
    },
    deleteTask(taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        console.log('Deleted task:', taskId)
      }
    }
  }
}
</script>
