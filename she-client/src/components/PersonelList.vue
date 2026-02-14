<template>
    <div class="mt-6 ml-6 mr-6">
        <div class="space-y-4">
            <!-- Kalau kosong -->
            <div v-if="!items || !items.length" class="text-sm text-gray-400 italic py-4 text-center">
                <span v-if="loading">Loading...</span>
                <span v-else-if="error">{{ error }}</span>
            </div>

            <!-- List item personil -->
            <button v-for="user in items" :key="user._id || user.id" type="button"
                class="w-full bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm border text-left hover:bg-gray-200 transition-colors"
                @click="$emit('select', user)">
                <!-- Kiri: Foto + info dasar -->
                <div class="flex items-center space-x-3">
                    <!-- Avatar -->
                    <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        <img v-if="user.foto" :src="user.foto" alt="Foto personil" class="w-full h-full object-cover" />
                        <span v-else class="text-sm font-semibold text-gray-700">
                            {{ getInitial(user.name) }}
                        </span>
                    </div>

                    <!-- Nama + divisi + temuan terakhir -->
                    <div class="flex flex-col">
                        <h3 class="font-semibold text-gray-800 text-sm leading-tight">
                            {{ user.name }}
                        </h3>

                        <p v-if="user.division" class="text-xs text-gray-500">
                            {{ user.division }}
                        </p>

                        <p class="text-xs text-gray-500 mt-1">
                            Temuan Terakhir:
                            <span class="font-medium text-gray-700">
                                <span v-if="!user.latestContribution">Belum Ada</span>
                                <span v-else>
                                    {{ formatLastFindingDate(user.latestContribution) }}
                                </span>
                            </span>
                        </p>
                    </div>
                </div>

                <!-- Kanan: jumlah temuan -->
                <div class="flex flex-col items-end">
                    <span class="text-lg font-bold text-gray-800 leading-none">
                        {{ user.countFindings ?? 0 }}
                    </span>
                    <span class="text-xs text-gray-500">
                        Temuan
                    </span>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    error: {
        type: String,
        default: 'Terjadi kesalahan saat memuat data personil.'
    },
    loading: {
        type: Boolean,
        default: false
    }
})
console.log('Props items:', props.items);

// format: Rabu, 10 Des 2025
const formatLastFindingDate = (iso) => {
    if (!iso) return '-'
    const d = new Date(iso)
    return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

// ambil inisial dari nama, mis: "Firman Saputra" -> "FS"
const getInitial = (nama) => {
    if (!nama) return '?'
    const parts = nama.trim().split(' ')
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
}
</script>
