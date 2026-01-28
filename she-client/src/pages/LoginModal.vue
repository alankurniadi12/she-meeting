<template>
    <Teleport to="body">
        <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]" @click.self="emitClose">
            <div class="bg-white rounded-2xl p-6 w-full max-w-sm z-10000 pointer-events-auto">
                <h2 class="text-lg font-semibold mb-4">
                    Login Admin
                </h2>

                <input v-model="email" placeholder="Email" class="w-full border rounded-lg p-3 mb-3" />

                <input v-model="password" type="password" placeholder="Password"
                    class="w-full border rounded-lg p-3 mb-4" />

                <div v-if="error" class="text-sm text-red-600 mb-2">{{ error }}</div>

                <div class="flex justify-end gap-2">
                    <button class="px-4 py-2 border rounded-lg" @click="emitClose" :disabled="loading">
                        Batal
                    </button>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg" @click="submit" :disabled="loading">
                        <span v-if="loading">Memproses...</span>
                        <span v-else>Masuk</span>
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'

const emit = defineEmits(['close'])
const auth = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const submit = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await auth.loginWithCredentials({ email: email.value, password: password.value })
        if (res && res.token) {
            emit('close')
            return
        }

        // fallback to local dev login
        if (email.value === 'admin' && password.value === 'admin') {
            auth.login({ name: 'Admin' })
            emit('close')
            return
        }

        error.value = 'Login gagal. Periksa kredensial.'
    } catch (err) {
        // fallback to local dev login if API unreachable
        if (email.value === 'admin' && password.value === 'admin') {
            auth.login({ name: 'Admin' })
            emit('close')
            return
        }

        error.value = err.message || 'Terjadi kesalahan saat login.'
    } finally {
        loading.value = false
    }
}

const emitClose = () => emit('close')
</script>
