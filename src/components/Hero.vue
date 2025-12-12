<template>
<div class="bg-gray-200">
  <div class="px-6 lg:px-12 pt-16 pb-16 w-full">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="space-y-8">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold text-black mb-4">
              Exchange Jobs or Skills, not Money
            </h1>
            <p class="text-lg text-black font-medium">
              SkillSwap | Find Your Creative Partner.
            </p>
          </div>

          <!-- Quote -->
          <div class="relative">
            <p class="text-base text-gray-700 pl-10 pr-10 relative">
              <span class="absolute -left-2 -top-4 text-5xl font-extrabold text-gray-400 leading-none">“</span>
                Welcome to a community of creators and freelancers. Here, your skills are the currency you use to bring your ideas to life.
              <span class="absolute -right-2 -bottom-4 text-5xl font-extrabold text-gray-400 leading-none">”</span>
            </p>
          </div>

          <!-- Search Input -->
          <div class="relative max-w-lg">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <input 
              type="text" 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              placeholder="Explore" 
              class="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <!-- Right Image -->
        <div class="flex justify-center lg:justify-end">
          <img 
            src="../assets/hero.png" 
            alt="SkillSwap Community" 
            class="rounded-2xl shadow-lg w-full max-w-xl object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/explore', query: { search: this.searchQuery } })
      }
    }
  }
}
</script>