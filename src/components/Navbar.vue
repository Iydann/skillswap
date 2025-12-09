<template>
<nav class="relative z-[100] bg-white border-b border-gray-200">
  <div class="px-6 lg:px-12">
    <div class="flex h-16 items-center">
      <!-- Logo -->
      <div class="flex items-center">
        <router-link to="/" class="flex items-center space-x-2">
          <img src="../assets/company_clear.png" alt="SkillSwap" class="h-8 w-auto" />
          <span class="text-xl font-semibold text-gray-900">SkillSwap</span>
        </router-link>
      </div>

      <!-- Center Navigation -->
      <div class="hidden md:flex items-center space-x-8 flex-1 justify-center">
        <router-link to="/explore" class="text-sm font-medium text-gray-700 hover:text-gray-900">Explore</router-link>
        <router-link to="/message" class="text-sm font-medium text-gray-700 hover:text-gray-900">Message</router-link>
        <router-link to="/task" class="text-sm font-medium text-gray-700 hover:text-gray-900">Task</router-link>
        <router-link to="/create-offer" class="text-sm font-medium text-gray-700 hover:text-gray-900">Create Offer</router-link>
      </div>

      <!-- Right: Auth Buttons -->
      <div class="hidden md:flex items-center space-x-4" v-if="!isLoggedIn">
        <router-link to="/signup" class="text-sm font-medium text-gray-700 hover:text-gray-900">Sign up</router-link>
        <router-link to="/login" class="rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800">Log in</router-link>
      </div>
      <div class="hidden md:flex items-center relative" v-else>
        <button @click="toggleUserMenu" class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition rounded-full pl-3 pr-4 py-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-semibold">{{ userInitial }}</span>
          <span class="text-sm font-medium text-gray-800">{{ userName || 'User' }}</span>
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="showUserMenu" class="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-48 py-2">
          <div class="px-4 py-2 text-sm text-gray-600">Signed in as <span class="font-semibold text-gray-900">{{ userName || 'User' }}</span></div>
          <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
        </div>
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
      <div v-if="!isLoggedIn" class="border-t border-gray-200 pt-2 mt-2 space-y-2">
        <router-link to="/signup" class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Sign up</router-link>
        <router-link to="/login" class="block w-full rounded-md bg-black px-3 py-2 text-base font-medium text-white hover:bg-gray-800">Log in</router-link>
      </div>
      <div v-else class="border-t border-gray-200 pt-3 mt-3 space-y-2">
        <div class="flex items-center gap-3 px-3 py-2">
          <span class="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-semibold">{{ userInitial }}</span>
          <div>
            <p class="text-sm font-semibold text-gray-900">{{ userName || 'User' }}</p>
            <p class="text-xs text-gray-500">Tap below to logout</p>
          </div>
        </div>
        <button @click="logout" class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
      </div>
    </div>
  </el-disclosure>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      userName: localStorage.getItem('userName') || '',
      showUserMenu: false
    }
  },
  computed: {
    userInitial() {
      return this.userName ? this.userName.charAt(0).toUpperCase() : 'U'
    }
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    logout() {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userName')
      this.isLoggedIn = false
      this.userName = ''
      this.showUserMenu = false
      this.$router.push('/')
    },
    syncAuthState() {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      this.userName = localStorage.getItem('userName') || ''
      if (!this.isLoggedIn) {
        this.showUserMenu = false
      }
    }
  },
  mounted() {
    this.syncAuthState()
    window.addEventListener('storage', this.syncAuthState)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncAuthState)
  },
  watch: {
    '$route.fullPath'() {
      this.syncAuthState()
    }
  }
}
</script>