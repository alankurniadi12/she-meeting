import { ref } from 'vue'

const isAuthenticated = ref(
  localStorage.getItem('isAdminLogin') === 'true'
)

const admin = ref(
  JSON.parse(localStorage.getItem('adminUser')) || null
)

export function useAuth() {
  const login = (data) => {
    isAuthenticated.value = true
    admin.value = data

    localStorage.setItem('isAdminLogin', 'true')
    localStorage.setItem('adminUser', JSON.stringify(data))
  }

  const logout = () => {
    isAuthenticated.value = false
    admin.value = null

    localStorage.removeItem('isAdminLogin')
    localStorage.removeItem('adminUser')
  }

  return {
    isAuthenticated,
    admin,
    login,
    logout
  }
}
