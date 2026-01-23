<script setup>
import "tailwindcss"
import { ref } from 'vue'
import { useAuth } from '@/composables/auth'

const auth = useAuth()
const showMenu = ref(false)

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}
</script>

<template>
    <header class="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-semibold  font-inter text-black-custom">SHE Meeting</h1>

        <!-- RIGHT SIDE -->
        <div class="relative">
            <!-- BELUM LOGIN -->
            <button v-if="!auth.isAuthenticated" class="text-sm font-medium text-green-600 hover:underline"
                @click="$emit('open-login')">
                Masuk
            </button>

            <!-- SUDAH LOGIN -->
            <div v-else>
                <button @click="toggleMenu"
                    class="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                    {{ auth.admin?.name?.charAt(0) || 'A' }}
                </button>

                <!-- DROPDOWN -->
                <div v-if="showMenu"
                    class="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg text-sm overflow-hidden">
                    <button class="w-full px-4 py-2 text-left hover:bg-gray-100 flex gap-2">
                        👤 Profil
                    </button>
                    <button class="w-full px-4 py-2 text-left hover:bg-gray-100 flex gap-2">
                        ℹ️ Tentang
                    </button>
                    <button class="w-full px-4 py-2 text-left hover:bg-gray-100 flex gap-2 text-red-600"
                        @click="auth.logout">
                        🚪 Keluar
                    </button>
                </div>
            </div>
        </div>

    </header>
</template>

<style scoped></style>