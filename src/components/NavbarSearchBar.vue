<template>
<nav class="relative z-[100] bg-white border-b border-gray-200">
  <div class="px-6 lg:px-12">
    <div class="flex h-16 items-center">
      <!-- Logo -->
      <div class="flex items-center flex-shrink-0">
        <router-link to="/" class="flex items-center space-x-2">
          <img src="../assets/company_clear.png" alt="SkillSwap" class="h-8 w-auto" />
          <span class="text-xl font-semibold text-gray-900">SkillSwap</span>
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:flex flex-shrink-0 w-80 ml-36">
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <input 
            type="text" 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="What are you looking for?" 
            class="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <!-- Center Navigation -->
      <div class="hidden md:flex items-center space-x-8 ml-8">
        <router-link to="/explore" class="text-sm font-medium text-gray-900 hover:text-gray-700">Explore</router-link>
        <router-link to="/message" class="text-sm font-medium text-gray-700 hover:text-gray-900">Message</router-link>
        <router-link to="/task" class="text-sm font-medium text-gray-700 hover:text-gray-900">Task</router-link>
        <router-link to="/create-offer" class="text-sm font-medium text-gray-700 hover:text-gray-900">Create Offer</router-link>
        <router-link to="/about" class="text-sm font-medium text-gray-700 hover:text-gray-900">About</router-link>
      </div>

      <!-- Spacer to push buttons right -->
      <div class="flex-1"></div>

      <!-- Right: Auth Buttons or Profile -->
      <div class="hidden md:flex items-center space-x-4 flex-shrink-0">
        <template v-if="!authStore.isLoggedIn">
          <router-link to="/signup" class="text-sm font-medium text-gray-700 hover:text-gray-900">Sign up</router-link>
          <router-link to="/login" class="rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800">Log in</router-link>
        </template>
        <template v-else>
          <!-- Profile Avatar with Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {{ authStore.getInitials() }}
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-50"
            >
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ authStore.user.email }}</p>
              </div>
              <button 
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Mobile menu button -->
      <div class="flex md:hidden">
        <button type="button" command="--toggle" commandfor="mobile-menu" class="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <span class="sr-only">Open main menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 in-aria-expanded:hidden">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 not-in-aria-expanded:hidden">
            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <el-disclosure id="mobile-menu" hidden class="md:hidden border-t border-gray-200">
    <div class="space-y-1 px-4 pt-2 pb-3">
      <router-link to="/explore" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Explore</router-link>
      <router-link to="/message" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Message</router-link>
      <router-link to="/task" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Task</router-link>
      <router-link to="/create-offer" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Create Offer</router-link>
      <router-link to="/about" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">About</router-link>
      <div class="border-t border-gray-200 pt-2 mt-2 space-y-2">
        <router-link to="/signup" class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Sign up</router-link>
        <router-link to="/login" class="block w-full rounded-md bg-black px-3 py-2 text-base font-medium text-white hover:bg-gray-800">Log in</router-link>
      </div>
    </div>
  </el-disclosure>
</nav>
</template>

<script>
import { authStore } from '../store/auth'

export default {
  name: 'NavbarSearchBar',
  data() {
    return {
      authStore,
      searchQuery: '',
      showDropdown: false
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/explore', query: { search: this.searchQuery } })
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    handleLogout() {
      authStore.logout()
      this.showDropdown = false
      this.$router.push('/')
    }
  },
  mounted() {
    authStore.checkAuth()
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) {
        this.showDropdown = false
      }
    })
  }
}
</script>