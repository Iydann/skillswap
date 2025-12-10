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
      if (!this.email.trim()) {
        alert('Please enter an email or username')
        return
      }

      const derivedName = this.email.includes('@') ? this.email.split('@')[0] : this.email
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userName', derivedName || 'SkillSwap User')

      if (this.isLogin) {
        alert(`Welcome back, ${derivedName || 'SkillSwap User'}!`)
      } else {
        alert(`Account created, ${derivedName || 'SkillSwap User'}!`)
      }

      this.$router.push('/')
    }
  }
}
</script>
