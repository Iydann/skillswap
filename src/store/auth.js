// Simple auth store using Vue's reactive system
import { reactive } from 'vue'

export const authStore = reactive({
  isLoggedIn: false,
  user: null,

  login(userData) {
    this.isLoggedIn = true
    this.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
  },

  logout() {
    this.isLoggedIn = false
    this.user = null
    localStorage.removeItem('user')
  },

  checkAuth() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      this.user = JSON.parse(savedUser)
      this.isLoggedIn = true
    }
  },

  getInitials() {
    if (!this.user || !this.user.name) return 'U'
    return this.user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
})
