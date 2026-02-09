<template>
    <div class="w-full pl-4 pr-4 pb-6">
        <!-- Judul + tombol -->
        <div class="flex items-center justify-between mt-4 mb-4">
            <h1 class="text-2xl font-semibold text-gray-800">Kontribusi Personil</h1>
            <button class="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700">
                + Tambah Personil
            </button>
        </div>

        <!-- Filter bar -->
        <div class="bg-white rounded-2xl shadow p-4 mb-4 flex flex-wrap items-end gap-4">
            <!-- Divisi -->
            <div class="flex flex-col">
                <label class="text-sm text-gray-600 mb-1">Divisi</label>
                <select v-model="filters.division"
                    class="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-green-200">
                    <option value="Semua">Semua</option>
                    <option value="ICT">ICT</option>
                    <option value="Facility">Facility</option>
                    <option value="Security">Security</option>
                    <option value="Produksi">Produksi</option>
                </select>
            </div>

            <!-- Urutkan skor -->
            <div class="flex flex-col">
                <label class="text-sm text-gray-600 mb-1">Urutkan Skor</label>
                <select v-model="filters.sort"
                    class="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-green-200">
                    <option value="tertinggi">Tertinggi ke Terendah</option>
                    <option value="terendah">Terendah ke Tertinggi</option>
                </select>
            </div>

            <!-- Cari nama -->
            <div class="flex flex-col flex-1 min-w-[200px]">
                <label class="text-sm text-gray-600 mb-1">Cari Nama</label>
                <input v-model="filters.search" type="text" placeholder="Ketik nama personil..."
                    class="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-green-200" />
            </div>

            <!-- Reset -->
            <button class="px-4 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-100" @click="resetFilters">
                Reset
            </button>
        </div>

        <!-- List Personil -->
        <PersonelList :items="filtersWatch" @select="handleSelectPersonel" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PersonelList from '@/components/PersonelList.vue'
import { useUsersStore }  from '@/stores/usersStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const usersStore = useUsersStore()
const loading = computed(() => usersStore.loading)

onMounted(() => {
    usersStore.fetchUsers()
})

const filters = ref({
    division: 'Semua',
    search: '',
    sort: 'tertinggi'
}) 

const filtersWatch = computed(() => 
    usersStore.filteredUsers(filters.value)
)  

const resetFilters = () => {
    filters.value = {
        division: 'Semua',
        search: '',
        sort: 'tertinggi'
    }
}

const handleSelectPersonel = (user) => {
    router.push({
        name: 'PersonelDetail',
        params: { id: user.id }
    })
}
</script>
