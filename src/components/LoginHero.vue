<template>
  <div class="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-8">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <!-- Logo/Icon -->
      <div class="flex justify-center mb-6">
        <img src="../assets/company_clear.png" alt="SkillSwap Logo" class="h-16 w-auto" />
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-center mb-8">{{ isLogin ? 'Welcome Back' : 'Welcome to SkillSwap' }}</h1>

      <!-- Description for Sign Up -->
      <p v-if="!isLogin" class="text-center text-sm text-gray-600 mb-6">
        Sign up to start swapping your expertise with thousands of other talents and get your projects done—no money required.
      </p>

      <!-- Google Sign In Button -->
      <button class="w-full bg-white border border-gray-300 rounded-full py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition mb-4">
        <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span class="text-sm font-medium text-gray-700">Continue With Google</span>
      </button>

      <!-- Divider -->
      <div class="flex items-center gap-4 my-6">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="text-sm text-gray-500">Or</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <!-- Email Input -->
        <div class="mb-4">
          <input 
            type="text" 
            v-model="email"
            placeholder="Enter email or username"
            class="w-full bg-gray-100 border-0 rounded-lg py-3 px-4 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <!-- Password Input (for Login) -->
        <div v-if="isLogin" class="mb-6">
          <input 
            type="password" 
            v-model="password"
            placeholder="Enter password"
            class="w-full bg-gray-100 border-0 rounded-lg py-3 px-4 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <!-- Continue Button -->
        <button 
          type="submit"
          class="w-full bg-black text-white rounded-full py-3 px-4 font-medium hover:bg-gray-800 transition mb-4"
        >
          Continue
        </button>
      </form>

      <!-- Terms and Toggle -->
      <div class="text-center">
        <p class="text-xs text-gray-600">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button 
            @click="toggleMode" 
            class="text-red-500 font-medium hover:underline"
          >
            {{ isLogin ? 'Sign up' : 'Log in' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '../store/auth'

export default {
  name: 'LoginHero',
  props: {
    initialMode: {
      type: String,
      default: 'login', // 'login' | 'signup'
    }
  },
  data() {
    return {
      isLogin: this.initialMode === 'login',
      email: '',
      password: ''
    }
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin
      this.email = ''
      this.password = ''
    },
    handleSubmit() {
      if (this.email.trim()) {
        // Extract name from email or use email as name
        const name = this.email.split('@')[0]
        
        // Login user
        authStore.login({
          email: this.email,
          name: name.charAt(0).toUpperCase() + name.slice(1)
        })
        
        // Navigate to home
        this.$router.push('/')
      }
    }
  }
}
</script>
