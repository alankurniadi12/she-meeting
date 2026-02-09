import { defineStore } from 'pinia'
import api from '@/utils/api'

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAdminLogin') === 'true',
    admin: JSON.parse(localStorage.getItem('adminUser')) || null,
    token: localStorage.getItem('authToken') || null
  }),
  persist: true,
  actions: {
    // low-level local login (used as a fallback/dev)
    login(data) {
      this.isAuthenticated = true
      this.admin = data
      localStorage.setItem('isAdminLogin', 'true')
      localStorage.setItem('adminUser', JSON.stringify(data))
    },

    // login via API: expects { token, user } in response
    async loginWithCredentials(credentials) {
      console.log('Auth Store: loginWithCredentials', credentials)
      const res = await api.apiPost('/auth/login', credentials)
      // adapt to your API response shape
      const token = res.token || res.accessToken || null
      const user = res.user || res.admin || null

      if (token) {
        this.token = token
        api.setAuthToken(token)
        localStorage.setItem('authToken', token)
        localStorage.setItem('isAdminLogin', 'true')
      }

      if (user) {
        this.admin = user
        localStorage.setItem('adminUser', JSON.stringify(user))
      }

      this.isAuthenticated = !!token

      return { token, user }
    },

    logout() {
      this.isAuthenticated = false
      this.admin = null
      this.token = null
      localStorage.removeItem('isAdminLogin')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('authToken')
      api.setAuthToken(null)
    }
  }
})
