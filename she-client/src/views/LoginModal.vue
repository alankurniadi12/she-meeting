<template>
    <Teleport to="body">
        <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
                <h2 class="text-lg font-semibold mb-4">
                    Login Admin
                </h2>

                <input v-model="username" placeholder="Username" class="w-full border rounded-lg p-3 mb-3" />

                <input v-model="password" type="password" placeholder="Password"
                    class="w-full border rounded-lg p-3 mb-4" />

                <div class="flex justify-end gap-2">
                    <button class="px-4 py-2 border rounded-lg" @click="$emit('close')">
                        Batal
                    </button>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg" @click="submit">
                        Masuk
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
const { login } = useAuth()

const username = ref('')
const password = ref('')

const submit = () => {
    // sementara hardcode
    if (username.value === 'admin' && password.value === 'admin') {
        login({ name: 'Admin' })
        emit('close')
    }
}
</script>
