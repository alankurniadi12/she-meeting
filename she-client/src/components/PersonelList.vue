<template>
    <div class="mt-6 mr-6">
        <div class="space-y-3 max-h-[75vh] overflow-y-auto pr-2">
            <!-- Kalau kosong -->
            <div v-if="!items || !items.length" class="text-sm text-gray-400 italic py-4 text-center">
                Belum ada data personil.
            </div>

            <!-- List item personil -->
            <button v-for="p in items" :key="p.id" type="button"
                class="w-full bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm border text-left hover:bg-gray-200 transition-colors"
                @click="$emit('select', p)">
                <!-- Kiri: Foto + info dasar -->
                <div class="flex items-center space-x-3">
                    <!-- Avatar -->
                    <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        <img v-if="p.foto" :src="p.foto" alt="Foto personil" class="w-full h-full object-cover" />
                        <span v-else class="text-sm font-semibold text-gray-700">
                            {{ getInitial(p.nama) }}
                        </span>
                    </div>

                    <!-- Nama + divisi + temuan terakhir -->
                    <div class="flex flex-col">
                        <h3 class="font-semibold text-gray-800 text-sm leading-tight">
                            {{ p.nama }}
                        </h3>

                        <p v-if="p.divisi" class="text-xs text-gray-500">
                            {{ p.divisi }}
                        </p>

                        <p class="text-xs text-gray-500 mt-1">
                            Update:
                            <span class="font-medium text-gray-700">
                                {{ formatLastFindingDate(p.tanggalTemuanTerbaru) }}
                            </span>
                        </p>
                    </div>
                </div>

                <!-- Kanan: jumlah temuan -->
                <div class="flex flex-col items-end">
                    <span class="text-lg font-bold text-gray-800 leading-none">
                        {{ p.jumlahTemuan ?? 0 }}
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
    }
})

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
