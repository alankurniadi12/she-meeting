<template>
    <div class="mt-6 ml-6 mr-6">
        <div class="space-y-4">
            <!-- Kalau kosong -->
            <div v-if="!items || !items.length" class="text-sm text-gray-400 italic py-4 text-center">
                Belum ada data Temuan.
            </div>
            <div v-for="item in items" :key="item.id"
                class="min-h-8 bg-white shadow rounded-2xl px-3 py-2 border flex flex-row justify-between"
                @click="goToDetail(item.id)">
                <!-- Judul -->
                <dev class="flex flex-col">
                    <h3 class="font-semibold text-gray-800 leading-tight line-clamp-2 min-h-10 hover:cursor-pointer">
                        {{ item.description }}
                    </h3>
                    <!-- Informasi Baris -->
                    <div class="flex items-center text-sm text-gray-500 space-x-4 mt-3">
                        <span class="flex items-center">
                            <img :src="icCalendar" class="w-4 h-4 mr-1" />
                            {{ formatDisplayDate(item.date) }}
                        </span>

                        <span class="flex items-center">
                            <img :src="icPersonSelected" class="w-4 h-4 mr-1" />

                            {{ item.name }}
                        </span>

                        <span class="flex items-center">
                            {{ item.division }} to {{ item.to_division }}
                        </span>
                    </div>
                </dev>

                <!-- Status badge -->
                <div class="mt-2">
                    <span class="px-3 py-1 text-sm rounded-full font-medium hover:cursor-pointer"
                        :class="statusClass(item.status)">
                        {{ item.status }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex justify-end mt-6" v-if="showSeeAll">
            <button class="text-green-600 font-medium underline hover:cursor-pointer" @click="$emit('seeAll')">
                Lihat Semua
            </button>
        </div>
    </div>
</template>


<script setup>
import router from '@/router'
import icCalendar from '../assets/ic-calendar.png'
import icPersonSelected from '../assets/ic-person-selected.png'

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    showSeeAll: {
        type: Boolean,
        default: false
    }
})

const formatDisplayDate = (iso) => {
    if (!iso) return '-'
    const d = new Date(iso)

    return d.toLocaleDateString('id-ID', {
        weekday: 'long',   // Senin, Selasa, ...
        day: '2-digit',    // 09
        month: 'short',    // Des
        year: 'numeric'    // 2025
    })
}

const statusClass = (status) => {
    switch (status) {
        case "Selesai":
            return "bg-green-100 text-green-700 border border-green-300"
        case "Proses":
            return "bg-yellow-100 text-yellow-700 border border-yellow-300"
        case "Tunda":
            return "bg-red-100 text-red-700 border border-red-300"
        case "Draf":
            return "bg-gray-100 text-gray-700 border border-gray-300"
        default:
            return ""
    }
}

const goToDetail = (id) => {
    router.push({ name: 'FindingDetail', params: { id } })  
}
</script>

<style scoped>
/* optional */
</style>
