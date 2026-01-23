import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { router } from './router'
import api from '@/utils/api'
import { useAuth } from '@/composables/auth'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// initialize api auth token from persisted store
const auth = useAuth()
if (auth.token) {
	api.setAuthToken(auth.token)
}

app.mount('#app')
