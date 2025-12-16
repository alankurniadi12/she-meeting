<template>
    <div class="w-full pl-4 pr-4 pb-6">
        <!-- Judul + tombol -->
        <div class="flex items-center justify-between mt-4 mb-4">
            <h1 class="text-2xl font-semibold text-gray-800">Daftar Temuan</h1>
            <button class="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700">
                + Tambah Temuan
            </button>
        </div>

        <!-- Filter bar -->
        <div class="bg-white rounded-2xl shadow p-4 mb-4 flex flex-col">
            <div class="flex flex-wrap items-end gap-4">
                <!-- Status -->
                <div class="flex flex-col">
                    <label class="text-sm text-gray-600 mb-1">Status</label>
                    <select v-model="filters.status" :class="[
                        'border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none transition-all',
                        isFromDashboard
                            ? 'ring-2 ring-green-400 animate-pulse-filter'
                            : 'focus:ring focus:ring-green-200'
                    ]">
                        <option value="Semua">Semua</option>
                        <option value="Proses">Proses</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Tunda">Tunda</option>
                        <option value="Draf">Draf</option>
                    </select>
                </div>

                <!-- Divisi -->
                <div class="flex flex-col">
                    <label class="text-sm text-gray-600 mb-1">Divisi</label>
                    <select v-model="filters.division"
                        class="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-green-200">
                        <option value="Semua">Semua</option>
                        <option value="ICT">ICT</option>
                        <option value="Electric">Electric</option>
                        <option value="Facility">Facility</option>
                    </select>
                </div>

                <!-- Urutkan -->
                <div class="flex flex-col">
                    <label class="text-sm text-gray-600 mb-1">Urutkan</label>
                    <select v-model="filters.sort"
                        class="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-green-200">
                        <option value="terbaru">Terbaru ke Terlama</option>
                        <option value="terlama">Terlama ke Terbaru</option>
                    </select>
                </div>


                <!-- Pencarian -->
                <div class="flex flex-col flex-1 min-w-[200px]">
                    <label class="text-sm text-gray-600 mb-1">Cari (judul / nama)</label>
                    <input v-model="filters.search" type="text" placeholder="Ketik kata kunci..."
                        class="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-green-200" />
                </div>
            </div>


            <div class="flex flex-wrap items-end justify-between">
                <!-- Filter Tanggal -->
                <div class="flex flex-col mt-4">
                    <label class="text-sm text-gray-600 mb-1">Tanggal</label>
                    <div class="flex items-center gap-2">
                        <input v-model="newDate" type="date"
                            class="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-green-200" />
                        <button type="button"
                            class="px-3 py-2 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
                            @click="addSelectedDate">
                            Tambah
                        </button>
                    </div>

                    <!-- List tanggal yang sudah dipilih -->
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span v-for="d in filters.selectedDates" :key="d"
                            class="inline-flex items-center bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-xs">
                            {{ formatDate(d) }}
                            <button type="button" class="ml-2 text-[10px] font-bold" @click="removeDate(d)">
                                ✕
                            </button>
                        </span>
                    </div>
                </div>

                <!-- Tombol reset -->
                <button class="px-4 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-100"
                    @click="resetFilters">
                    Reset
                </button>
            </div>


        </div>
        <!-- List temuan -->
        <ItemList :items="filteredTemuan" :showSeeAll="false" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ItemList from '../components/ItemList.vue';
import { dummyTemuan } from '../dataDummy.js';
import { useRoute } from 'vue-router';
import { watch, onMounted } from 'vue';

const route = useRoute();
const isFromDashboard = ref(false);

const applyStatusFromQuery = () => {
    if (route.query.status) {
        filters.value.status = route.query.status;
        isFromDashboard.value = true;

        setTimeout(() => {
            isFromDashboard.value = false;
        }, 5000);
    }
};

onMounted(applyStatusFromQuery);



watch(
    () => route.query.status,
    () => {
        applyStatusFromQuery
    }
);

const allTemuan = ref(dummyTemuan)

const filters = ref({
    status: 'Semua',
    division: 'Semua',
    search: '',
    sort: 'terbaru',
    selectedDates: []
})

const newDate = ref('')

const filteredTemuan = computed(() => {
    // 1. FILTER
    let result = allTemuan.value.filter((t) => {
        const matchStatus =
            filters.value.status === 'Semua' || t.status === filters.value.status

        const matchDivision =
            filters.value.division === 'Semua' || t.to_division === filters.value.division

        const keyword = filters.value.search.toLowerCase()
        const matchSearch =
            !keyword ||
            t.description.toLowerCase().includes(keyword) ||
            t.name.toLowerCase().includes(keyword)

        const matchDate =
            filters.value.selectedDates.length === 0 ||
            filters.value.selectedDates.includes(t.date)

        return matchStatus && matchDivision && matchSearch && matchDate
    })

    // 2. SORT
    result = result.sort((a, b) => {
        const da = new Date(a.date)
        const db = new Date(b.date)
        if (filters.value.sort === 'terbaru') {
            return db - da // paling baru di atas
        } else {
            return da - db // paling lama di atas
        }
    })

    return result
})

const resetFilters = () => {
    filters.value = {
        status: 'Semua',
        division: 'Semua',
        search: '',
        sort: 'terbaru',
        selectedDates: []
    }
    newDate.value = ''
}

const addSelectedDate = () => {
    if (!newDate.value) return
    if (!filters.value.selectedDates.includes(newDate.value)) {
        filters.value.selectedDates.push(newDate.value)
    }
    // kalau mau setelah klik, kosongkan input
    // newDate.value = ''
}

const removeDate = (d) => {
    filters.value.selectedDates = filters.value.selectedDates.filter(
        (x) => x !== d
    )
}

// format tanggal ISO -> tampilan manusia
const formatDate = (iso) => {
    const date = new Date(iso)
    return date.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

</script>
<style scoped>
@keyframes pulse-filter {
    0% {
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
    }

    70% {
        box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
    }
}

.animate-pulse-filter {
    animation: pulse-filter 1s ease-out infinite;
}
</style>
